#!/bin/bash
set -e
# Creates a local build and copies the content of the dist folder to a given S3 bucket
#./workflows/buildToS3.sh -b BUCKETNAME -cf CLOUDFRONT-ID [-p PROFILE]

FOLDER='dist'
PROFILE="default"

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -b|--bucket)
    BUCKET="$2"
    shift # past argument
    shift # past value
    ;;
    -cf|--cloudfront)
    DISTRIBUTION_ID="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--profile)
    PROFILE="$2"
    shift # past argument
    shift # past value
    ;;
esac
done

if [ -z $BUCKET ]
  then
    echo "ERROR: Bucket is required as parameter -b"
    exit
fi
if [ -z $DISTRIBUTION_ID ]
  then
    echo "ERROR: Cloudfront DistributionID is required as parameter -cf"
    exit
fi

echo "BUILDING APP"
make build

# Rename the index file
echo ""
HASH=$(cat /dev/urandom | base64 | tr -dc 'a-z0-9' | fold -w 20 | head -n 1)
INDEX="index.$HASH.html"
echo "Renaming index.html to $INDEX"
cp $FOLDER/index.html $FOLDER/$INDEX
echo ""

echo "------------------------"
echo "Starting AWS Operations with profile $PROFILE"
echo ""
echo ""

echo "Uploading from $FOLDER >> $BUCKET"
aws s3 cp $FOLDER s3://$BUCKET --region eu-central-1 --recursive --profile $PROFILE
echo "COPY COMPLETE"
echo "https://$BUCKET.s3-website.eu-central-1.amazonaws.com/$INDEX"

echo ""
echo ""
# update Cloudfront EJ91C022A6VVS
echo "UPDATING Cloudfront Distribution $DISTRIBUTION_ID"
aws cloudfront update-distribution --id $DISTRIBUTION_ID --default-root-object $INDEX --profile $PROFILE
echo "Cloudfront Distribution $DISTRIBUTION_ID updated with $INDEX"

# Delete old files, so the bucket is no cluttered with old stuff
