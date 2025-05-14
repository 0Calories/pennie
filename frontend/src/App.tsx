import Dashboard from './components/Dashboard';
import './App.css';

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-4">
					<h1 className="text-3xl font-bold text-gray-900">Pennie</h1>
				</div>
			</header>
			<main>
				<Dashboard />
			</main>
		</div>
	);
}

export default App;
