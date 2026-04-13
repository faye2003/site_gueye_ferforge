import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Realization } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, MessageCircle } from 'lucide-react';

export default function RealizationDetail() {
  const { id } = useParams();
  const [realization, setRealization] = useState<Realization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealization = async () => {
      if (!id) return;
      const docRef = doc(db, 'realizations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRealization({ id: docSnap.id, ...docSnap.data() } as Realization);
      }
      setLoading(false);
    };
    fetchRealization();
  }, [id]);

  if (loading) return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!realization) return <div className="pt-24 min-h-screen flex items-center justify-center">Réalisation non trouvée</div>;

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/realisations" className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} />
          Retour aux réalisations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img
                src={realization.images[0]}
                alt={realization.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {realization.images.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-md">
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <span className="px-4 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
                {realization.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {realization.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-orange-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Localisation</p>
                  <p className="font-bold text-gray-900">{realization.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-orange-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Date</p>
                  <p className="font-bold text-gray-900">{realization.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">À propos du projet</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {realization.description}
              </p>
            </div>

            <div className="pt-8">
              <a
                href="https://wa.me/221772515690"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-green-500/20"
              >
                <MessageCircle size={24} />
                Demander un devis similaire
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
