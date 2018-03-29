# open-wiki-edit-page

A webextensions add-on
([Firefox](https://addons.mozilla.org/en-US/firefox/addon/open-wiki-edit-page/)
or
[Chrome](https://chrome.google.com/webstore/detail/open-wiki-edit-page/bgkapcgalpheigeojpgjgomopmmdpgaj?hl=en-US))
to allow right-clicking on a Mediawiki-style link (as used at
[Wikipedia](https://wikipedia.org)) to be able to
go directly to its edit page (within the same window or a new tab).

Looks for the pattern `/wiki/title` or `title=(title)` within links
to change them into: `?action=edit&title=(title)` links.

Also provides two "Open ISBN at Amazon" options (leading
to the same window or current tab) when right-clicking on a link containing
`Special:BookSources` (the format for links leading to ISBN numbers
at Mediawiki sites).

The context menu options only appear when right-clicking qualifying links,
so it otherwise will not clutter the context menu, even for (non-wiki) links.

## To-dos

1. Allow option to specify a URL alternative to Amazon
1. Allow right-clicking on ISBN links which have the number in the text and
    are not limited to the wiki `Special:BookSources` form
