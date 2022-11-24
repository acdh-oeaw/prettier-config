# ACDH-CH prettier config

Shared configuration preset for [`prettier`](https://prettier.io/).

## How to install

```bash
npm install -D prettier @acdh-ch/prettier-config
```

Add the config to `package.json`:

```json
{
	"prettier": "@acdh-ch/prettier-config"
}
```

If you absolutely need to extend the shared config, create a `.prettierrc.js` file in the root
folder of your project:

```js
const sharedConfig = require("@acdh-ch/prettier-config");

const config = {
	...sharedConfig,
	overrides: [
		{
			files: ["*.svg"],
			options: {
				parser: "html",
			},
		},
	],
};

module.exports = config;
```

## How to use

Add a script to `package.json`:

```json
{
	"scripts": {
		"format": "prettier . --cache --check --ignore-path .gitignore",
		"format:fix": "npm run format -- --write"
	}
}
```

You can then run `npm run format` to check code formatting, and `npm run format:fix` to auto-fix
formatting errors.

## How to auto-format with Git hooks

```bash
npm install -D lint-staged simple-git-hooks
```

To auto-format on every Git commit, and to check formatting on every Git push, add the following to
`package.json`:

```json
{
	"scripts": {
		"format": "prettier . --cache --check --ignore-path .gitignore",
		"format:fix": "npm run format -- --write",
		"prepare": "npm run setup",
		"setup": "simple-git-hooks || exit 0",
		"validate": "npm run format"
	},
	"lint-staged": {
		"*": ["prettier --cache --write"]
	},
	"simple-git-hooks": {
		"pre-commit": "npx lint-staged",
		"pre-push": "npm run validate"
	}
}
```

## Editor integrations

### VS Code

Install the VS Code `prettier-vscode` plugin by pressing <kbd>Ctrl</kbd>+<kbd>P</kbd> and pasting
the following command:

```
ext install esbenp.prettier-vscode
```

Also, make sure to add `prettier-vscode` to the list of recommended plugins for your project in
`.vscode/extensions.json`:

```json
{
	"recommendations": ["esbenp.prettier-vscode"]
}
```

You may also want to enable "Format on Save" in `.vscode/settings.json`:

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

### WebStorm

Follow the instructions in the [WebStorm docs](https://www.jetbrains.com/help/webstorm/prettier.html).

## How to adjust tab width

We use tabs, not spaces, for indentation because of their accessibility benefits. Users are then
free to configure their preferred tab width in their text editors. If you want to provide a shared
default tab width, consider adding a [`.editorconfig`](https://editorconfig.org/) file to the root
of your project, which will be read by most editors automatically (in VS Code you will need to
install the `editorconfig.editorconfig` plugin). You should also add `.editorconfig` to `.gitignore`
after committing it, to allow for individual `indent_size` preferences.

On <https://github.com> you can adjust the tab width in the
[appearance settings](https://github.com/settings/appearance#tab-size-heading).
