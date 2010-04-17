# wraps-tagsoup

A simple [TagSoup](http://home.ccil.org/~cowan/XML/tagsoup/) wrapper for [RingoJS](http://ringojs.org/).

It exports a single function, `parse`, which accepts either a URL or an HTML document as string and returns an [E4X](http://rephrase.net/days/07/06/e4x) XML object.

    var tagsoup = require("wraps/tagsoup");
    var page = tagsoup.parse("http://news.ycombinator.com/");
    default xml namespace = page.namespace();
    [a.@href for each (a in page..a) if (String(a.text()).match(/\d+ comments?/))]

## License

wraps-tagsoup is available under the same license as RingoJS.

The TagSoup library bundled with this package is licensed under the Apache License 2.0.