// Date pattern (dd-mm-yyyy) for Europe and (mm-dd-yyyy) for US
export type DateString = `${number}/${number}/${number}`;

// Time pattern (hh:mm)
export type TimeString = `${number}:${number}`;

// Source of the request (phone | webApp)
export type Source = 'phone' | 'webApp';

export interface Trade {
	name: string;
	timeZone: string;
	signUpDate: DateString;
	source: Source;
	investmentDate: DateString;
	investmentTime: TimeString;
	refundRequestDate: DateString;
	refoundRequestTime: TimeString;
}

export const TradesData: Trade[] = [
	{
		name: 'Emma Smith',
		timeZone: 'US (PST)',
		signUpDate: '1/2/2020',
		source: 'phone',
		investmentDate: '1/2/2021',
		investmentTime: '06:00',
		refundRequestDate: '1/2/2021',
		refoundRequestTime: '09:00',
	},
	{
		name: 'Benjamin Johnson',
		timeZone: 'Europe (CET)',
		signUpDate: '12/2/2020',
		source: 'webApp',
		investmentDate: '2/1/2021',
		investmentTime: '06:30',
		refundRequestDate: '1/2/2021',
		refoundRequestTime: '23:00',
	},
	{
		name: 'Olivia Davis',
		timeZone: 'Europe (CET)',
		signUpDate: '1/2/2020',
		source: 'webApp',
		investmentDate: '2/2/2021',
		investmentTime: '13:00',
		refundRequestDate: '2/2/2021',
		refoundRequestTime: '20:00',
	},
	{
		name: 'Ethan Anderson',
		timeZone: 'US (PST)',
		signUpDate: '1/11/2011',
		source: 'webApp',
		investmentDate: '2/1/2021',
		investmentTime: '13:00',
		refundRequestDate: '2/2/2021',
		refoundRequestTime: '16:00',
	},
	{
		name: 'Sophia Wilson',
		timeZone: 'US (PST)',
		signUpDate: '2/1/2020',
		source: 'phone',
		investmentDate: '2/1/2021',
		investmentTime: '22:00',
		refundRequestDate: '2/2/2021',
		refoundRequestTime: '05:00',
	},
	{
		name: 'Liam Martinez',
		timeZone: 'Europe (GMT)',
		signUpDate: '1/1/2020',
		source: 'webApp',
		investmentDate: '1/1/2021',
		investmentTime: '11:00',
		refundRequestDate: '11/1/2021',
		refoundRequestTime: '12:00',
	},
	{
		name: 'Jonathan Giles',
		timeZone: 'Europe (CET)',
		signUpDate: '1/1/2020',
		source: 'phone',
		investmentDate: '1/1/2021',
		investmentTime: '11:00',
		refundRequestDate: '12/1/2021',
		refoundRequestTime: '12:00',
	},
	{
		name: 'Priya Sharp',
		timeZone: 'Europe (CET)',
		signUpDate: '10/10/2020',
		source: 'phone',
		investmentDate: '5/5/2021',
		investmentTime: '00:30',
		refundRequestDate: '5/5/2021',
		refoundRequestTime: '21:00',
	},
	{
		name: 'Raja Ortiz',
		timeZone: 'US (EST)',
		signUpDate: '10/10/2021',
		source: 'phone',
		investmentDate: '01/15/2022',
		investmentTime: '21:30',
		refundRequestDate: '01/16/2022',
		refoundRequestTime: '07:00',
	},
	{
		name: 'Livia Burns',
		timeZone: 'US (PST)',
		signUpDate: '10/10/2021',
		source: 'phone',
		investmentDate: '01/15/2022',
		investmentTime: '21:30',
		refundRequestDate: '01/16/2022',
		refoundRequestTime: '19:00',
	},
	{
		name: 'Lacey Gates',
		timeZone: 'Europe (CET)',
		signUpDate: '10/10/2021',
		source: 'webApp',
		investmentDate: '15/01/2022',
		investmentTime: '23:36',
		refundRequestDate: '16/01/2022',
		refoundRequestTime: '13:12',
	},
];
