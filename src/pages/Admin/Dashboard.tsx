import { useState, useEffect } from 'react';
import { collection, query, limit, onSnapshot, orderBy, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Hammer, Image as ImageIcon, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    realizations: 0,
    messages: 0
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    // Stats
    const unsubServices = onSnapshot(collection(db, 'services'), (snap) => {
      setStats(prev => ({ ...prev, services: snap.size }));
    });
    const unsubRealizations = onSnapshot(collection(db, 'realizations'), (snap) => {
      setStats(prev => ({ ...prev, realizations: snap.size }));
    });
    const unsubMessages = onSnapshot(collection(db, 'messages'), (snap) => {
      setStats(prev => ({ ...prev, messages: snap.size }));
    });

    // Recent Messages
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(5));
    const unsubRecent = onSnapshot(q, (snap) => {
      setRecentMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubServices();
      unsubRealizations();
      unsubMessages();
      unsubRecent();
    };
  }, []);

  const cards = [
    { name: 'Services', value: stats.services, icon: <Hammer size={24} />, color: 'bg-blue-500' },
    { name: 'Réalisations', value: stats.realizations, icon: <ImageIcon size={24} />, color: 'bg-orange-500' },
    { name: 'Messages', value: stats.messages, icon: <MessageSquare size={24} />, color: 'bg-green-500' },
  ];

  const seedData = async () => {
    if (!window.confirm('Voulez-vous charger les données initiales ?')) return;
    
    const services = [
      {
        title: 'Menuiserie Métallique',
        description: 'Portails, portes, grilles et structures sur mesure.',
        fullDescription: 'Nous réalisons tous types d’ouvrages en métal pour les maisons, immeubles et entreprises. Nos réalisations sont solides, sécurisées et adaptées aux besoins du client.',
        prestations: ['Portails métalliques', 'Portes métalliques', 'Grilles de protection', 'Balcons', 'Clôtures', 'Structures métalliques'],
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070',
        gallery: [],
        order: 0,
        status: 'active'
      },
      {
        title: 'Menuiserie Aluminium',
        description: 'Fenêtres, vitrines et cloisons modernes et légères.',
        fullDescription: 'Nous fabriquons des installations en aluminium modernes, légères et résistantes à la corrosion.',
        prestations: ['Fenêtres en aluminium', 'Portes en aluminium', 'Vitrines', 'Baies vitrées', 'Vérandas', 'Cloisons aluminium'],
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2069',
        gallery: [],
        order: 1,
        status: 'active'
      },
      {
        title: 'Menuiserie Inox',
        description: 'Rampes, garde-corps et escaliers haut de gamme.',
        fullDescription: 'Nous réalisons des ouvrages en inox pour un design moderne et une grande résistance.',
        prestations: ['Rampes en inox', 'Garde-corps', 'Escaliers en inox', 'Portes en inox', 'Structures décoratives'],
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070',
        gallery: [],
        order: 2,
        status: 'active'
      }
    ];

    const realizations = [
      {
        title: 'Portail Royal en Fer Forgé',
        category: 'Portails',
        description: 'Fabrication artisanale d\'un portail monumental avec motifs floraux et pointes dorées.',
        images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070'],
        location: 'Dakar, Almadies',
        date: '2024-03-15',
        status: 'active'
      },
      {
        title: 'Escalier Hélicoïdal Moderne',
        category: 'Escaliers',
        description: 'Escalier en colimaçon en acier noir mat avec marches en bois massif.',
        images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070'],
        location: 'Plateau, Dakar',
        date: '2024-02-20',
        status: 'active'
      },
      {
        title: 'Garde-corps Inox Brossé',
        category: 'Inox',
        description: 'Installation de garde-corps en inox 316L pour une villa en bord de mer.',
        images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070'],
        location: 'Ngor, Dakar',
        date: '2024-01-10',
        status: 'active'
      },
      {
        title: 'Grilles de Protection Design',
        category: 'Grilles',
        description: 'Grilles de fenêtres modernes alliant sécurité et esthétique.',
        images: ['https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=2070'],
        location: 'Mermoz, Dakar',
        date: '2023-12-05',
        status: 'active'
      },
      {
        title: 'Structure Métallique Entrepôt',
        category: 'Structures',
        description: 'Charpente métallique complète pour un bâtiment industriel de 500m².',
        images: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=2070'],
        location: 'Diamniadio',
        date: '2023-11-25',
        status: 'active'
      }
    ];

    try {
      for (const s of services) await addDoc(collection(db, 'services'), s);
      for (const r of realizations) await addDoc(collection(db, 'realizations'), r);
      alert('Données initiales chargées avec succès !');
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Erreur lors du chargement des données.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
          <p className="text-gray-500 font-medium">Bienvenue dans votre espace d'administration.</p>
        </div>
        <button
          onClick={seedData}
          className="text-xs font-bold text-gray-400 hover:text-orange-600 transition-colors"
        >
          Charger démo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6"
          >
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg', card.color)}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{card.name}</p>
              <p className="text-4xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-orange-500" />
              Derniers messages
            </h2>
            <Link to="/admin/messages" className="text-sm font-bold text-orange-600 hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentMessages.length > 0 ? recentMessages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-gray-900">{msg.name}</p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} />
                    {msg.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{msg.message}</p>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-400 font-medium">
                Aucun message pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] -mr-32 -mt-32" />
          <h2 className="text-2xl font-bold mb-8 relative z-10">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <Link
              to="/admin/services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all group"
            >
              <Hammer className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">Ajouter un service</p>
              <p className="text-xs text-gray-400 mt-1">Mettre à jour vos offres</p>
            </Link>
            <Link
              to="/admin/realisations"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all group"
            >
              <ImageIcon className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-bold">Nouvelle réalisation</p>
              <p className="text-xs text-gray-400 mt-1">Publier vos travaux</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
