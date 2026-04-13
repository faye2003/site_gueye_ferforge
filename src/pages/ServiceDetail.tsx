import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      const docRef = doc(db, 'services', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setService({ id: docSnap.id, ...docSnap.data() } as Service);
      }
      setLoading(false);
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!service) return <div className="pt-24 min-h-screen flex items-center justify-center">Service non trouvé</div>;

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <Link to="/services" className="inline-flex items-center gap-2 text-orange-500 font-bold mb-6 hover:gap-3 transition-all">
            <ArrowLeft size={20} />
            Retour aux services
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            {service.title}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Description du service</h2>
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {service.fullDescription || service.description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos prestations incluses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.prestations.map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <CheckCircle2 className="text-orange-500 shrink-0" size={24} />
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {service.gallery && service.gallery.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Galerie du service</h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="rounded-2xl w-full h-64 object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Besoin de ce service ?</h3>
              <p className="text-gray-400 mb-8">
                Contactez-nous pour obtenir un devis personnalisé et gratuit pour votre projet.
              </p>
              <div className="space-y-4">
                <a
                  href="https://wa.me/221772515690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 py-4 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95"
                >
                  Formulaire de contact
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Appelez-nous</p>
                  <p className="font-bold">+221 77 251 56 90</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
