// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-explicit-any": ["off"],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "no-multiple-empty-lines": ["warn", { "max": 1 }], // Birden fazla boş satırı engeller
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      "indent": ["warn", 4], // indent 4 boşluk olarak ayarlar
      "quotes": ["warn", "single"], // Tek tırnak kullanımını zorunlu kılar
      "semi": ["warn", "always"], // Her ifadeden sonra noktalı virgül kullanımını zorunlu kılar
      "space-infix-ops": ["error"],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": ["off"],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  }
);