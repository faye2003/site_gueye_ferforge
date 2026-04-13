import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Realizations from './pages/Realizations';
import Contact from './pages/Contact';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminServices from './pages/Admin/Services';
import AdminRealizations from './pages/Admin/Realizations';
import AdminMessages from './pages/Admin/Messages';
import AdminLogin from './pages/Admin/Login';

import ServiceDetail from './pages/ServiceDetail';
import RealizationDetail from './pages/RealizationDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/realisations" element={<Realizations />} />
                    <Route path="/realisations/:id" element={<RealizationDetail />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/services" element={<AdminServices />} />
                  <Route path="/realisations" element={<AdminRealizations />} />
                  <Route path="/messages" element={<AdminMessages />} />
                  <Route path="/settings" element={<div className="p-8">Paramètres en construction</div>} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
