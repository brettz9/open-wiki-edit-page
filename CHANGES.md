# CHANGES

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
