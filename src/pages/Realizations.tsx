import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Realization } from '../types';

const categories = [
  'Tous',
  'Portails',
  'Escaliers',
  'Fenêtres',
  'Grilles',
  'Balcons',
  'Aluminium',
  'Inox',
  'Structures'
];

export default function Realizations() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'realizations'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Realization));
      setRealizations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredRealizations = activeCategory === 'Tous'
    ? realizations
    : realizations.filter(r => r.category === activeCategory);

  return (
    <div className="pt-24 pb-24">
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Nos <span className="text-orange-500">Réalisations</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos travaux récents et laissez-vous inspirer par notre savoir-faire.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredRealizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredRealizations.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                        <MapPin size={16} />
                        {item.location}
                      </div>
                      <button className="w-full py-3 bg-gray-50 hover:bg-orange-600 hover:text-white text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        Voir les détails
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucune réalisation trouvée dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
