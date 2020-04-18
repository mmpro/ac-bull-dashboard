module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        // "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        // "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "standard", "standard-react"
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        },
        useJSXTextNode: true,
        jsx: true
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "object-curly-spacing": [ "error", "always" ],
        "array-bracket-spacing": [ "error", "always" ],
        "template-curly-spacing": [ "error", "always" ],
        "@typescript-eslint/explicit-function-return-type": false,
        semi: [ "error", "never" ],
        "space-before-function-paren": 1,
        "space-before-blocks": [ "error", "always" ],
        "arrow-spacing": [ "error", { before: true, after: true } ],
        "space-infix-ops": "error",
        "no-multi-spaces": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-quotes": [ "error", "prefer-single" ],
        "quotes": [ "error", "single" ],
        "space-in-parens": [ "error", "always" ],
        "indent" : ["error", 4, { SwitchCase: 0, "ignoredNodes": ["JSXElement", "JSXAttribute"] }],
        "react/jsx-indent": [ "error", 4 ],
        "react/jsx-indent-props": [ "error", 2 ],
        "@typescript-eslint/indent": ["error", 4, { "ignoredNodes": ["JSXAttribute"], SwitchCase: 0 }],
        "comma-dangle": ["error", "always-multiline"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "no-duplicate-imports": "error",
        "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
        "@typescript-eslint/no-explicit-any": "off",
        "no-use-before-define": ["error",{ "functions": false, "variables": false }],
        "function-paren-newline": ["error", "consistent"],
        "object-curly-newline": ["error", { "consistent": true }],
        "react/jsx-curly-spacing": ["error", "always"],
        "no-irregular-whitespace": 0,
        "react/prop-types": 0,
        "handle-callback-err": 0,
        "no-throw-literal": 0,
        "no-unused-vars": 1,

        "max-len": ["error", { "code": 260 }],
        "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
        // "react/jsx-curly-newline": {
        //     multiline: "require",
        //     singleline: "forbid"
        // },
        // "react/jsx-handler-names": [ "enabled", {
        //     "eventHandlerPrefix": "handle",
        //     "eventHandlerPropPrefix": "on"
        //   }],
        // "camelCase": { "properties": "always" },
        "dot-location": ["error", "property"],
        "no-template-curly-in-string": "error",
        "valid-typeof": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",
        "computed-property-spacing": ["error", "always"]
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    plugins: [ "@typescript-eslint", "react-hooks" ],
    "env": {
        "jest": true,
        "browser": true
    }
};
