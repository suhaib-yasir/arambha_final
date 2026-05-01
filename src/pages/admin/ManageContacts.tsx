import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { 
  Search, 
  Loader2, 
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ManageContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "inquiries"), orderBy("created_at", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(data);
      setLoading(false);
    }, (err) => {
      console.error("Inquiries listener error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredContacts = contacts.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Website Inquiries</h1>
          <p className="text-on-surface-variant">Review inquiries and messages from the website.</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-gold outline-none transition-all w-64 md:w-80"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
          <p className="text-primary font-bold">Loading messages...</p>
        </div>
      ) : filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <motion.div
              layout
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageSquare className="text-accent-gold/20" size={48} />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary font-bold">
                  {contact.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-primary line-clamp-1">{contact.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={10} />
                    {contact.created_at?.toDate ? contact.created_at.toDate().toLocaleDateString() : 'Just now'}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-1">Subject</span>
                <p className="text-sm font-bold text-primary line-clamp-1">{contact.subject}</p>
              </div>

              <p className="text-sm text-slate-600 line-clamp-2 mb-6">
                {contact.message}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Mail size={14} />
                  </div>
                  <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Read More
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-primary font-bold text-lg">No messages found.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedContact(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-primary p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white text-xl font-bold border border-white/20">
                      {selectedContact.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                      <p className="text-white/60 text-sm">{selectedContact.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Subject</span>
                    <h4 className="text-lg font-bold text-primary">{selectedContact.subject}</h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Message</span>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 leading-relaxed text-sm">
                      {selectedContact.message}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phone</span>
                      <p className="text-sm font-bold text-primary">{selectedContact.phone || 'Not provided'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Date</span>
                      <p className="text-sm font-bold text-primary">
                        {selectedContact.created_at?.toDate ? selectedContact.created_at.toDate().toLocaleDateString() : 'Just now'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
