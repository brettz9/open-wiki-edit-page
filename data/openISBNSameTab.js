// openISBNSameTab.js - Open Wiki Edit Page's module
/*globals self*/
(function () {'use strict';

self.on('context', function (node) {
  return (/\/wiki\/|[?]title=/).test(node.href) && decodeURIComponent(node.href).indexOf('Special:BookSources') > -1;
});
self.on('click', function (node, data) {
  var href = node.href.replace(
    /^.*?(?:(\/)wiki\/|[?]title=)Special:BookSources\/([^?&]*)/,
    'http://www.amazon.com/gp/search/?ie=UTF8&Adv-Srch-Books-Submit.y=0&sort=relevanceexprank&search-alias=stripbooks&tag=wiki-addon-20'+
      '&linkCode=ur2&unfiltered=1&camp=1789&Adv-Srch-Books-Submit.x=0&field-dateop=&creative=390957&field-isbn=$2'
  );
  window.location.href = href;
});

}());
