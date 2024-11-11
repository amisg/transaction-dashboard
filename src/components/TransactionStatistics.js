import React, { useState, useEffect } from "react";

const TransactionStatistics = () => {
	const [selectedMonth, setSelectedMonth] = useState("March");
	const [statistics, setStatistics] = useState(null);
	console.log(statistics, "stats");

	useEffect(() => {
		const fetchStatistics = async () => {
			try {
				const response = await fetch(
					`http://localhost:8084/api/products/statistics?month=${selectedMonth}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch statistics");
				}
				const data = await response.json();
				setStatistics(data);
			} catch (error) {
				console.error("Error fetching statistics:", error);
			}
		};

		fetchStatistics();
	}, [selectedMonth]);

	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	};

	return (
		<div
			style={{
				padding: "20px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<h2>Statistics - {selectedMonth}</h2>

			<select value={selectedMonth} onChange={handleMonthChange}>
				<option value="January">January</option>
				<option value="February">February</option>
				<option value="March">March</option>
				<option value="April">April</option>
				<option value="May">May</option>
				<option value="June">June</option>
				<option value="July">July</option>
				<option value="August">August</option>
				<option value="September">September</option>
				<option value="October">October</option>
				<option value="November">November</option>
				<option value="December">December</option>
			</select>

			{statistics ? (
				<div
					style={{
						marginTop: "20px",
						padding: "20px",
						backgroundColor: "#f9df85",
						borderRadius: "8px",
						maxWidth: "300px",
					}}>
					<p>
						<strong>Total Sale:</strong> {statistics.totalSaleAmount}
					</p>
					<p>
						<strong>Total Sold Items:</strong> {statistics.totalSoldItems}
					</p>
					<p>
						<strong>Total Not Sold Items:</strong>{" "}
						{statistics.totalNotSoldItems}
					</p>
				</div>
			) : (
				<p>Loading statistics...</p>
			)}
		</div>
	);
};

export default TransactionStatistics;
