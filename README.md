# acdh-oeaw prettier config

Shared configuration preset for [`prettier`](https://prettier.io/).

## How to install

```bash
npm install -D prettier @acdh-oeaw/prettier-config
```

Add the config to `package.json`:

```json
{
	"prettier": "@acdh-oeaw/prettier-config"
}
```

If you absolutely need to extend the shared config, create a `.prettierrc.js` file in the root
folder of your project:

```js
const sharedConfig = require("@acdh-oeaw/prettier-config");

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

The WebStorm default installation should already contain the
[JetBrains Prettier plugin](https://plugins.jetbrains.com/plugin/10456-prettier).

If you install this acdh config via the embedded terminal (<kbd>Alt</kbd>+<kbd>F12</kbd>) as
suggested [here](#how-to-install) the plugin should configure itself automagically. Alternately you
may adjust its settings via the _Settings/Preferences_ dialog
(<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>), under _Languages & Frameworks | JavaScript |
Prettier_ . It's highly recommended to check both _On code reformat_ and _On Save_ there as well.
(See [this section](#how-to-auto-format-with-git-hooks) for alternate/additional automation
possibilities).

By default the set [glob pattern](https://github.com/isaacs/node-glob#glob-primer) will only match
JavaScript, TypeScript, JSX and TSX files. Depending on your stack it's recommended to extend it to

```glob
{**/*,*}.{js,json,ts,jsx,tsx,vue}
```

To ship this config with your project, commit/include the `prettier.xml` in your `.idea` config
folder:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="PrettierConfiguration">
    <option name="myRunOnSave" value="true" />
    <option name="myRunOnReformat" value="true" />
    <option name="myFilesPattern" value="{**/*,*}.{js,json,ts,jsx,tsx,vue,css,scss,sass}" />
  </component>
</project>
```

For more detailed instructions see the WebStorm docs on
[Prettier](https://www.jetbrains.com/help/webstorm/prettier.html) and
[Vue.js formatting](https://www.jetbrains.com/help/webstorm/vue-js.html#ws_vue_formatting)

## How to adjust tab width

We use tabs, not spaces, for indentation because of their accessibility benefits. Users are then
free to configure their preferred tab width in their text editors. If you want to provide a shared
default tab width, consider adding a [`.editorconfig`](https://editorconfig.org/) file to the root
of your project, which will be read by most editors automatically (in VS Code you will need to
install the `editorconfig.editorconfig` plugin). You should also add `.editorconfig` to `.gitignore`
after committing it, to allow for individual `indent_size` preferences.

On <https://github.com> you can adjust the tab width in the
[appearance settings](https://github.com/settings/appearance#tab-size-heading).

In your terminal, you should be able to use the `tabs` command to set tab width, e.g. `tabs 4`.

For the output of `git diff`, you need to adjust the tab width of your pager. When using the default `less`, you can set `git config --global core.pager 'less -x4'`.
