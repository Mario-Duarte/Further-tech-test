import { DateTime } from 'luxon';
import type { Trade } from '../data/trades.data';
import isUSTimeZone from '../helpers/isUSTimeZone';
import getTimeZoneFromString from '../helpers/getTimeZoneFromString';
import { useNewTOS } from './useNewTOS';
import useGetRegisteredDateTime from './useGetRegisteredDateTime';

interface useCanBeRefundedProps {
	tradeData: Trade;
}

/**
 * Determines whether a trade can be refunded based on the user's Terms of Service (TOS),
 * the source of the refund request, and the time elapsed between the investment and the refund request.
 *
 * The function applies different approval time limits depending on whether the user is under the new or old TOS,
 * and whether the refund request was made via phone or web app. It also considers the user's time zone and
 * formats dates accordingly.
 *
 * @param tradeData - An object containing trade information, including sign-up date, time zone,
 * investment date and time, refund request date and time, and the source of the request.
 * @returns `true` if the refund request is within the allowed time limit, `false` if not, or `null`
 * if required data is missing or invalid.
 */
function useCanBeRefunded({
	tradeData,
}: useCanBeRefundedProps): boolean | null {

    // check if user is under new vs old TOS
	const userUnderNewTos = useNewTOS({
		date: tradeData.signUpDate,
		timeZone: tradeData.timeZone,
	});

    // Apply special phone call rules and return the registered datetime for the refund
	const registeredRefundDateTime = useGetRegisteredDateTime({
		date: tradeData.refundRequestDate,
		time: tradeData.refoundRequestTime,
		timeZone: tradeData.timeZone,
		source: tradeData.source,
	});

	if (!registeredRefundDateTime || userUnderNewTos === null) return null;

	const investmentTimeZone = getTimeZoneFromString(tradeData.timeZone);
	if (!investmentTimeZone) return null;

	const isUS = isUSTimeZone(investmentTimeZone);
	const dateFormat = isUS ? 'M/d/yyyy HH:mm' : 'd/M/yyyy HH:mm';

	let investmentDateTime = DateTime.fromFormat(
		`${tradeData.investmentDate} ${tradeData.investmentTime}`,
		dateFormat,
		{ zone: investmentTimeZone }
	);

	investmentDateTime = investmentDateTime.setZone('GMT');

	// Calculate time difference between investment and refund request
	const timeDifferenceInHours = registeredRefundDateTime.diff(
		investmentDateTime,
		'hours'
	).hours;

	// Determine approval time limit based on source and TOS in hours
	let approvalTimeLimit: number;
	if (tradeData.source === 'phone') {
		// For phone requests, apply different limits based on TOS
		approvalTimeLimit = userUnderNewTos ? 24 : 4;
	} else if (tradeData.source === 'webApp') {
		// For web app requests, apply different limits based on TOS
		approvalTimeLimit = userUnderNewTos ? 16 : 8;
	} else {
		return null;
	}

	return timeDifferenceInHours <= approvalTimeLimit;
}

export default useCanBeRefunded;
