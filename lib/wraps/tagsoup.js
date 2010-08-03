var httpclient = require("ringo/httpclient");

export("parse");

var transform = javax.xml.transform;
var sax = org.xml.sax;
var tagsoup = org.ccil.cowan.tagsoup;

function ensureHTML(htmlOrURL) {
    return (htmlOrURL.indexOf("http://") == 0 || htmlOrURL.indexOf("https://") == 0) && htmlOrURL.indexOf("\n") == -1
        ? new httpclient.Client().get(htmlOrURL).content
        : htmlOrURL
    ;
}

function toXMLString(domNode) {
    var out = new java.io.StringWriter();
    transform.TransformerFactory.newInstance().newTransformer().transform(
        new transform.dom.DOMSource(domNode), new transform.stream.StreamResult(out));
    return new String(out);
}

function parse(htmlOrURL) {
    var domResult = new transform.dom.DOMResult();
    transform.TransformerFactory.newInstance().newTransformer().transform(
        new transform.sax.SAXSource(new tagsoup.Parser(), new sax.InputSource(new java.io.StringReader(ensureHTML(htmlOrURL)))), domResult);
    return new XML(toXMLString(domResult.node).replace(/^<\?xml\s+[^?]*\?>/, ""));
}
