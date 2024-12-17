import storybook from "eslint-plugin-storybook";

export default [
  {
    files: ["src/stories/*.js"],
    plugins: {
      storybook: storybook,
      jest: pluginJest 
    },
  },
  {
    files: ["src/!(stories)/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
