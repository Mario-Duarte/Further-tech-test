import {
	Paper,
	styled,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TradeDetailLine from './components/tradeDetailLine/tradeDetailLine';
import { TradesData } from './data/trades.data';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function App() {
	const tradesData = TradesData;

	return (
		<main>
			<h1>Trades data</h1>

			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 680 }}
					aria-label="Further tech test"
				>
					<TableHead>
						<TableRow>
							{Object.keys(tradesData[0] || {}).map((key) => (
								<StyledTableCell key={key}>
									{
										key
											.replace(/([A-Z])/g, ' $1') // Transforms camelcase string into something more readable by adding a space before capital letters
											.replace(/^./, (str) =>
												str.toUpperCase()
											) // Capitalize first letter
									}
								</StyledTableCell>
							))}
							<StyledTableCell>Refund Status</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{tradesData.map((trade, idx: number) => (
							<TradeDetailLine
								key={idx}
								tradeData={trade}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</main>
	);
}

export default App;
