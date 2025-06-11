import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import partyService from '../services/api/partyService';

const PartyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'decorations', label: 'Decorations', icon: 'Palette' },
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'music', label: 'Music', icon: 'Music' },
    { id: 'activities', label: 'Activities', icon: 'Gamepad2' }
  ];

  useEffect(() => {
    const loadParty = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await partyService.getById(id);
        setParty(result);
      } catch (err) {
        setError(err.message || 'Failed to load party details');
        toast.error('Failed to load party details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadParty();
    }
  }, [id]);

  const handleShareParty = async () => {
    const shareUrl = window.location.href;
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
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="flex space-x-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
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
            <h3 className="font-heading text-xl text-gray-900 mb-4">Party Not Found</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/parties')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition-colors"
            >
              Back to My Parties
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!party) return null;

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="font-display text-3xl mb-2">
                  {party.theme?.name || party.occasion}
                </h1>
                <p className="text-white/90 text-lg mb-4">
                  {party.theme?.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Calendar" className="w-4 h-4" />
                    <span>{party.date ? new Date(party.date).toLocaleDateString() : 'Date TBD'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Users" className="w-4 h-4" />
                    <span>{party.guestCount} guests</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="DollarSign" className="w-4 h-4" />
                    <span>${party.budget} budget</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span>{party.venue}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareParty}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                >
                  <ApperIcon name="Share2" className="w-4 h-4 inline mr-2" />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/parties')}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                >
                  <ApperIcon name="ArrowLeft" className="w-4 h-4 inline mr-2" />
                  Back
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Color Scheme */}
                {party.theme?.colorScheme && (
                  <div>
                    <h3 className="font-heading text-xl text-gray-900 mb-4">Color Palette</h3>
                    <div className="flex flex-wrap gap-4">
                      {party.theme.colorScheme.map((color, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-sm font-mono text-gray-600">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-primary/10 rounded-xl p-6 text-center">
                    <ApperIcon name="Palette" className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {party.theme?.decorItems?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Décor Items</div>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-6 text-center">
                    <ApperIcon name="Music" className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {party.theme?.playlist?.songs?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Songs</div>
                  </div>
                  <div className="bg-accent/10 rounded-xl p-6 text-center">
                    <ApperIcon name="UtensilsCrossed" className="w-8 h-8 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {party.theme?.menuItems?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Menu Items</div>
                  </div>
                  <div className="bg-purple-100 rounded-xl p-6 text-center">
                    <ApperIcon name="Gamepad2" className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {party.theme?.activities?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Activities</div>
                  </div>
                </div>

                {/* Guest Information */}
                {party.ageRanges && party.ageRanges.length > 0 && (
                  <div>
                    <h3 className="font-heading text-xl text-gray-900 mb-4">Guest Demographics</h3>
                    <div className="flex flex-wrap gap-2">
                      {party.ageRanges.map((range, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {range}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'decorations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="font-heading text-2xl text-gray-900">Decoration Items</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {party.theme?.decorItems?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="text-primary font-bold">${item.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={item.shopLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                      >
                        <ApperIcon name="ExternalLink" className="w-4 h-4" />
                        <span>Shop Now</span>
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="font-heading text-2xl text-gray-900">Menu Items</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {party.theme?.menuItems?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.type} • Serves {item.servings}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.dietaryTags?.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.recipeLink && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={item.recipeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <ApperIcon name="ExternalLink" className="w-4 h-4" />
                          <span>View Recipe</span>
                        </motion.a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'music' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="font-heading text-2xl text-gray-900">Party Playlist</h3>
                {party.theme?.playlist && (
                  <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-heading text-xl text-gray-900 mb-2">
                          {party.theme.playlist.name}
                        </h4>
                        <p className="text-gray-600">{party.theme.playlist.description}</p>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={party.theme.playlist.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                      >
                        <ApperIcon name="ExternalLink" className="w-5 h-5 inline mr-2" />
                        Open in Spotify
                      </motion.a>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>{party.theme.playlist.songs?.length || 0}</strong> songs
                      </div>
                      <div>
                        <strong>{party.theme.playlist.duration || "2h 30m"}</strong> duration
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activities' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="font-heading text-2xl text-gray-900">Party Activities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {party.theme?.activities?.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-purple-50 rounded-xl p-6"
                    >
                      <h4 className="font-medium text-gray-900 mb-3">{activity.name}</h4>
                      <p className="text-gray-600 mb-4">{activity.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-purple-600">
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Users" className="w-4 h-4" />
                          <span>{activity.participants}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartyDetails;