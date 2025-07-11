import { DateTime } from 'luxon';
import type { Trade } from '../data/trades.data';
import isUSTimeZone from '../helpers/isUSTimeZone';
import getTimeZoneFromString from '../helpers/getTimeZoneFromString';
import { useNewTOS } from './useNewTOS';
import useGetRegisteredDateTime from './useGetRegisteredDateTime';

interface useCanBeRefundedProps {
	tradeData: Trade;
}

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
		approvalTimeLimit = userUnderNewTos ? 24 : 4;
	} else if (tradeData.source === 'webApp') {
		approvalTimeLimit = userUnderNewTos ? 16 : 8;
	} else {
		return null;
	}

	console.table([
		{
			label: 'Investment',
			dateTime: investmentDateTime.toFormat('d/M/yyyy HH:mm'),
		},
		{
			label: 'Refund Registered',
			dateTime: registeredRefundDateTime.toFormat('d/M/yyyy HH:mm'),
		},
		{
			label: 'Time elapsed',
			time: timeDifferenceInHours,
		},
		{
			label: 'Week day registered',
			day:
				registeredRefundDateTime.weekdayLong +
				' ' +
				tradeData.source,
		},
	]);

	return timeDifferenceInHours <= approvalTimeLimit;
}

export default useCanBeRefunded;
