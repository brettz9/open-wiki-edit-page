/*globals exports, require*/
// This is an active module of the Open Wiki Edit Page Add-on

/*
Todos:
1. Add unload
*/
(function () {'use strict';

exports.main = function() {
    // We won't use URLContext as links to wikis could occur on non-wiki sites as well
    var _ = require('sdk/l10n').get,
        contextMenu = require('sdk/context-menu'),
        tabs = require('sdk/tabs'),
        data = require('sdk/self').data,
        prefServ = require('sdk/preferences/service');

    contextMenu.Item({
        label: _("Open_Wiki_Edit_Page"),
        context: contextMenu.SelectorContext('a[href]'),
        contentScriptFile: data.url('openSameTab.js')
    });

    contextMenu.Item({
        label: _("Open_Wiki_Edit_Page_new_tab"),
        context: contextMenu.SelectorContext('a[href]'),
        contentScriptFile: data.url('openNewTab.js'),
        onMessage: function (href) {
            tabs.open({
                url: href,
                inBackground: prefServ.get('browser.tabs.loadInBackground', true)
            });
        }
    });

    contextMenu.Item({
        label: _("Open_ISBN_at_Amazon"),
        context: contextMenu.SelectorContext('a[href]'),
        contentScriptFile: data.url('openISBNSameTab.js')
    });

    contextMenu.Item({
        label: _("Open_ISBN_at_Amazon_new_tab"),
        context: contextMenu.SelectorContext('a[href]'),
        contentScriptFile: data.url('openISBNNewTab.js'),
        onMessage: function (href) {
            tabs.open({
                url: href,
                inBackground: prefServ.get('browser.tabs.loadInBackground', true)
            });
        }
    });

};

}());
