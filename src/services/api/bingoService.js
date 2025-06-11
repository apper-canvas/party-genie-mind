import bingoItems from '@/services/mockData/bingoItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class BingoService {
  constructor() {
    this.items = [...bingoItems];
    this.tickets = [];
    this.markedSquares = new Map(); // ticketId -> Set of marked squares
  }

  async generateTickets(count = 15) {
    await delay(500);
    
    const tickets = [];
    
    for (let i = 1; i <= count; i++) {
      const ticket = {
        id: i,
        grid: this.generateBingoGrid(),
        createdAt: new Date().toISOString()
      };
      tickets.push(ticket);
    }
    
    this.tickets = [...tickets];
    this.markedSquares.clear(); // Reset marked squares
    
    return [...tickets];
  }

  generateBingoGrid() {
    const grid = [];
    const usedItems = new Set();
    
    // Create 5x5 grid
    for (let row = 0; row < 5; row++) {
      const gridRow = [];
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          // Center space is always FREE
          gridRow.push('FREE');
        } else {
          // Get random unique item
          let item;
          do {
            item = this.items[Math.floor(Math.random() * this.items.length)];
          } while (usedItems.has(item) && usedItems.size < this.items.length - 1);
          
          usedItems.add(item);
          gridRow.push(item);
        }
      }
      grid.push(gridRow);
    }
    
    return grid;
  }

  async markSquare(ticketId, row, col, isMarked) {
    await delay(100);
    
    const squareKey = `${ticketId}-${row}-${col}`;
    
    if (!this.markedSquares.has(ticketId)) {
      this.markedSquares.set(ticketId, new Set());
    }
    
    const ticketMarked = this.markedSquares.get(ticketId);
    
    if (isMarked) {
      ticketMarked.add(`${row}-${col}`);
    } else {
      ticketMarked.delete(`${row}-${col}`);
    }
    
    // Check for win
    const isWin = this.checkWin(ticketId);
    
    return {
      ticketId,
      row,
      col,
      isMarked,
      isWin
    };
  }

  checkWin(ticketId) {
    const marked = this.markedSquares.get(ticketId);
    if (!marked) return false;
    
    // Add free space (center) to marked squares for win checking
    const markedWithFree = new Set([...marked, '2-2']);
    
    // Check rows
    for (let row = 0; row < 5; row++) {
      let rowComplete = true;
      for (let col = 0; col < 5; col++) {
        if (!markedWithFree.has(`${row}-${col}`)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }
    
    // Check columns
    for (let col = 0; col < 5; col++) {
      let colComplete = true;
      for (let row = 0; row < 5; row++) {
        if (!markedWithFree.has(`${row}-${col}`)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }
    
    // Check diagonal (top-left to bottom-right)
    let diag1Complete = true;
    for (let i = 0; i < 5; i++) {
      if (!markedWithFree.has(`${i}-${i}`)) {
        diag1Complete = false;
        break;
      }
    }
    if (diag1Complete) return true;
    
    // Check diagonal (top-right to bottom-left)
    let diag2Complete = true;
    for (let i = 0; i < 5; i++) {
      if (!markedWithFree.has(`${i}-${4-i}`)) {
        diag2Complete = false;
        break;
      }
    }
    if (diag2Complete) return true;
    
    return false;
  }

  async getTicketById(id) {
    await delay(100);
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return { ...ticket };
  }

  async getAllTickets() {
    await delay(200);
    return [...this.tickets];
  }

  async getMarkedSquares(ticketId) {
    await delay(50);
    const marked = this.markedSquares.get(ticketId);
    return marked ? [...marked] : [];
  }

  async resetAllTickets() {
    await delay(200);
    this.markedSquares.clear();
    return true;
  }
}

export default new BingoService();