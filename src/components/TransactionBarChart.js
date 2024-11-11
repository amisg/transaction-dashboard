import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const TransactionBarChart = () => {
	const [month, setMonth] = useState("june"); // Default month
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:8084/api/products/barChart?month=${month}`
				);
				if (!response.ok) throw new Error("Failed to fetch data");

				const data = await response.json();

				if (data) {
					const labels = [
						"0-100",
						"101-200",
						"201-300",
						"301-400",
						"401-500",
						"501-600",
						"601-700",
						"701-800",
						"801-900",
						"901-above",
					];

					const counts = labels.map((label) => {
						const foundItem = data.find((item) => item.priceRange === label);
						return foundItem ? foundItem.count : 0;
					});

					const barData = {
						labels: labels,
						datasets: [
							{
								label: `Bar Chart Stats - ${
									month.charAt(0).toUpperCase() + month.slice(1)
								}`,
								data: counts,
								backgroundColor: "rgba(72, 207, 251, 0.8)",
							},
						],
					};
					setChartData(barData);
				} else {
					console.error("API data is undefined or in an unexpected format.");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [month]);

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};

	return (
		<div>
			<h2>Transactions Bar Chart</h2>

			<label htmlFor="month"></label>
			<select id="month" value={month} onChange={handleMonthChange}>
				<option value="january">January</option>
				<option value="february">February</option>
				<option value="march">March</option>
				<option value="april">April</option>
				<option value="may">May</option>
				<option value="june">June</option>
				<option value="july">July</option>
				<option value="august">August</option>
				<option value="september">September</option>
				<option value="october">October</option>
				<option value="november">November</option>
				<option value="december">December</option>
			</select>

			{chartData ? (
				<Bar
					data={chartData}
					options={{
						responsive: true,
						plugins: {
							title: {
								display: true,
								text: `Bar Chart Stats - ${
									month.charAt(0).toUpperCase() + month.slice(1)
								}`,
								font: {
									size: 20,
									weight: "bold",
								},
							},
							legend: {
								display: false,
							},
						},
						scales: {
							x: {
								ticks: {
									font: {
										size: 14,
									},
									color: "#666",
									maxRotation: 45,
									minRotation: 45,
								},
								grid: {
									display: false,
								},
							},
							y: {
								beginAtZero: true,
								max: 8, // Adjust as needed
								ticks: {
									font: {
										size: 14,
									},
									color: "#666",
								},
								grid: {
									color: "#e0e0e0",
									lineWidth: 0.5,
								},
							},
						},
					}}
				/>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};

export default TransactionBarChart;
