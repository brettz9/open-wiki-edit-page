# CHANGES

## 0.11.0

- fix: avoid potentially problematic multiple replacements per URL

## 0.10.0
## 0.9.0

- Bumping version for AMO review

## 0.8.0

- Add three more preference slots for regex replacements

## 0.7.0

- feat: support dynamic wildcard targets and find-replacements
- npm: Add ignore file

## 0.6.1

- Fix: Bump version in updated `manifest.json`

## 0.6.0

- Fix: Ensure menu removal avoids possible race conditions
- Linting: Apply latest ash-nazg, using a recommended extension
- Maintenance: Add `.editorconfig`
- Build: Avoid bundling `package.json` and `package-lock.json` to builds
- npm: Fix script to copy minimized form of polyfill file and apply

## 0.5.2

- Fix: Avoid bundling screenshot file to minimize distribution size

## 0.5.1

- Fix: Bundle version in updated `manifest.json`

## 0.5.0

- Enhancement: Only inject context menu on "/wiki/" and "title=" formatted
    links
- Enhancement: For Firefox 60+, besides avoiding injecting context menu items
    on non-wiki links, also avoid for ISBN items on non-ISBN wiki links or
    for normal edit items when it is an ISBN link (`all_urls` host permissions
    are unfortunately needed for this)
- Linting: Use eslint-config-standard
- npm: Add ESLint devDeps
- npm: Specify scripts for running specific versions of Firefox

## 0.4.0

- Move to webextensions; as per
    <https://bugzilla.mozilla.org/show_bug.cgi?id=1341804#c2>,
    webextensions lacks a means to fine-tune whether a context menu applies
    or not, so the context menu must now appear on all links instead of
    only those matching a pattern.

## 0.3.0

- Use `browser.tabs.loadInBackground` `about:config` setting for
    whether to load tabs in background or not.

## 0.2.0

- Add support for private window browsing

## 0.1.1

- jpm packaging

## 0.1.0

- Internationalized
