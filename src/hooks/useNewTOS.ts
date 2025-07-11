import { DateTime } from 'luxon';
import type { DateString } from '../data/trades.data';
import getTimeZoneFromString from '../helpers/getTimeZoneFromString';
import isUSTimeZone from '../helpers/isUSTimeZone';

interface useNewTOSProps {
	date: DateString;
	timeZone: string;
}

/**
 * Determines if a user is under the new Terms of Service (TOS) based on their sign-up date and time zone.
 *
 * @param {useNewTOSProps} params - The parameters for the hook.
 * @param {string} params.date - The ISO string representing the user's sign-up date.
 * @param {string} params.timeZone - The user's time zone (e.g., 'PST').
 * @returns {boolean} Returns `true` if the user's sign-up date is on or after the TOS update date for their time zone, otherwise `false`,  or `null` if the time zone is invalid..
 */
export function useNewTOS({ date, timeZone }: useNewTOSProps): boolean | null {
	const validZone = getTimeZoneFromString(timeZone);

	if (!validZone) return null;
	const isUS = isUSTimeZone(timeZone);
	const TOS_UPDATE_DATE = isUS ? '1/2/2020' : '2/1/2020';
	const dateFormat = isUS ? 'M/d/yyyy' : 'd/M/yyyy';

	const signUpDate = DateTime.fromFormat(date, dateFormat, {
		zone: validZone,
	});
	const newTOSDate = DateTime.fromFormat(TOS_UPDATE_DATE, dateFormat, {
		zone: validZone,
	});

	return signUpDate > newTOSDate;
}
