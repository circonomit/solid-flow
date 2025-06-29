import { solidPlugin } from "esbuild-plugin-solid";
import { defineConfig, type Options } from "tsup";

function generateConfig(jsx: boolean): Options {
	return {
		target: "esnext",
		platform: "browser",
		format: "esm",
		clean: true,
		// dts: !jsx,
		experimentalDts: !jsx,
		entry: ["src/index.ts", "src/styles/{base,style}.css"],
		outDir: "dist/",
		treeshake: { preset: "smallest" },
		replaceNodeEnv: true,
		esbuildOptions(options) {
			if (jsx) {
				options.jsx = "preserve";
			}
			options.chunkNames = "[name]/[hash]";
			options.drop = ["console", "debugger"];
		},
		outExtension() {
			return jsx ? { js: ".jsx" } : {};
		},
		// @ts-ignore
		esbuildPlugins: !jsx ? [solidPlugin({ solid: { generate: "dom" } })] : [],
	};
}

export default defineConfig([generateConfig(false), generateConfig(true)]);
