import { config } from "@dotenvx/dotenvx";

config();

import { autoprefixer } from "autoprefixer";
import { cssnano } from "cssnano";
import { postcssCombine } from "postcss-combine-duplicated-selectors";
import { postcssImport } from "postcss-import";
import { postcssNested } from "postcss-nested";
import { postcssRename } from "postcss-rename";

module.exports = (ctx) => {
	return {
		plugins: [
			postcssImport,
			postcssNested,
			postcssCombine,
			postcssRename({
				strategy: (className) => className.replace("xy", process.env.LIB),
			}),
			autoprefixer,
			ctx.env === "production" && cssnano,
		],
	};
};
