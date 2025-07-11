import { styled, TableCell, TableRow } from '@mui/material';
import type { Trade } from '../../data/trades.data';
import useCanBeRefunded from '../../hooks/useCanBeRefunded';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

interface TradeDetailLineProps {
	tradeData: Trade;
}

function TradeDetailLine({ tradeData }: TradeDetailLineProps) {

	const canBeRefunded = useCanBeRefunded({tradeData});

	return (
		<StyledTableRow>
			{Object.entries(tradeData).map(([key, value]) => (
				<TableCell key={key}>{value}</TableCell>
			))}
			<TableCell>{canBeRefunded ? 'approved' : 'denied'}</TableCell>
		</StyledTableRow>
	);
}

export default TradeDetailLine;
