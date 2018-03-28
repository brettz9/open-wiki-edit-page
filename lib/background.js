/* eslint-env webextensions */
'use strict';

function _ (...args) {
    return browser.i18n.getMessage(...args);
}

const menuIDs = [];

function addContextMenu ({type}) {
    const opts = {
        // icons
        // onclick
        id: type,
        targetUrlPatterns: ['*://*/wiki/*', '*://*/*?title=*', '*://*/*&title=*'],
        title: _(type),
        contexts: ['link']
    };

    const menuID = browser.contextMenus.create(opts);
    menuIDs.push(menuID);
}

async function updateContextMenus () {
    menuIDs.forEach((menuID) => {
        browser.contextMenus.remove(menuID);
    });
    // const {separateContextMenus} = await browser.storage.local.get('separateContextMenus');
    addContextMenu({type: 'Open_Wiki_Edit_Page'});
    addContextMenu({type: 'Open_Wiki_Edit_Page_new_tab'});
    addContextMenu({type: 'Open_ISBN_at_Amazon'});
    addContextMenu({type: 'Open_ISBN_at_Amazon_new_tab'});
}

updateContextMenus();

// Todo: Remove the first condition once Firefox 60+ is widespread
browser.contextMenus.onShown && browser.contextMenus.onShown.addListener(async ({linkUrl} /* , tab */) => {
    // const {linkUrl} = info;
    // console.log('linkUrl', linkUrl);
    if (!linkUrl) {
        return;
    }
    const isBookSource = decodeURIComponent(linkUrl).includes('Special:BookSources');
    updateContextMenus();
    if (isBookSource) { // For true or false
        // await Promise.all([ // If this were necessary, we'd also need
        //   the callback argument (no promises return) for menus.create
        browser.contextMenus.remove('Open_Wiki_Edit_Page');
        browser.contextMenus.remove('Open_Wiki_Edit_Page_new_tab');
        // ]);
    } else {
        // await Promise.all([
        browser.contextMenus.remove('Open_ISBN_at_Amazon');
        browser.contextMenus.remove('Open_ISBN_at_Amazon_new_tab');
        // ]);
    }
    browser.contextMenus.refresh();
});

browser.contextMenus.onClicked.addListener(async ({linkUrl, menuItemId}, tab) => {
    const script = {
        'Open_Wiki_Edit_Page': 'openSameTab.js',
        'Open_Wiki_Edit_Page_new_tab': 'openNewTab.js',
        'Open_ISBN_at_Amazon': 'openISBNSameTab.js',
        'Open_ISBN_at_Amazon_new_tab': 'openISBNNewTab.js'
    }[menuItemId];
    if (script === undefined) {
        return;
    }

    const isEditableWikiPage = menuItemId.startsWith('Open_Wiki_Edit_Page');

    const newURL = isEditableWikiPage
        ? linkUrl.replace(/(?:(\/)wiki\/|[?]title=)([^?&]*)/, '$1w/index.php?action=edit&title=$2')
        : linkUrl.replace(
            /^.*?(?:(\/)wiki\/|[?]title=)Special:BookSources\/([^?&]*)/,
            'http://www.amazon.com/gp/search/?ie=UTF8&Adv-Srch-Books-Submit.y=0' +
                '&sort=relevanceexprank&search-alias=stripbooks&tag=wiki-addon-20' +
                '&linkCode=ur2&unfiltered=1&camp=1789&Adv-Srch-Books-Submit.x=0' +
                '&field-dateop=&creative=390957&field-isbn=$2'
        );

    if (menuItemId.endsWith('new_tab')) {
        await browser.tabs.create({
            openerTabId: tab.id, // Of what use is there to indicate the opener like this?
            active: true,
            url: newURL
        });
    } else {
        await browser.tabs.update(tab.id, {
            url: newURL
        });
    }
});
