import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Tours } from './pages/Tours';
import { TourDetail } from './pages/TourDetail';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';
import { FloatingButtons } from './components/common/FloatingButtons';
import { Rules } from './pages/Rules';
import { MyBookings } from './pages/MyBookings';
export function App() {
  return <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </BrowserRouter>
    </LanguageProvider>;
}