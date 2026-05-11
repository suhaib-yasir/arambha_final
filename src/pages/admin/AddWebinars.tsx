import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calendar, Clock, Link as LinkIcon, Loader2 } from 'lucide-react';
import { addWebinar, getUpcomingWebinars, deleteWebinar, Webinar } from '../../services/webinarService';

export default function AddWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    type: 'zoom' as 'zoom' | 'gmeet',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  });

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      const data = await getUpcomingWebinars();
      setWebinars(data);
    } catch (err) {
      console.error('Failed to fetch webinars:', err);
      setMessage({ type: 'error', text: 'Failed to load webinars' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.link || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    try {
      setLoading(true);
      
      // Convert date and time to Firestore Timestamp
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      if (startDateTime >= endDateTime) {
        setMessage({ type: 'error', text: 'End time must be after start time' });
        return;
      }

      const newWebinar: Webinar = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        type: formData.type,
        startTime: startDateTime,
        endTime: endDateTime
      };

      await addWebinar(newWebinar);
      setMessage({ type: 'success', text: 'Webinar added successfully!' });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        link: '',
        type: 'zoom',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
      });
      setShowForm(false);

      // Refresh webinars list
      await fetchWebinars();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to add webinar:', err);
      setMessage({ type: 'error', text: 'Failed to add webinar' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (webinarId: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;

    try {
      await deleteWebinar(webinarId);
      setMessage({ type: 'success', text: 'Webinar deleted successfully!' });
      await fetchWebinars();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to delete webinar:', err);
      setMessage({ type: 'error', text: 'Failed to delete webinar' });
    }
  };

  const formatDateTime = (date: any) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Manage Webinars</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-accent-gold text-primary font-bold rounded-lg hover:brightness-110 transition-all"
            >
              <Plus size={20} /> Add New Webinar
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Add Webinar Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 p-6 rounded-lg mb-6 border border-slate-200"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Create New Webinar</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Webinar Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Spring Boot Basics"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Meeting Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    >
                      <option value="zoom">Zoom</option>
                      <option value="gmeet">Google Meet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the webinar content..."
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Meeting Link *</label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://zoom.us/... or https://meet.google.com/..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">Start Time *</label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">End Time *</label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:brightness-110 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    {loading ? 'Creating...' : 'Create Webinar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 bg-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Webinars List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h3 className="text-xl font-bold text-primary mb-6">Upcoming Webinars</h3>

            {loading && !showForm ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-accent-gold" size={32} />
              </div>
            ) : webinars.length > 0 ? (
              <div className="space-y-4">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="p-4 border-2 border-slate-200 rounded-lg hover:border-accent-gold transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-primary">{webinar.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            webinar.type === 'zoom' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {webinar.type === 'zoom' ? 'Zoom' : 'Google Meet'}
                          </span>
                        </div>
                        {webinar.description && (
                          <p className="text-sm text-slate-600 mt-1">{webinar.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => webinar.id && handleDelete(webinar.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-600">{formatDateTime(webinar.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-slate-600">to {formatDateTime(webinar.endTime)}</span>
                      </div>
                      <a
                        href={webinar.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent-gold font-bold hover:underline"
                      >
                        <LinkIcon size={16} />
                        Join Meeting
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-8">No webinars scheduled yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
