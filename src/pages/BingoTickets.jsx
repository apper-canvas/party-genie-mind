import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import BingoCard from '@/components/BingoCard';
import bingoService from '@/services/api/bingoService';

const BingoTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [winningTickets, setWinningTickets] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    generateTickets();
  }, []);

  const generateTickets = async () => {
    setLoading(true);
    try {
      const newTickets = await bingoService.generateTickets(15);
      setTickets(newTickets);
      setWinningTickets(new Set());
      setGameStarted(false);
      toast.success('15 new bingo tickets generated! 🎉');
    } catch (error) {
      toast.error('Failed to generate tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSquareMark = async (ticketId, row, col, isMarked) => {
    try {
      const result = await bingoService.markSquare(ticketId, row, col, isMarked);
      
      if (result.isWin && !winningTickets.has(ticketId)) {
        const newWinningTickets = new Set(winningTickets);
        newWinningTickets.add(ticketId);
        setWinningTickets(newWinningTickets);
        
        toast.success(`🏆 Ticket #${ticketId} has BINGO! 🎉`, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Failed to mark square. Please try again.');
    }
  };

  const resetGame = () => {
    setWinningTickets(new Set());
    setGameStarted(false);
    toast.info('Game reset! All tickets cleared.');
  };

  const startGame = () => {
    setGameStarted(true);
    toast.success('Let the bingo party begin! 🎊');
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-surface-50 via-accent/10 to-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="font-heading text-lg text-gray-600">Generating your bingo tickets...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-surface-50 via-accent/10 to-primary/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl mb-2">Party Bingo Tickets</h1>
                <p className="text-white/90 text-lg">15 unique tickets for your celebration</p>
                <div className="flex items-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Ticket" className="w-4 h-4" />
                    <span>{tickets.length} tickets</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Trophy" className="w-4 h-4" />
                    <span>{winningTickets.size} winners</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateTickets}
                  disabled={loading}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
                >
                  <ApperIcon name="RefreshCw" className="w-4 h-4 inline mr-2" />
                  New Tickets
                </motion.button>
                {!gameStarted ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="px-6 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <ApperIcon name="Play" className="w-4 h-4 inline mr-2" />
                    Start Game
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="px-6 py-3 bg-crimson text-white rounded-xl font-medium hover:bg-crimson/80 transition-colors"
                  >
                    <ApperIcon name="RotateCcw" className="w-4 h-4 inline mr-2" />
                    Reset Game
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Game Instructions */}
          <div className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded"></div>
                <span>Marked squares</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-royal to-crimson rounded"></div>
                <span>Free space</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Trophy" className="w-4 h-4 text-secondary" />
                <span>Get 5 in a row to win!</span>
              </div>
            </div>
          </div>

          {/* Tickets Grid */}
          <div className="p-8">
            {tickets.length === 0 ? (
              <div className="text-center py-16">
                <ApperIcon name="Ticket" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-heading text-xl text-gray-600 mb-2">No tickets generated yet</h3>
                <p className="text-gray-500">Click "New Tickets" to generate 15 bingo tickets</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BingoCard
                      ticket={ticket}
                      onMark={gameStarted ? handleSquareMark : null}
                      showWin={winningTickets.has(ticket.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Winner Celebration */}
          {winningTickets.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-secondary to-primary p-6 text-white text-center"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ApperIcon name="Trophy" className="w-6 h-6" />
                <h3 className="font-display text-xl">
                  Congratulations! 🎉
                </h3>
              </div>
              <p className="text-white/90">
                {winningTickets.size} ticket{winningTickets.size > 1 ? 's have' : ' has'} achieved BINGO!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BingoTickets;