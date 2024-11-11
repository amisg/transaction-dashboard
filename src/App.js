import "./App.css";
import TransactionBarChart from "./components/TransactionBarChart";
import TransactionDashboard from "./components/TransactionDashboard";
import TransactionStatistics from "./components/TransactionStatistics";

function App() {
	return (
		<>
			<TransactionDashboard />
			<TransactionStatistics />
			<TransactionBarChart />
		</>
	);
}

export default App;
