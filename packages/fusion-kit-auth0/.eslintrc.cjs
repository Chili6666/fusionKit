module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 13,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "ignorePatterns": [
    "temp.js",
    "**/*.stories.ts",
    ".eslintrc.cjs",
    // "**/*.ts",
    // do not check *.tsx files as long as it doesn't work properly in combination with *.ts files. Check out:
    // https://stackoverflow.com/questions/73645800/parsing-error-parseroptions-project-has-been-set-for-typescript-eslint-parse
    "**/*.tsx"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    // Code Format
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    // Code Style
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": [
          "camelCase"
        ]
      },
      {
        "selector": "method",
        "format": [
          "camelCase"
        ]
      },
      {
        "selector": "function",
        "format": [
          "camelCase"
        ]
      },
      {
        "selector": "typeLike",
        "format": [
          "PascalCase"
        ]
      },
      {
        "selector": "interface",
        "format": [
          "PascalCase"
        ]
      },
    ]
  }
};
