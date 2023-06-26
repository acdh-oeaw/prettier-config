/** @type {import('prettier').Config}  */
const config = {
	endOfLine: "lf",
	printWidth: 100,
	proseWrap: "always",
	semi: true,
	singleQuote: false,
	/** Used to calculate print width. */
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,
	overrides: [
		/**
		 * Currently it is not possible to set ignore patterns via config,
		 * or set more than one ignore file (e.g. `.gitignore` and `prettierignore`).
		 *
		 * This workaround avoids auto-formatting `pnpm`'s lock file.
		 */
		{
			files: "pnpm-lock.yaml",
			options: {
				rangeEnd: 0,
			},
		},
		{
			files: ["*.vue"],
			options: {
				htmlWhitespaceSensitivity: "ignore",
			},
		},
	],
};

module.exports = config;
