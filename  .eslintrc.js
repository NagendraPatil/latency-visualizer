/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/no-anonymous-default-export": [
      "warn",
      { allowArrowFunction: false },
    ],
    "prettier/prettier": ["error"],
  },
  ignores: [
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    "public/static",
    "public/assets",
    "public/favicon.ico",
  ],
};
