/**
 * Tailwind CSS config file.
 *
 * Tailwind is not aware of this config file's location.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 *
 * @micromatch Tailwind uses micromatch with default options; i.e., `{ dot: false }`.
 *
 * @see https://tailwindcss.com/docs/configuration
 */
/*
-----------------------------------------------------------------------------------------------------------------------
Example `index.scss` starter file contents:
-----------------------------------------------------------------------------------------------------------------------
@use '../dev/.files/tailwind/layers';
-------------------------------------------------------------------------------------------------------------------- */

import pluginTypography from '@tailwindcss/typography';
import pluginTypographyStyles from '@tailwindcss/typography/src/styles.js';
import fs from 'node:fs';
import path from 'node:path';
import pluginAnimated from 'tailwindcss-animated';
import pluginThemer from 'tailwindcss-themer';
import exclusions from '../bin/includes/exclusions.mjs';
import extensions from '../bin/includes/extensions.mjs';
import mergeThemesConfig from './themes.mjs';

// `__dirname` already exists when loaded by Tailwind via Jiti / commonjs.
// eslint-disable-next-line no-undef -- `__dirname` is not actually missing.
const projDir = path.resolve(__dirname, '../../..');

/**
 * Defines Tailwind configuration.
 *
 * Jiti, which is used by Tailwind to load ESM config files, doesn’t support top-level await. Thus, we cannot use async
 * functionality here. Consider using a CLI request to acquire resources, if necessary. {@see https://o5p.me/1odhxy}.
 */
