import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import partyService from '../services/api/partyService';

const MyParties = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadParties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await partyService.getAll();
        setParties(result);
      } catch (err) {
        setError(err.message || 'Failed to load parties');
        toast.error('Failed to load your parties');
      } finally {
        setLoading(false);
      }
    };
    loadParties();
  }, []);

  const handleDeleteParty = async (id) => {
    if (window.confirm('Are you sure you want to delete this party plan?')) {
      try {
        await partyService.delete(id);
        setParties(parties.filter(party => party.id !== id));
        toast.success('Party plan deleted successfully');
      } catch (error) {
        toast.error('Failed to delete party plan');
      }
    }
  };

  const handleShareParty = async (party) => {
    const shareUrl = `${window.location.origin}/party/${party.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Party link copied to clipboard! 🎉');
    } catch (error) {
      toast.success(`Share this link: ${shareUrl}`);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex space-x-2 pt-4">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-heading text-xl text-gray-900 mb-4">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Empty State
  if (parties.length === 0) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-8"
            >
              <ApperIcon name="PartyPopper" className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="font-display text-3xl text-gray-900 mb-4">No Party Plans Yet!</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Ready to create your first magical celebration? Let's get this party started!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ApperIcon name="Plus" className="w-5 h-5" />
              <span>Create Your First Party</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Party List
  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl text-gray-900 mb-4">
            Your Party Collection 🎊
          </h1>
          <p className="text-gray-600 text-lg">
            {parties.length} amazing celebration{parties.length !== 1 ? 's' : ''} ready to make memories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parties.map((party, index) => (
            <motion.div
              key={party.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl border-2 border-primary/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-heading text-xl text-gray-900 mb-2">
                    {party.theme?.name || party.occasion}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{party.occasion}</p>
                  {party.date && (
                    <p className="text-sm text-gray-500">
                      {new Date(party.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShareParty(party)}
                    className="p-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <ApperIcon name="Share2" className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteParty(party.id)}
                    className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {party.theme && (
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {party.theme.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {party.theme.colorScheme?.slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
<div className="space-y-2 text-xs text-gray-500 mb-4">
                <div className="flex items-center justify-between">
                  <span>👥 {party.guestCount} guests</span>
                  <span>💰 {party.currency === 'INR' ? '₹' : '$'}{party.budget} budget</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📍 {party.venue}</span>
                  <span>📍 {party.venue}</span>
                  {party.savedAt && (
                    <span>
                      {new Date(party.savedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/party/${party.id}`)}
                className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
              >
                View Full Plan
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Create Another Party</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MyParties;