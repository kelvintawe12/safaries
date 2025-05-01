
import React, { useState, useEffect, createContext, useContext, startTransition } from 'react';
import { GlobeIcon } from 'lucide-react';
import { Button } from '../components/common/Button';

type Language = 'en' | 'fr' | 'rw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Existing translations
    'home.hero.title': 'Discover the Beauty of Kivu',
    'home.hero.subtitle': "Experience unforgettable adventures in Africa's most breathtaking landscapes",
    'common.book_now': 'Book Now',
    'tourCard.featured': 'Featured',
    'tourCard.nextDate': 'Next Date',
    'tourCard.reviews': 'reviews',
    'tourCard.viewDetails': 'View Details',
    'tourCard.bookNow': 'Book Now',
    'tourCard.noDates': 'No dates available',
    'booking.title': 'Book Your Safari',
    'booking.selectTour': 'Select Tour',
    'booking.selectTourPlaceholder': 'Select a tour',
    'booking.participants': 'Number of Participants',
    'booking.tourDate': 'Tour Date',
    'booking.selectDatePlaceholder': 'Select a date',
    'booking.paymentMethod': 'Payment Method',
    'booking.selectPaymentMethod': 'Select payment method',
    'booking.creditCard': 'Credit Card',
    'booking.bankTransfer': 'Bank Transfer',
    'booking.cash': 'Cash on Arrival',
    'booking.promocode': 'Promocode',
    'booking.promocodePlaceholder': 'Enter promocode',
    'booking.invalidPromocode': 'Invalid promocode',
    'booking.validPromocode': 'Promocode applied (10% off)',
    'booking.specialRequests': 'Special Requests',
    'booking.specialRequestsPlaceholder': 'Any special requirements or requests...',
    'booking.priceSummary': 'Price Summary',
    'booking.tourPrice': 'Tour Price',
    'booking.discount': 'Discount',
    'booking.tax': 'Tax',
    'booking.total': 'Total',
    'booking.depositRequired': '50% deposit required',
    'booking.depositConfirmation': 'I confirm that I will pay the 50% deposit ({amount}) to secure my booking',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.processing': 'Processing...',
    'booking.success': 'Booking confirmed successfully!',
    'booking.error': 'Failed to confirm booking. Please try again.',
    'booking.location': 'Location',
    'booking.duration': 'Duration',
    'booking.reviews': 'reviews',
    'language.changed': 'Language changed to {language}',
    'language.switcher': 'Change Language',
    // New footer translations
    'footer.logoAlt': 'Kivu Safaris Logo',
    'footer.tagline': 'Explore. Experience. Connect.',
    'footer.quickLinks': 'Quick Links',
    'footer.links.home': 'Home',
    'footer.links.about': 'About Us',
    'footer.links.tours': 'Tours',
    'footer.links.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.legalLinks.privacy': 'Privacy Policy',
    'footer.legalLinks.faq': 'FAQ',
    'footer.legalLinks.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.address': '123 Main Street, Goma, North Kivu, DRC',
    'footer.phone': 'Call us at +243 123 456 789',
    'footer.email': 'Email us at info@kivusafaris.com',
    'footer.social': 'Follow us on {platform}',
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.description': 'Subscribe to our newsletter for exclusive offers and updates.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.submit': 'Subscribe',
    'footer.newsletter.submitting': 'Subscribing...',
    'footer.newsletter.success': 'Subscribed successfully!',
    'footer.newsletter.error': 'Failed to subscribe. Please try again.',
    'footer.copyright': '© {year} Kivu Safaris. All rights reserved. Officially registered with tourism authorities in the Democratic Republic of Congo.',
  },
  fr: {
    // Existing translations
    'home.hero.title': 'Découvrez la Beauté du Kivu',
    'home.hero.subtitle': "Vivez des aventures inoubliables dans les paysages les plus époustouflants d'Afrique",
    'common.book_now': 'Réserver',
    'tourCard.featured': 'En vedette',
    'tourCard.nextDate': 'Prochaine Date',
    'tourCard.reviews': 'avis',
    'tourCard.viewDetails': 'Voir les Détails',
    'tourCard.bookNow': 'Réserver Maintenant',
    'tourCard.noDates': 'Aucune date disponible',
    'booking.title': 'Réservez Votre Safari',
    'booking.selectTour': 'Choisir le Tour',
    'booking.selectTourPlaceholder': 'Choisissez un tour',
    'booking.participants': 'Nombre de Participants',
    'booking.tourDate': 'Date du Tour',
    'booking.selectDatePlaceholder': 'Choisissez une date',
    'booking.paymentMethod': 'Méthode de Paiement',
    'booking.selectPaymentMethod': 'Choisissez une méthode de paiement',
    'booking.creditCard': 'Carte de Crédit',
    'booking.bankTransfer': 'Virement Bancaire',
    'booking.cash': 'Paiement à l’arrivée',
    'booking.promocode': 'Code Promo',
    'booking.promocodePlaceholder': 'Entrez le code promo',
    'booking.invalidPromocode': 'Code promo invalide',
    'booking.validPromocode': 'Code promo appliqué (10% de réduction)',
    'booking.specialRequests': 'Demandes Spéciales',
    'booking.specialRequestsPlaceholder': 'Toute exigence ou demande spéciale...',
    'booking.priceSummary': 'Résumé des Prix',
    'booking.tourPrice': 'Prix du Tour',
    'booking.discount': 'Réduction',
    'booking.tax': 'Taxe',
    'booking.total': 'Total',
    'booking.depositRequired': 'Acompte de 50% requis',
    'booking.depositConfirmation': 'Je confirme que je paierai l’acompte de 50% ({amount}) pour sécuriser ma réservation',
    'booking.confirmBooking': 'Confirmer la Réservation',
    'booking.processing': 'Traitement...',
    'booking.success': 'Réservation confirmée avec succès !',
    'booking.error': 'Échec de la confirmation de la réservation. Veuillez réessayer.',
    'booking.location': 'Emplacement',
    'booking.duration': 'Durée',
    'booking.reviews': 'avis',
    'language.changed': 'Langue changée en {language}',
    'language.switcher': 'Changer de Langue',
    // New footer translations
    'footer.logoAlt': 'Logo de Kivu Safaris',
    'footer.tagline': 'Explorer. Vivre. Connecter.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.links.home': 'Accueil',
    'footer.links.about': 'À Propos',
    'footer.links.tours': 'Tours',
    'footer.links.contact': 'Contact',
    'footer.legal': 'Légal',
    'footer.legalLinks.privacy': 'Politique de Confidentialité',
    'footer.legalLinks.faq': 'FAQ',
    'footer.legalLinks.terms': 'Conditions de Service',
    'footer.contact': 'Nous Contacter',
    'footer.address': '123 Rue Principale, Goma, Nord-Kivu, RDC',
    'footer.phone': 'Appelez-nous au +243 123 456 789',
    'footer.email': 'Envoyez-nous un email à info@kivusafaris.com',
    'footer.social': 'Suivez-nous sur {platform}',
    'footer.newsletter.title': 'Restez Informé',
    'footer.newsletter.description': 'Abonnez-vous à notre newsletter pour des offres exclusives et des mises à jour.',
    'footer.newsletter.placeholder': 'Entrez votre email',
    'footer.newsletter.submit': 'S’abonner',
    'footer.newsletter.submitting': 'Abonnement en cours...',
    'footer.newsletter.success': 'Abonnement réussi !',
    'footer.newsletter.error': 'Échec de l’abonnement. Veuillez réessayer.',
    'footer.copyright': '© {year} Kivu Safaris. Tous droits réservés. Enregistré officiellement auprès des autorités touristiques de la République Démocratique du Congo.',
  },
  rw: {
    // Existing translations
    'home.hero.title': 'Tangira Ubwiza bwa Kivu',
    'home.hero.subtitle': 'Bona uburambe butazibagirana mu maso meza ya Afrika',
    'common.book_now': 'Kwandikisha',
    'tourCard.featured': 'Byagaragajwe',
    'tourCard.nextDate': 'Itariki Ikurikira',
    'tourCard.reviews': 'ibitekerezo',
    'tourCard.viewDetails': 'Reba Amakuru',
    'tourCard.bookNow': 'Funga Ubukene',
    'tourCard.noDates': 'Nta tariki iriho',
    'booking.title': 'Shyiraho Safari Yawe',
    'booking.selectTour': 'Hitamo Urugendo',
    'booking.selectTourPlaceholder': 'Hitamo urugendo',
    'booking.participants': 'Umubare w’Abatumi',
    'booking.tourDate': 'Itariki y’Urugendo',
    'booking.selectDatePlaceholder': 'Hitamo itariki',
    'booking.paymentMethod': 'Uburyo bwo Kwishyura',
    'booking.selectPaymentMethod': 'Hitamo uburyo bwo kwishyura',
    'booking.creditCard': 'Ikarita y’Inguzanyo',
    'booking.bankTransfer': 'Kohereza Amafaranga kuri Banki',
    'booking.cash': 'Amafaranga y’Intoki ku Gera',
    'booking.promocode': 'Kode yo kugabanya',
    'booking.promocodePlaceholder': 'Injiza kode yo kugabanya',
    'booking.invalidPromocode': 'Kode yo kugabanya ntiyemewe',
    'booking.validPromocode': 'Kode yo kugabanya yemerewe (10% yagabanyijwe)',
    'booking.specialRequests': 'Ibyifuzo by’Ikirenga',
    'booking.specialRequestsPlaceholder': 'Icyifuzo cyose cyangwa icyo usaba by’umwihariko...',
    'booking.priceSummary': 'Incamake y’Igiciro',
    'booking.tourPrice': 'Igiciro cy’Urugendo',
    'booking.discount': 'Kugabalinksnywa',
    'booking.tax': 'Umusoro',
    'booking.total': 'Igiteranyo',
    'booking.depositRequired': '50% yo kwishyura mbere irasabwa',
    'booking.depositConfirmation': 'Ndemeza ko nzishyura 50% yo kwishyura mbere ({amount}) kugira ngo nshobore gufunga ubukene bwanjye',
    'booking.confirmBooking': 'Emeza Ubukene',
    'booking.processing': 'Birimo gukorwa...',
    'booking.success': 'Ubukene bwemejwe neza!',
    'booking.error': 'Byanze kugenzura ubukene. Ongera ugerageze.',
    'booking.location': 'Aho biba',
    'booking.duration': 'Igihe',
    'booking.reviews': 'ibitekerezo',
    'language.changed': 'Ururimi rwahinduwe rube {language}',
    'language.switcher': 'Hindura Ururimi',
    // New footer translations
    'footer.logoAlt': 'Ikirango cya Kivu Safaris',
    'footer.tagline': 'Shaka. Menya. Huza.',
    'footer.quickLinks': 'Amahuza Yihuse',
    'footer.links.home': 'Ahabanza',
    'footer.links.about': 'Ibyacu',
    'footer.links.tours': 'Urugendo',
    'footer.links.contact': 'Twandikire',
    'footer.legal': 'Byemewe',
    'footer.legalLinks.privacy': 'Politiki y’Ubutekanishi',
    'footer.legalLinks.faq': 'Ibibazo Bikunze Kubazwa',
    'footer.legalLinks.terms': 'Amategeko y’Imikoreshereze',
    'footer.contact': 'Twandikire',
    'footer.address': '123 Umuhanda Mukuru, Goma, Kivu y’Amajyaruguru, RDC',
    'footer.phone': 'Duhamagare kuri +243 123 456 789',
    'footer.email': 'Twandikire kuri info@kivusafaris.com',
    'footer.social': 'Dukurikire kuri {platform}',
    'footer.newsletter.title': 'Komeza Umenye',
    'footer.newsletter.description': 'Iyandikishe kuri newsletter yacu kugirango ubone amahitamo yihariye n’ibimenyetso.',
    'footer.newsletter.placeholder': 'Injiza imeyili yawe',
    'footer.newsletter.submit': 'Iyandikishe',
    'footer.newsletter.submitting': 'Birimo kwiyandikisha...',
    'footer.newsletter.success': 'Wiyandikishije neza!',
    'footer.newsletter.error': 'Kwiyandikisha byanze. Ongera ugerageze.',
    'footer.copyright': '© {year} Kivu Safaris. Ubushobozi bwose burabitswe. Byanditswe byemewe n’ubuyobozi bw’ubukerarugendo muri Repubulika Iharanira Demokarasi ya Kongo.',
  },
};

// Toast Notification Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl animate-slide-up flex items-center max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      role="alert"
      aria-live="polite"
    >
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

// Language Switcher Component
const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'rw', label: 'Kinyarwanda' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        aria-label={t('language.switcher')}
        aria-expanded={isOpen}
      >
        <GlobeIcon className="h-5 w-5" />
        <span>{languages.find((lang) => lang.code === language)?.label}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl animate-slide-up z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-teal-100 transition-colors ${
                lang.code === language ? 'bg-teal-50 font-semibold' : ''
              }`}
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);

  // Persist language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {
      console.warn('Failed to save language to localStorage');
    }
  }, [language]);

  // Wrap setLanguage in startTransition
  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
      setToast({
        show: true,
        message: t('language.changed', { language: lang.toUpperCase() }),
        type: 'success',
      });
    });
  };

  // Translation function with parameter support
  const t = (key: string, params: Record<string, string> = {}): string => {
    let translation = translations[language]?.[key] || translations.en[key] || key;
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{${param}}`, value);
    });
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="fixed top-4 right-4 z-50 animate-slide-up">
        <LanguageSwitcher />
      </div>
      {children}
      {toast?.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};