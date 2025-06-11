import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import partyService from '../services/api/partyService';
import themeService from '../services/api/themeService';

const MainFeature = () => {
  const [currentStep, setCurrentStep] = useState(1);
const [partyData, setPartyData] = useState({
    occasion: '',
    date: '',
    guestCount: 10,
    ageRanges: [],
    budget: 500,
    currency: 'USD',
    venue: '',
    preferences: ''
  });
  const [generatedThemes, setGeneratedThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

const occasions = [
    'Birthday Party', 'Wedding', 'Baby Shower', 'Graduation', 'Anniversary',
    'Diwali', 'Holi', 'Karva Chauth', 'Ganesh Chaturthi', 'Dussehra',
    'Corporate Event', 'Housewarming', 'Kitty Party', 'Retirement', 'Engagement'
  ];

  const ageRangeOptions = [
    'Toddlers (1-3)', 'Kids (4-12)', 'Teens (13-17)', 'Adults (18-64)', 'Seniors (65+)'
  ];

  const venueTypes = [
    'Home/Indoor', 'Backyard/Outdoor', 'Restaurant', 'Event Hall', 'Park', 'Beach', 'Other'
  ];

  const handleGenerateThemes = async () => {
    if (!partyData.occasion || !partyData.venue) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const themes = await themeService.generateThemes(partyData);
      setGeneratedThemes(themes);
      setCurrentStep(2);
      toast.success('Amazing themes generated just for you!');
      
      // Confetti effect
      createConfetti();
    } catch (error) {
      toast.error('Oops! Theme generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed w-2 h-2 confetti pointer-events-none z-50';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 1000);
    }
  };

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    setCurrentStep(3);
  };

  const handleSaveParty = async () => {
    if (!selectedTheme) return;

    const fullPartyPlan = {
      ...partyData,
      theme: selectedTheme,
      id: Date.now().toString()
    };

    try {
      await partyService.create(fullPartyPlan);
      toast.success('🎉 Party plan saved! Ready to celebrate!');
      createConfetti();
    } catch (error) {
      toast.error('Failed to save party plan');
    }
  };

  const handleElementEdit = async (type, elementId, newData) => {
    try {
      const updatedTheme = await themeService.updateElement(selectedTheme.id, type, elementId, newData);
      setSelectedTheme(updatedTheme);
      setEditingElement(null);
      toast.success('Element updated successfully!');
    } catch (error) {
      toast.error('Failed to update element');
    }
  };

  if (currentStep === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-primary/20 p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-gray-900 mb-4">
              Let's Plan Your Perfect Party! 🎉
            </h1>
            <p className="text-gray-600 text-lg">
              Tell us about your celebration and we'll create magical themes just for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's the occasion? *
                </label>
                <select
                  value={partyData.occasion}
                  onChange={(e) => setPartyData({ ...partyData, occasion: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white transition-all duration-200"
                >
                  <option value="">Select an occasion</option>
                  {occasions.map(occasion => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Date
                </label>
                <input
                  type="date"
                  value={partyData.date}
                  onChange={(e) => setPartyData({ ...partyData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guest Count: {partyData.guestCount}
                </label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={partyData.guestCount}
                  onChange={(e) => setPartyData({ ...partyData, guestCount: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>200+</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Groups (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ageRangeOptions.map(age => (
                    <label key={age} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={partyData.ageRanges.includes(age)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPartyData({ ...partyData, ageRanges: [...partyData.ageRanges, age] });
                          } else {
                            setPartyData({ ...partyData, ageRanges: partyData.ageRanges.filter(r => r !== age) });
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

<div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget: {partyData.currency === 'INR' ? '₹' : '$'}{partyData.budget}
                </label>
                <div className="flex space-x-4 mb-2">
                  <select
                    value={partyData.currency}
                    onChange={(e) => setPartyData({ ...partyData, currency: e.target.value })}
className="px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-primary focus:bg-white transition-all duration-200"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={partyData.budget}
                  onChange={(e) => setPartyData({ ...partyData, budget: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gradient-to-r from-accent to-primary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{partyData.currency === 'INR' ? '₹' : '$'}100</span>
                  <span>{partyData.currency === 'INR' ? '₹' : '$'}5000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Type *
                </label>
                <select
                  value={partyData.venue}
                  onChange={(e) => setPartyData({ ...partyData, venue: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white transition-all duration-200"
                >
                  <option value="">Select venue type</option>
                  {venueTypes.map(venue => (
                    <option key={venue} value={venue}>{venue}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Preferences or Requests
            </label>
            <textarea
              value={partyData.preferences}
              onChange={(e) => setPartyData({ ...partyData, preferences: e.target.value })}
              placeholder="Any special themes, dietary restrictions, or specific requests..."
              rows="3"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateThemes}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-5 h-5 animate-spin" />
                  <span>Creating Magic...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" className="w-5 h-5" />
                  <span>Generate Party Themes</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl text-gray-900 mb-4">
            ✨ Your Magical Theme Options ✨
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the perfect theme for your {partyData.occasion}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {generatedThemes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl border-2 border-secondary/30 p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => handleSelectTheme(theme)}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                <h3 className="font-heading text-xl text-gray-900">{theme.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{theme.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {theme.colorScheme.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Palette" className="w-4 h-4" />
                  <span>{theme.decorItems?.length || 0} décor items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Music" className="w-4 h-4" />
                  <span>{theme.playlist?.songs?.length || 0} song playlist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="UtensilsCrossed" className="w-4 h-4" />
                  <span>{theme.menuItems?.length || 0} menu items</span>
                </div>
              </div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 mt-4 text-primary font-medium"
              >
                <span>Choose This Theme</span>
                <ApperIcon name="ArrowRight" className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(1)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
            ← Back to Party Details
          </motion.button>
        </div>
      </div>
    );
  }

  if (currentStep === 3 && selectedTheme) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-primary/20 p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-gray-900 mb-2">
                {selectedTheme.name}
              </h2>
              <p className="text-gray-600">{selectedTheme.description}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveParty}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ApperIcon name="Save" className="w-5 h-5 inline mr-2" />
              Save Party Plan
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Decorations */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-gray-900 flex items-center space-x-2">
                <ApperIcon name="Palette" className="w-5 h-5 text-primary" />
                <span>Decorations</span>
              </h3>
              <div className="space-y-3">
                {selectedTheme.decorItems?.slice(0, 6).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm font-medium text-primary">${item.price}</p>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={item.shopLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                    >
                      <ApperIcon name="ExternalLink" className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-gray-900 flex items-center space-x-2">
                <ApperIcon name="UtensilsCrossed" className="w-5 h-5 text-secondary" />
                <span>Menu</span>
              </h3>
              <div className="space-y-3">
                {selectedTheme.menuItems?.slice(0, 6).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.type} • Serves {item.servings}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.dietaryTags?.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {item.recipeLink && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={item.recipeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        <ApperIcon name="ExternalLink" className="w-4 h-4" />
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Music & Activities */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Music */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-gray-900 flex items-center space-x-2">
                <ApperIcon name="Music" className="w-5 h-5 text-accent" />
                <span>Playlist</span>
              </h3>
              {selectedTheme.playlist && (
                <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedTheme.playlist.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedTheme.playlist.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {selectedTheme.playlist.songs?.length || 0} songs • {selectedTheme.playlist.duration || "2h 30m"}
                    </span>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={selectedTheme.playlist.spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      Open in Spotify
                    </motion.a>
                  </div>
                </div>
              )}
            </div>

            {/* Activities */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-gray-900 flex items-center space-x-2">
                <ApperIcon name="Gamepad2" className="w-5 h-5 text-purple-500" />
                <span>Activities</span>
              </h3>
              <div className="space-y-3">
                {selectedTheme.activities?.slice(0, 4).map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-purple-50 rounded-xl"
                  >
                    <h4 className="font-medium text-gray-900">{activity.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-purple-600 mt-2">
                      {activity.duration} • {activity.participants}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 mr-4"
            >
              ← Choose Different Theme
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default MainFeature;