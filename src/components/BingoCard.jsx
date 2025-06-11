import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BingoCard = ({ ticket, onMark, showWin = false }) => {
  const [markedSquares, setMarkedSquares] = useState(new Set());

  const handleSquareClick = (row, col) => {
    const squareId = `${row}-${col}`;
    const newMarkedSquares = new Set(markedSquares);
    
    if (markedSquares.has(squareId)) {
      newMarkedSquares.delete(squareId);
    } else {
      newMarkedSquares.add(squareId);
    }
    
    setMarkedSquares(newMarkedSquares);
    
    if (onMark) {
      onMark(ticket.id, row, col, !markedSquares.has(squareId));
    }
  };

  const isSquareMarked = (row, col) => {
    return markedSquares.has(`${row}-${col}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl border-2 shadow-lg overflow-hidden ${
        showWin ? 'border-secondary ring-4 ring-secondary/20' : 'border-primary/20'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white text-center">
        <h3 className="font-display text-xl font-bold">PARTY BINGO</h3>
        <p className="text-white/90 text-sm">Ticket #{ticket.id}</p>
        {showWin && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center mt-2 space-x-2"
          >
            <ApperIcon name="Trophy" className="w-5 h-5" />
            <span className="font-bold">WINNER!</span>
          </motion.div>
        )}
      </div>

      {/* BINGO Header */}
      <div className="grid grid-cols-5 bg-gradient-to-r from-accent to-primary/80 text-white font-bold text-center">
        {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
          <div key={letter} className="py-3 text-lg font-display">
            {letter}
          </div>
        ))}
      </div>

      {/* Bingo Grid */}
      <div className="grid grid-cols-5 gap-0 border-t border-gray-200">
        {ticket.grid.map((row, rowIndex) =>
          row.map((item, colIndex) => {
            const isMarked = isSquareMarked(rowIndex, colIndex);
            const isFreeSpace = rowIndex === 2 && colIndex === 2;
            
            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => !isFreeSpace && handleSquareClick(rowIndex, colIndex)}
                disabled={isFreeSpace}
                whileHover={!isFreeSpace ? { scale: 1.05 } : {}}
                whileTap={!isFreeSpace ? { scale: 0.95 } : {}}
                className={`
                  aspect-square p-2 text-xs font-medium border border-gray-200 
                  transition-all duration-200 relative overflow-hidden
                  ${isFreeSpace 
                    ? 'bg-gradient-to-br from-royal to-crimson text-white cursor-default' 
                    : isMarked
                    ? 'bg-gradient-to-br from-secondary to-primary text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-800'
                  }
                `}
              >
                {isFreeSpace ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <ApperIcon name="Star" className="w-4 h-4 mb-1" />
                    <span className="text-[10px] font-bold">FREE</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center leading-tight">
                    <span className="break-words">{item}</span>
                    {isMarked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <ApperIcon name="Check" className="w-6 h-6 text-white drop-shadow-lg" />
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.button>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 text-center">
        <p className="text-xs text-gray-600">
          Mark 5 in a row to win! 🎉
        </p>
      </div>
    </motion.div>
  );
};

export default BingoCard;