import partyData from '../mockData/parties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PartyService {
  constructor() {
    this.parties = [...partyData];
  }

  async getAll() {
    await delay(300);
    return [...this.parties];
  }

  async getById(id) {
    await delay(200);
    const party = this.parties.find(p => p.id === id);
    if (!party) {
      throw new Error('Party plan not found');
    }
    return { ...party };
  }

  async create(partyPlan) {
    await delay(400);
    const newParty = {
      ...partyPlan,
      id: Date.now().toString(),
      savedAt: new Date().toISOString()
    };
    this.parties.push(newParty);
    return { ...newParty };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.parties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Party plan not found');
    }
    this.parties[index] = { ...this.parties[index], ...updates };
    return { ...this.parties[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.parties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Party plan not found');
    }
    this.parties.splice(index, 1);
    return true;
  }
}

export default new PartyService();