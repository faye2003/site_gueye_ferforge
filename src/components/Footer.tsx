import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tight">
                Guèye & Frères
              </span>
              <span className="text-xs uppercase tracking-widest font-medium text-orange-500">
                Fer Forge
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Spécialistes de la menuiserie métallique, aluminium et inox au Sénégal. 
              Qualité, design et solidité pour tous vos projets.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/221772515690" className="hover:text-orange-500 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link></li>
              <li><Link to="/a-propos" className="hover:text-orange-500 transition-colors">À propos</Link></li>
              <li><Link to="/services" className="hover:text-orange-500 transition-colors">Nos Services</Link></li>
              <li><Link to="/realisations" className="hover:text-orange-500 transition-colors">Réalisations</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/menuiserie-metallique" className="hover:text-orange-500 transition-colors">Menuiserie Métallique</Link></li>
              <li><Link to="/services/aluminium" className="hover:text-orange-500 transition-colors">Menuiserie Aluminium</Link></li>
              <li><Link to="/services/inox" className="hover:text-orange-500 transition-colors">Menuiserie Inox</Link></li>
              <li><Link to="/services/soudure" className="hover:text-orange-500 transition-colors">Soudure & Réparation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+221 77 251 56 90</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>contact@gueye-freres.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>Dakar, Sénégal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Guèye et Frères Fer Forge. Tous droits réservés.</p>
          <p>Design par <a href="http://www.mamadou-faye.com" target='_blank'>Lywa Technology</a></p>
        </div>
      </div>
    </footer>
  );
}
