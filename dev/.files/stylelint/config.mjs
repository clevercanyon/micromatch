/**
 * Stylelint config file.
 *
 * Stylelint is not aware of this config file's location.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 *
 * @micromatch Stylelint uses micromatch under the hood, with `{ dot: true, matchBase: true }`.
 *
 * @see https://stylelint.io/user-guide/configure
 */

import exclusions from '../bin/includes/exclusions.mjs';
import extensions from '../bin/includes/extensions.mjs';

/**
 * Defines Stylelint configuration.
 */
export default async () => {
    /**
     * Base config.
     */
    const baseConfig = {
        ignoreFiles: [
            ...new Set([
                ...exclusions.logIgnores, //
                ...exclusions.backupIgnores,
                ...exclusions.patchIgnores,
                ...exclusions.editorIgnores,
                ...exclusions.toolingIgnores,
                ...exclusions.pkgIgnores,
                ...exclusions.vcsIgnores,
                ...exclusions.osIgnores,
                ...exclusions.lockIgnores,
                ...exclusions.distIgnores,
                ...exclusions.sandboxIgnores,
                ...exclusions.exampleIgnores,
            ]),
        ],
        plugins: ['stylelint-order'],
        extends: ['stylelint-config-recess-order'],
        rules: {
            'no-duplicate-selectors': null,
            'selector-type-no-unknown': null,
            'no-descending-specificity': null,
            'selector-class-pattern': '^(?:_|[_-]?[a-z][a-z0-9]*(?:[_-]{1,2}[a-z0-9]+)*)$',
            'selector-id-pattern': '^[a-z][a-z0-9]*(?:[_-]{1,2}[a-z0-9]+)*$',
            'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'] }],
        },
    };

    /**
     * Composition.
     */
    return {
        ...baseConfig,

        overrides: [
            {
                files: ['**/*.' + extensions.asBracedGlob([...extensions.byVSCodeLang.css])],
                customSyntax: 'postcss-safe-parser',
            },
            {
                files: ['**/*.' + extensions.asBracedGlob([...extensions.byVSCodeLang.scss])],
                customSyntax: 'postcss-scss',

                plugins: ['stylelint-scss'],
                extends: ['stylelint-config-standard-scss'],
                rules: {
                    'at-rule-no-unknown': null,
                    'scss/at-rule-no-unknown': baseConfig.rules['at-rule-no-unknown'],
                },
            },
        ],
    };
};