import { DateTime } from 'luxon';
import type { DateString, TimeString, Source } from '../data/trades.data';
import getTimeZoneFromString from '../helpers/getTimeZoneFromString';
import isUSTimeZone from '../helpers/isUSTimeZone';

interface useGetRegisteredDateTimeProps {
	date: DateString;
	time: TimeString;
	timeZone: string;
	source: Source;
}

/**
 * Returns a Luxon `DateTime` object representing the registered date and time,
 * adjusted according to the user's time zone and request source.
 *
 * - Parses the provided `date` and `time` strings using a format based on whether the time zone is US or not.
 * - If the `source` is `'phone'`, modifies the registered date/time to the next business day at 9:00 AM GMT if:
 *   - The request is made on a weekend (Saturday or Sunday).
 *   - The request is made after 7:00 PM GMT.
 *   - The request is made before 9:00 AM GMT.
 * - Returns `null` if the provided `timeZone` is invalid.
 *
 * @param params - An object containing:
 *   @param date - The date string to parse.
 *   @param time - The time string to parse.
 *   @param timeZone - The user's time zone string.
 *   @param source - The source of the request ('phone' or 'webApp').
 * @returns The registered `DateTime` object, adjusted as necessary, or `null` if the time zone is invalid.
 */
function useGetRegisteredDateTime({
	date,
	time,
	timeZone,
	source,
}: useGetRegisteredDateTimeProps): DateTime | null {
	const validZone = getTimeZoneFromString(timeZone);
	if (!validZone) return null;

	const isUS = isUSTimeZone(timeZone);
	const dateFormat = isUS ? 'M/d/yyyy HH:mm' : 'd/M/yyyy HH:mm';

	let refundRequestDateTime = DateTime.fromFormat(
		`${date} ${time}`,
		dateFormat,
		{
			zone: validZone,
		}
	);

	//Only modify the registered date if user requested via phone
	if (source === 'phone') {
		// get the date time in GMT before running checks
		refundRequestDateTime = refundRequestDateTime.setZone('GMT');
		const hour = refundRequestDateTime.hour;
		const weekday = refundRequestDateTime.weekdayLong;

		if (weekday === 'Saturday') {
			// If the request is on a Saturday, set it to 9 AM GMT on the next Monday
			refundRequestDateTime = refundRequestDateTime
				.plus({ days: 2 })
				.set({ hour: 9, minute: 0 });
		} else if (weekday === 'Sunday') {
			// If the request is on a Sunday, set it to 9 AM GMT on the next Monday
			refundRequestDateTime = refundRequestDateTime
				.plus({ days: 1 })
				.set({ hour: 9, minute: 0 });
		} else if (hour >= 17) {
			if (weekday === 'Friday') {
				// If the request is after 5 PM GMT on a Friday, set it to 9 AM GMT on the next Monday
				refundRequestDateTime = refundRequestDateTime
					.plus({ days: 3 })
					.set({ hour: 9, minute: 0 });
			} else {
				// If the request is after 5 PM GMT on a weekday, set it to 9 AM GMT on the next day
				refundRequestDateTime = refundRequestDateTime
					.plus({ days: 1 })
					.set({ hour: 9, minute: 0 });
			}
		} else if (hour < 9) {
			// If the request is before 9 AM GMT, set it to 9 AM GMT on the same day
			refundRequestDateTime = refundRequestDateTime.set({
				hour: 9,
				minute: 0,
			});
		}
	}

	// Return the adjusted registered date/time
	return refundRequestDateTime;
}

export default useGetRegisteredDateTime;
