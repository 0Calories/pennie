import { useTranslation } from 'react-i18next';
import Button from './Button';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('welcome')}</h1>
          <div className="space-x-2">
            <Button 
              onClick={() => changeLanguage('en')}
              variant="primary"
            >
              English
            </Button>
            <Button 
              onClick={() => changeLanguage('es')}
              variant="primary"
            >
              Español
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 