import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Message } from '../../types';
import { Trash2, Phone, MessageSquare, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer ce message ?')) {
      await deleteDoc(doc(db, 'messages', id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Messages reçus</h1>
        <p className="text-gray-500 font-medium">Gérez vos demandes de contact.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {messages.length > 0 ? messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-grow space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <User size={18} className="text-orange-500" />
                      {msg.name}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Phone size={18} className="text-orange-500" />
                      {msg.phone}
                    </div>
                    {msg.service && (
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {msg.service}
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed italic">
                    "{msg.message}"
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Clock size={14} />
                    Reçu le {msg.createdAt?.toDate().toLocaleString()}
                  </div>
                </div>
                <div className="flex md:flex-col gap-2">
                  <a
                    href={`https://wa.me/${msg.phone.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow md:flex-none bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare size={18} />
                    Répondre
                  </a>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-200" />
              <p className="text-gray-400 font-medium">Aucun message reçu pour le moment.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
