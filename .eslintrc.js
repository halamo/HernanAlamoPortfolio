module.exports = {
    extends: [
        // Start from reccommended rules.
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        // this plugin will overwrite rules that prettier will be handling, make sure its last in list.
        "eslint-config-prettier",
    ],
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use.
            version: "detect",
        },
        // Tells eslint how to resolve imports
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    rules: {
        // specific config overrides here..
    },
};
