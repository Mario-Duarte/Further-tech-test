/**
 * Determines if the provided time zone string represents a US time zone.
 *
 * Currently, this function checks if the input string contains either 'PST' (Pacific Standard Time)
 * or 'EST' (Eastern Standard Time).
 *
 * @param zone - The time zone string to check.
 * @returns `true` if the zone includes 'PST' or 'EST', otherwise `false`.
 */
function isUSTimeZone(zone:string) {
    return zone.includes('PST') || zone.includes('EST');
}

export default isUSTimeZone;