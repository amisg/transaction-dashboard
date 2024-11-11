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
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch transactions");
					}
					return response.json();
				})
				.then((data) => {
					setTransactions(data.transactions);
				})
				.catch((error) => {
					console.error("Error fetching transactions:", error);
				});
		};

		fetchTransactions();
	}, [month, searchText, page, perPage]);

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
		setPage(1);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
		setPage(1);
	};

	return (
		<div style={{ textAlign: "center", padding: "20px" }}>
			<h1>Transaction Dashboard</h1>

			<div style={{ marginBottom: "20px" }}>
				<input
					type="text"
					placeholder="Search transaction"
					value={searchText}
					onChange={handleSearchChange}
					style={{
						padding: "10px",
						borderRadius: "5px",
						marginRight: "10px",
						fontSize: "16px",
					}}
				/>

				<select
					value={month}
					onChange={handleMonthChange}
					style={{
						padding: "10px",
						borderRadius: "5px",
						fontSize: "16px",
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
					marginBottom: "20px",
					borderCollapse: "collapse",
				}}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Category</th>
						<th>Sold</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					{transactions.length > 0 ? (
						transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.id}</td>
								<td>{transaction.title}</td>
								<td>{transaction.description}</td>
								<td>{transaction.price}</td>
								<td>{transaction.category}</td>
								<td>{transaction.sold ? "Yes" : "No"}</td>
								<td>
									<img
										src={transaction.image}
										alt={transaction.title}
										width="50"
									/>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7">No transactions found</td>
						</tr>
					)}
				</tbody>
			</table>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					style={{
						padding: "10px 20px",
						fontSize: "16px",
						cursor: page === 1 ? "not-allowed" : "pointer",
					}}>
					Previous
				</button>
				<span>Page No: {page}</span>
				<button
					onClick={() => setPage(page + 1)}
					style={{
						padding: "10px 20px",
						fontSize: "16px",
					}}>
					Next
				</button>
				<span>Per Page: {perPage}</span>
			</div>
		</div>
	);
}

export default TransactionDashboard;
