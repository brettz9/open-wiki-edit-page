// openNewTab.js - Open Wiki Edit Page's module
/*globals self*/
(function () {'use strict';

self.on('context', function (node) {
    return (/\/wiki\/|[?]title=/).test(node.href) && decodeURIComponent(node.href).indexOf('Special:BookSources') === -1;
});
self.on('click', function (node, data) {
    var href = node.href.replace(/(?:(\/)wiki\/|[?]title=)([^?&]*)/, '$1w/index.php?action=edit&title=$2');
    self.postMessage(href);
});

}());
