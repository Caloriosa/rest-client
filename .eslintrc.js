module.exports = {
    "extends": "standard",
    "parserOptions": {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    "env": {
        "node": true,
        "browser": true
    },
    "rules": {
        "semi": 1,
        "quotes": [2, "double", { "allowTemplateLiterals": true }],
        "arrow-parens": [ 1, "as-needed" ],
        "no-unused-vars": 0,
        "no-template-curly-in-string": 0
    }
};