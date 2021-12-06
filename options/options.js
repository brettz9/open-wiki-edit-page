/* eslint-env browser, webextensions -- Has own globals */
import {jml, body} from './jml.js';

/**
 * @param {...string} args
 * @returns {string}
 */
function _ (...args) {
  return browser.i18n.getMessage(...args);
}

document.title = _('extensionName'); // If switch to tabs
(async () => {
// Todo: Allow user choice of one or more extra items
jml('section', await Promise.all([...Array.from({length: 5}).keys()].slice(1).map(async (num) => {
  let wildcard;
  let findRegex;
  let replaceRegex;
  try {
    ({
      ['pref_open_wiki_edit_wildcard' + num]: wildcard,
      ['pref_open_wiki_edit_find_regex' + num]: findRegex,
      ['pref_open_wiki_edit_replace_regex' + num]: replaceRegex
    } = await browser.storage.local.get(null));
  } catch (err) {}
  return ['fieldset', [
    ['legend', {class: 'addon-description'}, [
      _('pref_open_wiki_edit_find_replace', String(num))
    ]],
    ['label', [
      _('pref_open_wiki_edit_wildcard_title'),
      ' ',
      ['a', {
        target: '_blank',
        href: 'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns'
      }, ['?']],
      ' ',
      ['input', {
        value: wildcard || '',
        placeholder: '*://*/wiki/*',
        $on: {
          async change ({target}) {
            await browser.storage.local.set({
              ['pref_open_wiki_edit_wildcard' + num]: target.value
            });
            // const backgroundPage = browser.extension.getBackgroundPage();
            // backgroundPage.updateContextMenus();
          }
        }
      }]
    ]],
    ['br'],
    ['label', [
      _('pref_open_wiki_edit_find_title'),
      ' ',
      ['input', {
        value: findRegex || '',
        placeholder: '(?:(/)wiki/|[?]title=)([^?&]*)',
        size: 30,
        $on: {
          async change ({target}) {
            await browser.storage.local.set({
              ['pref_open_wiki_edit_find_regex' + num]: target.value
            });
            // const backgroundPage = browser.extension.getBackgroundPage();
            // backgroundPage.updateContextMenus();
          }
        }
      }]
    ]],
    ['br'],
    ['label', [
      _('pref_open_wiki_edit_replace_title'),
      ' ',
      ['input', {
        value: replaceRegex || '',
        placeholder: '$1w/index.php?action=edit&title=$2',
        size: 30,
        $on: {
          async change ({target}) {
            await browser.storage.local.set({
              ['pref_open_wiki_edit_replace_regex' + num]: target.value
            });
            // const backgroundPage = browser.extension.getBackgroundPage();
            // backgroundPage.updateContextMenus();
          }
        }
      }]
    ]]
  ]];
})), body);
})();
