const test = require("node:test");
const assert = require("node:assert/strict");
const { parseRemoteVersion } = require("../app/SETTINGS/version-check.js");

test("reads a valid successful version response", () => {
    assert.equal(parseRemoteVersion(null, { statusCode: 200 }, '{"version":"2.0.0"}'), "2.0.0");
});

test("ignores request errors and unsuccessful HTTP responses", () => {
    assert.equal(parseRemoteVersion(new Error("offline"), null, undefined), null);
    assert.equal(parseRemoteVersion(null, { statusCode: 503 }, '{"version":"2.0.0"}'), null);
});

test("ignores malformed JSON and missing or invalid versions", () => {
    assert.equal(parseRemoteVersion(null, { statusCode: 200 }, "<html>maintenance</html>"), null);
    assert.equal(parseRemoteVersion(null, { statusCode: 200 }, '{"name":"bot"}'), null);
    assert.equal(parseRemoteVersion(null, { statusCode: 200 }, '{"version":"  "}'), null);
});
