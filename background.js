/* eslint-env webextensions -- Has own globals */

import './polyfills/browser-polyfill.min.js';

/**
 * @param {...any} args
 * @returns {string}
 */
function _ (...args) {
  return browser.i18n.getMessage(...args);
}

// Todo: Would ideally import this jointly with options
const prefLength = 7;

const menuIDs = [
  'Open_Wiki_Edit_Page',
  'Open_Wiki_Edit_Page_new_tab',
  'Open_ISBN_at_Amazon',
  'Open_ISBN_at_Amazon_new_tab'
];

/**
 * @returns {Promise<void>}
 */
async function updateContextMenus () {
  /**
   * @param {PlainObject} root0
   * @param {string} root0.type
   * @returns {void}
   */
  function addContextMenu ({type}) {
    const opts = {
      // icons
      // onclick
      id: type,
      targetUrlPatterns: targetUrlPatterns.length
        ? targetUrlPatterns
        : ['*://*/wiki/*', '*://*/*?title=*', '*://*/*&title=*'],
      title: _(type),
      contexts: ['link']
    };

    try {
      // May not throw
      browser.contextMenus.create(opts);
    } catch (err) {
      // Can err if given bad user pattern
      // eslint-disable-next-line no-console -- Debugging
      console.log('Erred creating context menu');
    }
  }

  const prefs = await browser.storage.local.get(null);

  const targetUrlPatterns = [
    ...Array.from({length: prefLength + 1}).keys()
  ].slice(1).map((num) => {
    return prefs['pref_open_wiki_edit_wildcard' + num];
  }).filter(Boolean);
  // const {separateContextMenus} = await browser.storage.local.get('separateContextMenus');

  await Promise.all(
    menuIDs.map(async (menuID) => {
      try {
        return await browser.contextMenus.remove(menuID);
      } catch (err) {
        // Ignore
        return null;
      }
    })
  );
  menuIDs.forEach((type) => {
    addContextMenu({type});
  });
}

updateContextMenus();

// Todo: Remove the first condition once Firefox 60+ is widespread and works
//         in Chrome?
browser.contextMenus.onShown && browser.contextMenus.onShown.addListener(async ({linkUrl} /* , tab */) => {
  // const {linkUrl} = info;
  // console.log('linkUrl', linkUrl);
  if (!linkUrl) {
    return;
  }
  const isBookSource = decodeURIComponent(linkUrl).includes('Special:BookSources');
  await updateContextMenus();
  await (isBookSource
    ? Promise.all([
      browser.contextMenus.remove('Open_Wiki_Edit_Page'),
      browser.contextMenus.remove('Open_Wiki_Edit_Page_new_tab')
    ])
    : Promise.all([
      browser.contextMenus.remove('Open_ISBN_at_Amazon'),
      browser.contextMenus.remove('Open_ISBN_at_Amazon_new_tab')
    ]));
  browser.contextMenus.refresh();
});

browser.contextMenus.onClicked.addListener(async ({linkUrl, menuItemId}, tab) => {
  if (!menuIDs.includes(menuItemId)) {
    return;
  }

  const isEditableWikiPage = menuItemId.startsWith('Open_Wiki_Edit_Page');

  const prefs = await browser.storage.local.get(null);

  let hasCustom;
  if (isEditableWikiPage) {
    hasCustom = [
      ...Array.from({length: prefLength + 1}).keys()
    ].slice(1).some((num) => {
      const findRegex = prefs['pref_open_wiki_edit_find_regex' + num];
      if (findRegex) {
        let regex;
        try {
          regex = new RegExp(findRegex, 'u');
        } catch (err) {
          // Todo: Should instead do client-side validation in the options;
          //   ideally also the wildcards too which can err
          // eslint-disable-next-line no-console -- Debugging
          console.log('Error in regex');
          return false;
        }
        const hasMatch = regex.test(linkUrl);
        const replace = prefs['pref_open_wiki_edit_replace_regex' + num];
        linkUrl = linkUrl.replace(regex, replace);
        return hasMatch;
      }
      return false;
    });
  }

  const newURL = isEditableWikiPage
    ? (hasCustom
      ? linkUrl
      : linkUrl.replace(/(?:(\/)wiki\/|[?&]title=)([^?&]*)/u, '$1w/index.php?action=edit&title=$2'))
    : linkUrl.replace(
      /^.*?(?:(\/)wiki\/|[?&]title=)Special:BookSources\/([^?&]*)/u,
      'http://www.amazon.com/gp/search/?ie=UTF8&Adv-Srch-Books-Submit.y=0' +
                '&sort=relevanceexprank&search-alias=stripbooks&tag=wiki-addon-20' +
                '&linkCode=ur2&unfiltered=1&camp=1789&Adv-Srch-Books-Submit.x=0' +
                '&field-dateop=&creative=390957&field-isbn=$2'
    );

  await (
    menuItemId.endsWith('new_tab')
      ? browser.tabs.create({
        openerTabId: tab.id, // Of what use is there to indicate the opener like this?
        active: true,
        url: newURL
      })
      : browser.tabs.update(tab.id, {
        url: newURL
      })
  );
});
