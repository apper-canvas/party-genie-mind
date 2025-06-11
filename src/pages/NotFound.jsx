import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-8xl mb-8"
        >
          🎈
        </motion.div>
        
        <h1 className="font-display text-6xl text-gray-900 mb-4">404</h1>
        <h2 className="font-heading text-2xl text-gray-800 mb-6">
          Oops! This Party Disappeared! 🎉
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Looks like this page flew away like a balloon at a party. Let's get you back to the celebration!
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-xl font-medium border-2 border-primary hover:bg-primary/5 transition-all duration-200 ml-4"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Create a Party</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;