export default /* not async compatible */ ({ themesConfig } = {}) => {
    /**
     * Composition.
     */
    return {
        // We favor Tailwind themes, so we don’t typically use dark mode.
        // By setting this to `class` it can only be enabled using the `dark` class.
        darkMode: 'class', // {@see https://tailwindcss.com/docs/dark-mode}.
        // Use of Tailwind’s baked-in `dark` mode is not supported by our implementation.
        // Instead, configure a `defaultTheme` as dark, or add a `dark-theme` to `themes: []`.

        theme: {
            screens: {
                // Less than or equal to, in descending specificity order.
                // The order matters, because it affects specificity.
                'lte-widescreen': { raw: '(max-width: none)' },
                'lte-desktop': { raw: '(max-width: 2559px)' },
                'lte-laptop': { raw: '(max-width: 1439px)' },
                'lte-notebook': { raw: '(max-width: 1279px)' },
                'lte-tablet': { raw: '(max-width: 959px)' },
                'lte-phone': { raw: '(max-width: 479px)' },

                // Greater than or equal to, in ascending specificity order.
                // The order matters, because it affects specificity.
                'gte-phone': { raw: '(min-width: 320px)' },
                'gte-tablet': { raw: '(min-width: 480px)' },
                'gte-notebook': { raw: '(min-width: 960px)' },
                'gte-laptop': { raw: '(min-width: 1280px)' },
                'gte-desktop': { raw: '(min-width: 1440px)' },
                'gte-widescreen': { raw: '(min-width: 2560px)' },

                // Device-specific min/max breakpoints, in any order.
                // Order doesn’t really matter due to min/max specificity.
                'phone': { raw: '(min-width: 320px) and (max-width: 479px)' },
                'tablet': { raw: '(min-width: 480px) and (max-width: 959px)' },
                'notebook': { min: '960px', max: '1279px' }, // Container max-width: 960px.
                'laptop': { min: '1280px', max: '1439px' }, // Container max-width: 1280px.
                'desktop': { min: '1440px', max: '2559px' }, // Container max-width: 1440px.
                'widescreen': { raw: '(min-width: 2560px)' },

                // Note: We use `raw` to avoid smaller breakpoints becoming a max-width for containers.
                // We also use `raw` to avoid widescreen inadvertently becoming a max-width for containers.
                // If something should adapt to widescreen, the best practice is to simply not use a container.
            },
            container: { center: true }, // No need for `mx-auto` on each container.

            extend: {
                spacing: {
                    '1em': '1em',
                    '1.5em': '1.5em',
                    '2em': '2em',
                },
                lineHeight: {
                    '1em': '1em',
                    '1.5em': '1.5em',
                    '2em': '2em',
                },
                aspectRatio: {
                    'image': '40 / 21', // e.g., 1200 x 630 for OG image.
                },
                // We have to declare screen sizes explicitly for `min/max` widths.
                // The reason is because our `screens` configuration uses complex values.
                // For further details, {@see https://o5p.me/oLXcju}.
                minWidth: {
                    'phone': '320px',
                    'tablet': '480px',
                    'notebook': '960px',
                    'laptop': '1280px',
                    'desktop': '1440px',
                    'widescreen': 'none',

                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
                    '1/3': '33.333%',
                    '2/3': '66.667%',
                },
                maxWidth: {
                    'phone': '320px',
                    'tablet': '480px',
                    'notebook': '960px',
                    'laptop': '1280px',
                    'desktop': '1440px',
                    'widescreen': 'none',

                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
                    '1/3': '33.333%',
                    '2/3': '66.667%',
                },
                fontSize: {
                    '.5em': ['.5em', '.5em'],
                    '.75em': ['.75em', '.75em'],
                    '1em': ['1em', '1em'],

                    // Neither of these are allowed to autoscale.
                    // We don’t autoscale text that is small already.
                    xs: ['.75rem', { lineHeight: '1rem' }], // Equivalent to 12px/16px.
                    sm: ['.875rem', { lineHeight: '1.25rem' }], // Equivalent to 14px/20px.

                    // All of these are allowed to autoscale down to one size smaller than ideal target size.
                    base: ['clamp(.875rem, 1.111vw, 1rem)', { lineHeight: 'clamp(1.25rem, 1.667vw, 1.5rem)' }], // Equivalent to 16px/24px.
                    lg: ['clamp(1rem, 1.250vw, 1.125rem)', { lineHeight: 'clamp(1.5rem, 1.944vw, 1.75rem)' }], // Equivalent to 18px/28px.
                    xl: ['clamp(1.125rem, 1.389vw, 1.25rem)', { lineHeight: 'clamp(1.75rem, 1.944vw, 1.75rem)' }], // Equivalent to 20px/28px.
                    '2xl': ['clamp(1.25rem, 1.667vw, 1.5rem)', { lineHeight: 'clamp(1.75rem, 2.222vw, 2rem)' }], // Equivalent to 24px/32px.

                    // All of these are allowed to autoscale down to two sizes smaller than ideal target size.
                    '3xl': ['clamp(1.25rem, 2.083vw, 1.875rem)', { lineHeight: 'clamp(1.75rem, 2.500vw, 2.25rem)' }], // Equivalent to 30px/36px.
                    '4xl': ['clamp(1.5rem, 2.500vw, 2.25rem)', { lineHeight: 'clamp(2rem, 2.778vw, 2.5rem)' }], // Equivalent to 36px/40px.
                    '5xl': ['clamp(1.875rem, 3.333vw, 3rem)', { lineHeight: 'clamp(2.25rem, 4.028vw, 3.625rem)' }], // Equivalent to 48px/58px.

                    // All of these are allowed to autoscale down to three sizes smaller than ideal target size.
                    '6xl': ['clamp(1.875rem, 4.167vw, 3.75rem)', { lineHeight: 'clamp(2.25rem, 4.861vw, 4.375rem)' }], // Equivalent to 60px/70px.
                    '7xl': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: 'clamp(2.5rem, 5.972vw, 5.375rem)' }], // Equivalent to 72px/86px.

                    // All of these are allowed to autoscale down to four sizes smaller than ideal target size.
                    '8xl': ['clamp(2.25rem, 6.667vw, 6rem)', { lineHeight: 'clamp(2.5rem, 7.986vw, 7.188rem)' }], // Equivalent to 96px/115px.
                    '9xl': ['clamp(3rem, 8.889vw, 8rem)', { lineHeight: 'clamp(3.625rem, 10.625vw, 9.563rem)' }], // Equivalent to 128px/153px.
                },
                boxShadow: {
                    'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
                },
                /**
                 * Prose styles.
                 *
                 * - In our Tailwind implementation, class `p` = `prose`.
                 * - In our Tailwind implementation, a much shorter `_` = `not-p` = `not-prose`.
                 * - In our basic styles implementation, `_` = `not-p` = `not-prose` = `not-basic`.
                 *
                 * Also worth noting that in our Tailwind prose implementation, the `~` class means prose colors should
                 * be inherited from the parent containing the `~` class; e.g., if a component applies colors that
                 * differ from prose colors, then it needs to make sure any prose it contains will inherit the colors it
                 * has assigned, and not use the default prose colors. So `~` is an alternative to `_`, indicating that
                 * prose is to be allowed, but it must use inherited coloration.
                 */
                typography: {
                    DEFAULT: {
                        css: {
                            maxWidth: null, // No max-width.
                            // Instead, we wrap all prose in a container.

                            // We explicitly don’t set a `<strong>` color.
                            // Doing so makes it necessary to add more and more rules
                            // that must revert colorization in various nested contexts.
                            strong: { color: null },
                            'blockquote strong': { color: null },
                            'thead th strong': { color: null },
                            'h1 strong': { color: null },
                            'h2 strong': { color: null },
                            'h3 strong': { color: null },
                            'h4 strong': { color: null },

                            // We explicitly don’t set a `<kbd>` or `<code>` color.
                            // Doing so makes it necessary to add more and more rules
                            // that must revert colorization in various nested contexts.
                            code: { color: null },
                            'h1 code': { color: null },
                            'h2 code': { color: null },
                            'h3 code': { color: null },
                            'h4 code': { color: null },
                            'blockquote code': { color: null },
                            'thead th code': { color: null },
                            'pre code': { color: null },

                            // Link styles.
                            'a': null, // Redefined as `a, .link`.
                            'a code': null, // Redefined as `a code, .link code`.
                            'a strong': null, // Redefined as `a strong, .link strong`.

                            'a, .link': {
                                // color: 'var(--tw-prose-links)',
                                // textDecoration: 'underline',
                                // fontWeight: '500',
                                // All included in base `<a>` styles.
                                ...pluginTypographyStyles.DEFAULT.css[0]['a'],
                                opacity: '.9',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            },
                            'a:hover, .link:hover': {
                                opacity: '1',
                                textDecoration: 'underline',
                            },
                            'a code, .link code': {
                                // color: 'inherit',
                                // All included in base `<code>` styles.
                                ...pluginTypographyStyles.DEFAULT.css[0]['a code'],
                                color: null, // Explicitly remove; see notes above.
                            },
                            'a strong, .link strong': {
                                // color: 'inherit',
                                // All included in base `<strong>` styles.
                                ...pluginTypographyStyles.DEFAULT.css[0]['a strong'],
                                color: null, // Explicitly remove; see notes above.
                            },

                            // Auto-linked headings with `~`-prefixed IDs.
                            '[id^=\\~]': {
                                position: 'relative',
                            },
                            '[id^=\\~] > x-hash:first-child': {
                                opacity: '0',
                                left: '-1em',
                                width: '1em',
                                textAlign: 'left',
                                position: 'absolute',
                            },
                            '[id^=\\~]:hover > x-hash:first-child': {
                                opacity: '1',
                            },

                            // Horizontal line styles.
                            'hr': {
                                marginTop: '1.5em',
                                marginBottom: '1.5em',
                            },

                            // Pre styles.
                            'pre': {
                                border: '1px solid rgb(var(--colors-color-prose-pre-borders))',
                                boxShadow: 'inset 0 0 2px 2px rgb(var(--colors-color-prose-pre-shadows))',
                            },

                            // Code styles.
                            'code::before': null,
                            'code::after': null,
                            'code:not(:where(pre code))': {
                                // fontSize: em(14, 16),
                                // borderRadius: rem(5),
                                // paddingTop: em(3, 16),
                                // paddingRight: em(6, 16),
                                // paddingBottom: em(3, 16),
                                // paddingLeft: em(6, 16),
                                // All included in base `<kbd>` styles.
                                ...pluginTypographyStyles.base.css[0]['kbd'],
                                borderRadius: '0.188rem', // Equivalent to 3px.
                                boxShadow: '0 0 0 2px rgb(var(--tw-prose-code-shadows) / 12%)',
                            },

                            // Key styles.
                            'kbd': {
                                boxShadow:
                                    '0 1px 0 2px rgb(var(--tw-prose-kbd-shadows) / 20%),' + //
                                    ' 0 1px 10px 0 rgb(var(--tw-prose-kbd-shadows) / 20%)',
                                color: null, // Explicitly remove; see notes above.
                            },

                            // Mark styles.
                            'mark': {
                                // fontSize: em(14, 16),
                                // borderRadius: rem(5),
                                // paddingTop: em(3, 16),
                                // paddingRight: em(6, 16),
                                // paddingBottom: em(3, 16),
                                // paddingLeft: em(6, 16),
                                // All included in base `<kbd>` styles.
                                ...pluginTypographyStyles.base.css[0]['kbd'],
                            },
                            'mark, mark *': {
                                fontSize: '.944444em',
                                color: 'rgb(var(--colors-color-hilite-fg))',
                                backgroundColor: 'rgb(var(--colors-color-hilite))',
                            }, // Supports nested `<a>`, `<code>`, `<kdb>`, `*`.
                            'mark *': { border: '0', padding: '0', boxShadow: 'none' },
                            'mark a, mark .link': { opacity: '.75', textDecoration: 'underline' },
                            'mark a:hover, mark .link:hover': { opacity: '1' }, // Opaque on hover.

                            // Abbreviation styles.
                            'abbr': {
                                cursor: 'help',
                            },

                            // Task lists produced by remark GFM plugin.
                            '.contains-task-list, .task-list-item': {
                                paddingLeft: '.375em',
                                listStyleType: 'none',
                            },
                            '.contains-task-list .contains-task-list': {
                                margin: '0',
                                paddingLeft: '1.5em',
                            },
                            '.task-list-item::marker': {
                                content: "''",
                            },
                            '.task-list-item > input': {
                                appearance: 'none',
                                position: 'relative',

                                width: '1em',
                                height: '1em',
                                margin: '0 .5em 0 0',
                                verticalAlign: 'middle',

                                background: 'rgb(var(--colors-color-neutral), .25)',
                                border: '1px solid rgb(var(--colors-color-neutral-line))',
                                borderRadius: '.15em',
                            },
                            '.task-list-item > input:checked::before': {
                                content: "'\\2713'",

                                fontSize: '1em',
                                lineHeight: '1em',
                                color: 'rgb(var(--colors-color-neutral-fg))',

                                top: '-.05em',
                                left: '.1em',
                                position: 'absolute',
                            },

                            // Footnotes produced by remark GFM plugin.
                            '.footnotes': {
                                borderTop: '1px solid rgb(var(--colors-color-prose-hr))',
                                marginTop: '4em',
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem',
                            },
                            '.footnotes > h2': {
                                marginTop: '1em',
                            },

                            // The `~` class means prose colors should be inherited from the parent containing the `~` class.
                            '.\\~ :where(h1, h2, h3, h4, h5, h6, [class~="lead"], a, .link, dt, blockquote, thead th)': {
                                color: 'inherit',
                            },
                            '.\\~ :where(ol > li, ul > li)::marker': { color: 'inherit' },
                            '.\\~ :where(hr, thead, tbody tr, tfoot)': { borderColor: 'currentColor' },
                            '.\\~ :where(a, .link)': { textDecoration: 'underline' },
                        },
                    },
                },
                keyframes: {
                    'fade-in': {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                    },
                    'subtle-fade-in': {
                        from: { opacity: 0.25 },
                        to: { opacity: 1 },
                    },
                    'fade-out': {
                        from: { opacity: 1 },
                        to: { opacity: 0 },
                    },
                },
                animation: {
                    'fade-in': 'fade-in 150ms linear',
                    'fade-out': 'fade-out 150ms linear',
                    'subtle-fade-in': 'subtle-fade-in 150ms linear',
                },
            },
        },
        plugins: [
            pluginTypography({ className: 'p' }), // In our implementation, `p` = `prose`, `_` = `not-prose` = `not-basic`.
            // The `_` = `not-prose` logic is handled by our PostCSS configuration, which includes a custom plugin.

            // This plugin is what powers all of our theme configurations; {@see https://www.npmjs.com/package/tailwindcss-themer}.
            pluginThemer(mergeThemesConfig({ themesConfig })), // Our own theme system is also called upon here to configure Tailwind themes.

            // This plugin adds support for more animation utilities and comes with a beautiful animation configurator.
            pluginAnimated, // {@see https://www.tailwindcss-animated.com/configurator.html}.
        ],
        content: [
            path.resolve(projDir, './{src,dist}') + '/**/*.' + extensions.asBracedGlob([...extensions.tailwindContent]),

            // If this package is using `@clevercanyon/utilities` we can also scan preact files.
            ...(fs.existsSync(path.resolve(projDir, './node_modules/@clevercanyon/utilities/dist/preact'))
                ? [path.resolve(projDir, './node_modules/@clevercanyon/utilities/dist/preact') + '/**/*.' + extensions.asBracedGlob([...extensions.tailwindContent])]
                : []),

            // Exclusions using negated glob patterns, which should simply be a reflection of `./.npmignore`.
            // However, that’s tricky because Tailwind doesn't provide an explicit negation setting, so we have to use `!`.
            // It’s also tricky because we *do* need to find content inside `node_modules/@clevercanyon/utilities/dist/preact`.
            // Therefore, instead of using `./.npmignore`, we come as close as we can, with just a few exceptions.

            ...exclusions.asNegatedGlobs(
                [
                    ...new Set([
                        ...exclusions.localIgnores,
                        ...exclusions.logIgnores,
                        ...exclusions.backupIgnores,
                        ...exclusions.patchIgnores,
                        ...exclusions.editorIgnores,
                        ...exclusions.toolingIgnores,

                        ...exclusions.pkgIgnores //
                            .filter((ignore) => ignore !== '**/node_modules/**'),
                        '**/src/**/node_modules/**', // More specific.

                        ...exclusions.vcsIgnores,
                        ...exclusions.osIgnores,
                        ...exclusions.dotIgnores,
                        ...exclusions.dtsIgnores,
                        ...exclusions.configIgnores,
                        ...exclusions.lockIgnores,
                        ...exclusions.devIgnores,

                        ...exclusions.distIgnores //
                            .filter((ignore) => ignore !== '**/dist/**'),
                        '**/src/**/dist/**', // More specific.

                        ...exclusions.sandboxIgnores,
                        ...exclusions.exampleIgnores,
                        ...exclusions.docIgnores,
                        ...exclusions.testIgnores,
                        ...exclusions.specIgnores,
                        ...exclusions.benchIgnores,
                    ]),
                ],
                { dropExistingNegations: true },
            ),
        ],
        blocklist: ['!p'], // This `!important` `p` = `prose` gets picked up from `./dist` somewhere.
    };
};