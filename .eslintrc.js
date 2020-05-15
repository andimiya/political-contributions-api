module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "rules": {
    "no-console": "off",
    "max-len": ["error", { "code": 160 }]
  },
  "parserOptions": {
      "ecmaFeatures": {
        "legacyDecorators": true
      }
    }
};
