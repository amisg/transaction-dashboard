import React, { useEffect, useState } from "react";

function TransactionDashboard() {
	const [transactions, setTransactions] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [month, setMonth] = useState("March");
	const [page, setPage] = useState(1);
	const perPage = 10;

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		const fetchTransactions = () => {
			const url = `http://localhost:8084/api/products/transactions?month=${month}&search=${searchText}&page=${page}&perPage=${perPage}`;

			fetch(url, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => {
					if (!response.ok) throw new Error("Failed to fetch transactions");
					return response.json();
				})
				.then((data) => setTransactions(data.transactions))
				.catch((error) => console.error("Error fetching transactions:", error));
		};

		fetchTransactions();
	}, [month, searchText, page]);

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
		setPage(1);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
		setPage(1);
	};

	return (
		<div
			style={{
				textAlign: "center",
				padding: "40px",
				backgroundColor: "#F2FAFB",
			}}>
			<h2
				style={{
					fontSize: "1.5rem",
					color: "#333",
					border: "3px solid #333",
					borderRadius: "50%",
					width: "180px",
					height: "180px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "0 auto",
					backgroundColor: "#fff",
				}}>
				Transaction Dashboard
			</h2>

			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginBottom: "20px",
					margin: "20px",
				}}>
				<input
					type="text"
					placeholder="Search transaction"
					value={searchText}
					onChange={handleSearchChange}
					style={{
						padding: "10px 20px",
						borderRadius: "8px",
						border: "1px solid #CCC",
						marginRight: "15px",
						fontSize: "16px",
					}}
				/>

				<select
					value={month}
					onChange={handleMonthChange}
					style={{
						padding: "10px 20px",
						borderRadius: "8px",
						border: "1px solid #CCC",
						fontSize: "16px",
						backgroundColor: "#F9DF85",
						color: "#333",
					}}>
					{months.map((m) => (
						<option key={m} value={m}>
							{m}
						</option>
					))}
				</select>
			</div>

			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					backgroundColor: "#F9DF85",
					borderRadius: "8px",
					overflow: "hidden",
					marginBottom: "20px",
				}}>
				<thead>
					<tr>
						<th style={headerCellStyle}>ID</th>
						<th style={headerCellStyle}>Title</th>
						<th style={headerCellStyle}>Description</th>
						<th style={headerCellStyle}>Price</th>
						<th style={headerCellStyle}>Category</th>
						<th style={headerCellStyle}>Sold</th>
						<th style={headerCellStyle}>Image</th>
					</tr>
				</thead>
				<tbody>
					{transactions.length > 0 ? (
						transactions.map((transaction) => (
							<tr key={transaction.id} style={rowStyle}>
								<td style={cellStyle}>{transaction.id}</td>
								<td style={cellStyle}>{transaction.title}</td>
								<td style={cellStyle}>{transaction.description}</td>
								<td style={cellStyle}>${transaction.price}</td>
								<td style={cellStyle}>{transaction.category}</td>
								<td style={cellStyle}>{transaction.sold ? "Yes" : "No"}</td>
								<td style={cellStyle}>
									<img
										src={transaction.image}
										alt={transaction.title}
										width="50"
										style={{ borderRadius: "5px" }}
									/>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" style={cellStyle}>
								No transactions found
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "80%",
					margin: "0 auto",
					fontSize: "16px",
				}}>
				<span style={{ fontSize: "16px" }}>Page No: {page}</span>

				<div style={{ display: "flex", alignItems: "center" }}>
					<button
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
						style={{
							padding: "10px 20px",
							margin: "0 10px",
							fontSize: "16px",
							cursor: page === 1 ? "not-allowed" : "pointer",
							backgroundColor: "#F9DF85",
							border: "none",
							borderRadius: "5px",
						}}>
						Previous
					</button>

					<button
						onClick={() => setPage(page + 1)}
						style={{
							padding: "10px 20px",
							margin: "0 10px",
							fontSize: "16px",
							backgroundColor: "#F9DF85",
							border: "none",
							borderRadius: "5px",
						}}>
						Next
					</button>
				</div>

				<span style={{ fontSize: "16px" }}>Per Page: {perPage}</span>
			</div>
		</div>
	);
}

const headerCellStyle = {
	padding: "15px",
	fontSize: "16px",
	fontWeight: "bold",
	color: "#333",
	borderBottom: "2px solid #EEE",
};

const cellStyle = {
	padding: "15px",
	textAlign: "center",
	borderBottom: "1px solid #EEE",
	color: "#333",
};

const rowStyle = {
	backgroundColor: "#FFF5C4",
};

export default TransactionDashboard;
