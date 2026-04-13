import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Realization } from '../../types';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'Portails',
  'Escaliers',
  'Fenêtres',
  'Grilles',
  'Balcons',
  'Aluminium',
  'Inox',
  'Structures'
];

export default function AdminRealizations() {
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRealization, setEditingRealization] = useState<Realization | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  useEffect(() => {
    const q = query(collection(db, 'realizations'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRealizations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Realization)));
    });
    return () => unsubscribe();
  }, []);

  const openModal = (realization?: Realization) => {
    if (realization) {
      setEditingRealization(realization);
      setValue('title', realization.title);
      setValue('category', realization.category);
      setValue('description', realization.description);
      setValue('location', realization.location);
      setValue('date', realization.date);
      setValue('status', realization.status);
      setPreviewImages(realization.images);
    } else {
      setEditingRealization(null);
      reset({
        title: '',
        category: 'Portails',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        status: 'active'
      });
      setPreviewImages([]);
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `realizations/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        newUrls.push(url);
      }
      setPreviewImages(prev => [...prev, ...newUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Erreur lors de l\'upload des images.');
    } finally {
      setUploading(false);
    }
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (previewImages.length === 0) {
      alert('Veuillez ajouter au moins une image.');
      return;
    }

    const payload = {
      ...data,
      images: previewImages
    };

    try {
      if (editingRealization) {
        await updateDoc(doc(db, 'realizations', editingRealization.id), payload);
      } else {
        await addDoc(collection(db, 'realizations'), payload);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving realization:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
      await deleteDoc(doc(db, 'realizations', id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestion des Réalisations</h1>
          <p className="text-gray-500 font-medium">Publiez vos derniers travaux.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-600/20"
        >
          <Plus size={20} />
          Nouvelle Réalisation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {realizations.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
            <div className="aspect-video relative">
              <img src={item.images[0]} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white text-red-600 rounded-lg shadow-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.location} • {item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingRealization ? 'Modifier la réalisation' : 'Nouvelle réalisation'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Titre</label>
                    <input {...register('title', { required: true })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Catégorie</label>
                    <select {...register('category')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea rows={3} {...register('description')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 resize-none" />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Images du projet</label>
                  <div className="grid grid-cols-3 gap-4">
                    {previewImages.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removePreviewImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                      {uploading ? (
                        <Loader2 className="animate-spin text-orange-600" size={24} />
                      ) : (
                        <>
                          <Upload className="text-gray-400" size={24} />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uploader</span>
                        </>
                      )}
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Localisation</label>
                    <input {...register('location')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500" placeholder="Dakar, Sénégal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</label>
                    <input type="date" {...register('date')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Statut</label>
                  <select {...register('status')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500">
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95">
                  <Save size={20} />
                  Enregistrer
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
