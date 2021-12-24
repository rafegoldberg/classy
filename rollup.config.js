import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";
import resolve from "@rollup/plugin-node-resolve";

const ENV = process.env.NODE_ENV || "development";
const PKG = require(`${process.cwd()}/package.json`);

export default {
  input: "src/index.js",
  output: [
    {
      file: PKG.module,
      format: "esm",
      sourcemap: true,
    },
    {
      file: PKG.main,
      name: "classy",
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins: [
    ENV === "development" && progress(),
    ENV === "development" && filesize(),

    external(),
    resolve(),
    commonjs(),
    babel(),

    ENV !== "development" && terser(),
  ],
};
