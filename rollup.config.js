import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

const baseConfig = {
  input: "src/index.ts",
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.dependencies || {}),
    "react/jsx-runtime",
  ],
};

// CSS processing configuration
const cssConfig = {
  modules: false, // We're using global CSS
  autoModules: false,
  minimize: true,
  extract: "dist/styles/main.css", // Ensure consistent naming and avoid conflicts
  plugins: [autoprefixer()],
  inject: false, // Don't inject CSS into JS
};

export default [
  // Main bundle configuration
  {
    ...baseConfig,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        inlineSources: true,
      }),
      postcss(cssConfig), // Let this handle the CSS
      terser({
        format: {
          comments: false,
        },
        compress: {
          drop_console: true,
        },
      }),
    ],
  },
  // Type definitions bundle
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
