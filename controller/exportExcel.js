const xlsx = require('xlsx');
const createApiResponse = require('../helper/createApiResponse');

// const data = [
// 	{ name: 'John Doe', age: 30, email: 'john.doe@example.com' },
// 	{ name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
// 	{ name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com' },
// ];

exports.createExcelFile = async (req, res) => {
	const excelType = req.params.id;
	let data = req.body;

	switch (excelType) {
		case 'expenseCategory':
			data = data.map((val, index) => { return { index: index + 1, Name: val.name, ['Total Expense']: val.totalExpense } });
			break;
		case 'expense':
			data = getExpenses();
			break;
		case 'incomeCategory':
			data = getIncomeCategories();
			break;
		case 'income':
			data = getIncomes();
			break;
		default:
			return res.status(400).json({ error: 'Invalid data type' });
	}

	console.log(data)

	// Convert the data to a worksheet
	const worksheet = xlsx.utils.json_to_sheet(data);
	const workbook = xlsx.utils.book_new();
	xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

	// Generate the Excel file
	const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

	// Set the response headers for file download
	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

	console.log(excelBuffer)

	// Send the Excel file to the client
	// res.send(excelBuffer);
	res.status(200).json(createApiResponse(true, excelBuffer, "", 200));
}
