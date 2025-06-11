import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 festive-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-block text-6xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl text-gray-900 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Party Genie</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform any occasion into an unforgettable celebration with AI-powered party planning that handles everything from themes to shopping lists
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ApperIcon name="Sparkles" className="w-6 h-6" />
              <span>Create Your Perfect Party</span>
              <ApperIcon name="ArrowRight" className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Zap" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl text-gray-900 mb-4">AI-Powered Themes</h3>
              <p className="text-gray-600">
                Generate unique party themes instantly based on your occasion, budget, and preferences
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Package" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl text-gray-900 mb-4">Complete Packages</h3>
              <p className="text-gray-600">
                Get everything you need: decorations, music playlists, menu ideas, and activities in one place
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-accent/20 p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Share2" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl text-gray-900 mb-4">Save & Share</h3>
              <p className="text-gray-600">
                Save your perfect party plans and share them with friends, family, or event coordinators
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Feature Component */}
      <MainFeature />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-r from-primary to-secondary py-16 mt-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy hosts who've discovered the secret to stress-free party planning
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create')}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-primary rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="PartyPopper" className="w-6 h-6" />
            <span>Start Your Party Adventure</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;