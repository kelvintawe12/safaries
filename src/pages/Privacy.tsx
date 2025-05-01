import { useState } from 'react';
import { privacySections } from '../data/privacy';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const LanguageButton = ({
  lang,
  currentLang,
  onClick,
  label,
}: {
  lang: 'en' | 'fr' | 'rw';
  currentLang: 'en' | 'fr' | 'rw';
  onClick: (lang: 'en' | 'fr' | 'rw') => void;
  label: string;
}) => (
  <button
    className={`px-3 py-1 rounded-md ${
      currentLang === lang ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'
    }`}
    onClick={() => onClick(lang)}
    aria-label={`Switch to ${label}`}
  >
    {label}
  </button>
);

export const Privacy = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'rw'>('en');

  const toggleSection = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const contactInfo = {
    en: {
      title: 'Contact Us',
      description: 'If you have any questions about this Privacy Policy, please contact us:',
      email: 'By email: privacy@kivusafaris.com',
      phone: 'By phone: +243 123 456 789',
      address: 'By mail: 123 Main Street, Goma, North Kivu, DRC',
    },
    fr: {
      title: 'Contactez-nous',
      description: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :',
      email: 'Par email : privacy@kivusafaris.com',
      phone: 'Par téléphone : +243 123 456 789',
      address: 'Par courrier : 123 Main Street, Goma, North Kivu, RDC',
    },
    rw: {
      title: 'Twandikire',
      description: 'Niba ufite ibibazo bijyanye n\'iyi politiki y\'ibanga, nyamuneka twandikire:',
      email: 'Email: privacy@kivusafaris.com',
      phone: 'Telefoni: +243 123 456 789',
      address: 'Aderesi: 123 Main Street, Goma, North Kivu, RDC',
    },
  };

  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="max-w-2xl mx-auto text-lg">
            How we protect your personal information and respect your privacy
          </p>
        </div>
      </section>

      {/* Language Selector */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-end space-x-2">
            <LanguageButton lang="en" currentLang={language} onClick={setLanguage} label="English" />
            <LanguageButton lang="fr" currentLang={language} onClick={setLanguage} label="Français" />
            <LanguageButton lang="rw" currentLang={language} onClick={setLanguage} label="Kinyarwanda" />
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg mb-8">
              <p className="text-gray-600">
                Last updated:{' '}
                {new Date().toLocaleDateString(
                  language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'rw-RW'
                )}
              </p>
            </div>
            <div className="space-y-6">
              {privacySections && privacySections.length > 0 ? (
                privacySections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={activeId === section.id}
                      aria-controls={`section-content-${section.id}`}
                    >
                      <span className="font-medium text-xl">{section.title[language]}</span>
                      {activeId === section.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {activeId === section.id && (
                      <div
                        id={`section-content-${section.id}`}
                        className="p-4 bg-gray-50 border-t border-gray-200"
                      >
                        <div className="prose prose-gray">{section.content[language]}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No privacy policy sections available at the moment.</p>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{contactInfo[language].title}</h2>
              <p className="text-gray-700 mb-4">{contactInfo[language].description}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{contactInfo[language].email}</li>
                <li>{contactInfo[language].phone}</li>
                <li>{contactInfo[language].address}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};