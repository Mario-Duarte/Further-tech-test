const timeZoneMap: Record<string, string> = {
    'US (PST)': 'PST',
    'US (EST)': 'EST',
    'Europe (CET)': 'CET',
    'Europe (GMT)': 'GMT',
};

/**
 * Retrieves the corresponding time zone value from a given string identifier.
 *
 * @param zone - The string key representing a time zone.
 * @returns The mapped time zone value if found; otherwise, `null`.
 */
function getTimeZoneFromString(zone:string) {
    return timeZoneMap[zone] || null;
}

export default getTimeZoneFromString;