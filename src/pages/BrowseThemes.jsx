import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import themeService from '../services/api/themeService';

const BrowseThemes = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

const categories = [
    { id: 'all', label: 'All Themes', icon: 'Grid3x3' },
    { id: 'birthday', label: 'Birthday', icon: 'Cake' },
    { id: 'wedding', label: 'Wedding', icon: 'Heart' },
    { id: 'festival', label: 'Festival', icon: 'Sparkles' },
    { id: 'religious', label: 'Religious', icon: 'Star' },
    { id: 'celebration', label: 'Celebration', icon: 'PartyPopper' }
  ];

  useEffect(() => {
    const loadThemes = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await themeService.getBrowseThemes();
        setThemes(result);
      } catch (err) {
        setError(err.message || 'Failed to load themes');
        toast.error('Failed to load theme gallery');
      } finally {
        setLoading(false);
      }
    };
    loadThemes();
  }, []);

  const filteredThemes = selectedCategory === 'all' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  const handleUseTheme = (theme) => {
    // Store selected theme and navigate to create party
    sessionStorage.setItem('selectedTheme', JSON.stringify(theme));
    navigate('/create');
    toast.success(`Using "${theme.name}" theme! 🎉`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
          </div>
          
          {/* Category filters skeleton */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            ))}
          </div>

          {/* Theme cards skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-32 bg-gray-200 rounded-xl"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex space-x-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    ))}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-heading text-xl text-gray-900 mb-4">Couldn't Load Themes</h3>
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

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl text-gray-900 mb-4">
            Theme Gallery ✨
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing party themes created by our AI and get inspired for your next celebration
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <ApperIcon name={category.icon} className="w-4 h-4" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Theme Grid */}
        {filteredThemes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Search" className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading text-xl text-gray-900 mb-4">No Themes Found</h3>
            <p className="text-gray-600 mb-6">
              Try a different category or create your first custom theme!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition-colors"
            >
              Create Custom Theme
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl border-2 border-primary/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Theme Preview */}
                <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 festive-bg opacity-30"></div>
                  <div className="relative flex flex-wrap gap-2 justify-center">
                    {theme.colorScheme?.slice(0, 6).map((color, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      ></motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-lg text-gray-900 mb-2">
                    {theme.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {theme.description}
                  </p>

                  {/* Theme Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Palette" className="w-3 h-3" />
                      <span>{theme.decorItems?.length || 0} items</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Music" className="w-3 h-3" />
                      <span>{theme.playlist?.songs?.length || 0} songs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="UtensilsCrossed" className="w-3 h-3" />
                      <span>{theme.menuItems?.length || 0} recipes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Gamepad2" className="w-3 h-3" />
                      <span>{theme.activities?.length || 0} games</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUseTheme(theme)}
                    className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
                  >
                    Use This Theme
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white"
        >
          <h2 className="font-display text-2xl mb-4">Don't See What You Love?</h2>
          <p className="text-white/90 mb-6">
            Create a completely custom theme tailored to your unique celebration
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create')}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Create Custom Theme</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseThemes;