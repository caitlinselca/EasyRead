// To parse this data:
//
//   const Convert = require("./file");
//
//   const goodReads = Convert.toGoodReads(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toGoodReads(json) {
    return cast(JSON.parse(json), r("GoodReads"));
}

function goodReadsToJson(value) {
    return JSON.stringify(uncast(value, r("GoodReads")), null, 2);
}

function invalidValue(typ, val, key = '') {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val, typ, getProps, key = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}

function a(typ) {
    return { arrayItems: typ };
}

function u(...typs) {
    return { unionMembers: typs };
}

function o(props, additional) {
    return { props, additional };
}

function m(additional) {
    return { props: [], additional };
}

function r(name) {
    return { ref: name };
}

const typeMap = {
    "GoodReads": o([
        { json: "Request", js: "Request", typ: r("Request") },
        { json: "search", js: "search", typ: r("Search") },
    ], false),
    "Request": o([
        { json: "authentication", js: "authentication", typ: "" },
        { json: "key", js: "key", typ: "" },
        { json: "method", js: "method", typ: "" },
    ], false),
    "Search": o([
        { json: "query", js: "query", typ: "" },
        { json: "results-start", js: "results-start", typ: "" },
        { json: "results-end", js: "results-end", typ: "" },
        { json: "total-results", js: "total-results", typ: "" },
        { json: "source", js: "source", typ: "" },
        { json: "query-time-seconds", js: "query-time-seconds", typ: "" },
        { json: "results", js: "results", typ: a(r("Result")) },
    ], false),
    "Result": o([
        { json: "id", js: "id", typ: r("BooksCount") },
        { json: "books_count", js: "books_count", typ: r("BooksCount") },
        { json: "ratings_count", js: "ratings_count", typ: r("BooksCount") },
        { json: "text_reviews_count", js: "text_reviews_count", typ: r("BooksCount") },
        { json: "original_publication_year", js: "original_publication_year", typ: r("BooksCount") },
        { json: "original_publication_month", js: "original_publication_month", typ: r("OriginalPublication") },
        { json: "original_publication_day", js: "original_publication_day", typ: r("OriginalPublication") },
        { json: "average_rating", js: "average_rating", typ: "" },
        { json: "best_book", js: "best_book", typ: r("BestBook") },
    ], false),
    "BestBook": o([
        { json: "@type", js: "@type", typ: r("BestBookType") },
        { json: "id", js: "id", typ: r("BooksCount") },
        { json: "title", js: "title", typ: "" },
        { json: "author", js: "author", typ: r("Author") },
        { json: "image_url", js: "image_url", typ: "" },
        { json: "small_image_url", js: "small_image_url", typ: "" },
    ], false),
    "Author": o([
        { json: "id", js: "id", typ: r("BooksCount") },
        { json: "name", js: "name", typ: "" },
    ], false),
    "BooksCount": o([
        { json: "@type", js: "@type", typ: r("BooksCountType") },
        { json: "#text", js: "#text", typ: "" },
    ], false),
    "OriginalPublication": o([
        { json: "@type", js: "@type", typ: r("BooksCountType") },
        { json: "@nil", js: "@nil", typ: u(undefined, "") },
        { json: "#text", js: "#text", typ: u(undefined, "") },
    ], false),
    "BestBookType": [
        "Book",
    ],
    "BooksCountType": [
        "integer",
    ],
};

module.exports = {
    "goodReadsToJson": goodReadsToJson,
    "toGoodReads": toGoodReads,
};