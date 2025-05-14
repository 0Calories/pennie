import Dashboard from './components/Dashboard';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl font-bold text-gray-900">{t('welcome')}</h1>
						<div className="space-x-2">
							<button
								onClick={() => changeLanguage('en')}
								className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
							>
								English
							</button>
							<button
								onClick={() => changeLanguage('es')}
								className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
							>
								Español
							</button>
						</div>
					</div>
				</div>
			</header>
			<main>
				<Dashboard />
			</main>
		</div>
	);
}

export default App;
