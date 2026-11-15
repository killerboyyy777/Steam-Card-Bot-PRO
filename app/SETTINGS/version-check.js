/**
 * Safely read the version from the upstream package.json response.
 * Returns null for request failures, unsuccessful HTTP responses, and invalid JSON.
 */
function parseRemoteVersion(error, response, body) {
    if (error || !response || response.statusCode !== 200 || typeof body !== "string") {
        return null;
    }

    try {
        const parsed = JSON.parse(body);
        return parsed && typeof parsed.version === "string" && parsed.version.trim()
            ? parsed.version.trim()
            : null;
    } catch {
        return null;
    }
}

module.exports = { parseRemoteVersion };
