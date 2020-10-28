// To parse this data:
//
//   const Convert = require("./file");
//
//   const openLibrary = Convert.toOpenLibrary(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toOpenLibrary(json) {
    return cast(JSON.parse(json), r("OpenLibrary"));
}

function openLibraryToJson(value) {
    return JSON.stringify(uncast(value, r("OpenLibrary")), null, 2);
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
    "OpenLibrary": o([
        { json: "ISBN:0385472579", js: "ISBN:0385472579", typ: r("Isbn0385472579") },
        { json: "LCCN:62019420", js: "LCCN:62019420", typ: r("Lccn62019420") },
    ], false),
    "Isbn0385472579": o([
        { json: "info_url", js: "info_url", typ: "" },
        { json: "bib_key", js: "bib_key", typ: "" },
        { json: "preview_url", js: "preview_url", typ: "" },
        { json: "thumbnail_url", js: "thumbnail_url", typ: "" },
        { json: "details", js: "details", typ: r("ISBN0385472579_Details") },
        { json: "preview", js: "preview", typ: "" },
    ], false),
    "ISBN0385472579_Details": o([
        { json: "identifiers", js: "identifiers", typ: r("PurpleIdentifiers") },
        { json: "subtitle", js: "subtitle", typ: "" },
        { json: "contributors", js: "contributors", typ: a(r("Contributor")) },
        { json: "covers", js: "covers", typ: a(0) },
        { json: "local_id", js: "local_id", typ: a("") },
        { json: "lc_classifications", js: "lc_classifications", typ: a("") },
        { json: "latest_revision", js: "latest_revision", typ: 0 },
        { json: "contributions", js: "contributions", typ: a("") },
        { json: "uri_descriptions", js: "uri_descriptions", typ: a("") },
        { json: "genres", js: "genres", typ: a("") },
        { json: "source_records", js: "source_records", typ: a("") },
        { json: "title", js: "title", typ: "" },
        { json: "languages", js: "languages", typ: a(r("Type")) },
        { json: "subjects", js: "subjects", typ: a("") },
        { json: "publish_country", js: "publish_country", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "uris", js: "uris", typ: a("") },
        { json: "revision", js: "revision", typ: 0 },
        { json: "publishers", js: "publishers", typ: a("") },
        { json: "last_modified", js: "last_modified", typ: r("Created") },
        { json: "key", js: "key", typ: "" },
        { json: "authors", js: "authors", typ: a(r("Author")) },
        { json: "publish_places", js: "publish_places", typ: a("") },
        { json: "lccn", js: "lccn", typ: a("") },
        { json: "pagination", js: "pagination", typ: "" },
        { json: "classifications", js: "classifications", typ: r("Classifications") },
        { json: "created", js: "created", typ: r("Created") },
        { json: "url", js: "url", typ: a("") },
        { json: "number_of_pages", js: "number_of_pages", typ: 0 },
        { json: "dewey_decimal_class", js: "dewey_decimal_class", typ: a("") },
        { json: "isbn_10", js: "isbn_10", typ: a("") },
        { json: "publish_date", js: "publish_date", typ: "" },
        { json: "work_title", js: "work_title", typ: a("") },
        { json: "works", js: "works", typ: a(r("Type")) },
    ], false),
    "Author": o([
        { json: "name", js: "name", typ: "" },
        { json: "key", js: "key", typ: "" },
    ], false),
    "Classifications": o([
    ], false),
    "Contributor": o([
        { json: "role", js: "role", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "Created": o([
        { json: "type", js: "type", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "PurpleIdentifiers": o([
        { json: "goodreads", js: "goodreads", typ: a("") },
        { json: "librarything", js: "librarything", typ: a("") },
    ], false),
    "Type": o([
        { json: "key", js: "key", typ: "" },
    ], false),
    "Lccn62019420": o([
        { json: "bib_key", js: "bib_key", typ: "" },
        { json: "preview", js: "preview", typ: "" },
        { json: "preview_url", js: "preview_url", typ: "" },
        { json: "info_url", js: "info_url", typ: "" },
        { json: "details", js: "details", typ: r("LCCN62019420_Details") },
    ], false),
    "LCCN62019420_Details": o([
        { json: "identifiers", js: "identifiers", typ: r("FluffyIdentifiers") },
        { json: "subject_place", js: "subject_place", typ: a("") },
        { json: "lc_classifications", js: "lc_classifications", typ: a("") },
        { json: "latest_revision", js: "latest_revision", typ: 0 },
        { json: "contributions", js: "contributions", typ: a("") },
        { json: "source_records", js: "source_records", typ: a("") },
        { json: "title", js: "title", typ: "" },
        { json: "languages", js: "languages", typ: a(r("Type")) },
        { json: "subjects", js: "subjects", typ: a("") },
        { json: "publish_country", js: "publish_country", typ: "" },
        { json: "series", js: "series", typ: a("") },
        { json: "by_statement", js: "by_statement", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "revision", js: "revision", typ: 0 },
        { json: "publishers", js: "publishers", typ: a("") },
        { json: "description", js: "description", typ: r("Created") },
        { json: "last_modified", js: "last_modified", typ: r("Created") },
        { json: "key", js: "key", typ: "" },
        { json: "authors", js: "authors", typ: a(r("Author")) },
        { json: "publish_places", js: "publish_places", typ: a("") },
        { json: "pagination", js: "pagination", typ: "" },
        { json: "created", js: "created", typ: r("Created") },
        { json: "dewey_decimal_class", js: "dewey_decimal_class", typ: a("") },
        { json: "number_of_pages", js: "number_of_pages", typ: 0 },
        { json: "lccn", js: "lccn", typ: a("") },
        { json: "publish_date", js: "publish_date", typ: "" },
        { json: "works", js: "works", typ: a(r("Type")) },
    ], false),
    "FluffyIdentifiers": o([
        { json: "librarything", js: "librarything", typ: a("") },
    ], false),
};

module.exports = {
    "openLibraryToJson": openLibraryToJson,
    "toOpenLibrary": toOpenLibrary,
};
