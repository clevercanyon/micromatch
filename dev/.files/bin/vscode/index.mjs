/**
 * `./.vscode/settings.json` generator.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 */

import fs from 'node:fs';
import path from 'node:path';
import { $prettier } from '../../../../node_modules/@clevercanyon/utilities.node/dist/index.js';
import { $json, $str, $time } from '../../../../node_modules/@clevercanyon/utilities/dist/index.js';

export default async ({ projDir }) => {
    /**
     * Initializes vars.
     */
    const pkgFile = path.resolve(projDir, './package.json');
    const vsCodeSettingsFile = path.resolve(projDir, './.vscode/settings.json');
    const prettierConfig = { ...(await $prettier.resolveConfig(pkgFile)), parser: 'json' };

    /**
     * Defines `./.vscode/settings.json` file comments.
     */
    const vsCodeSettingsFileComments = $str.dedent(`
        /**
         * Auto-generated VS Code config file.
         *
         * VS Code is aware of this config file's location.
         *
         * @note PLEASE DO NOT EDIT THIS FILE!
         * @note This entire file will be updated automatically.
         * @note Instead of editing here, please review \`./settings.mjs\`.
         *
         * Last generated using \`./settings.mjs\` ${$time.now().toProse()}.
         */
    `);

    /**
     * Defines `./.vscode/settings.json` file contents.
     */
    const vsCodeSettingsFileObj = (await import(path.resolve(projDir, './.vscode/settings.mjs'))).default;
    const vsCodeSettingsFileContents = await $prettier.format($json.stringify(vsCodeSettingsFileObj, { pretty: true }), prettierConfig);

    /**
     * Compiles `./.vscode/settings.json` file contents.
     */
    fs.writeFileSync(vsCodeSettingsFile, vsCodeSettingsFileComments + '\n' + vsCodeSettingsFileContents);
};