import themeData from '../mockData/themes.json';
import browseThemesData from '../mockData/browseThemes.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ThemeService {
  constructor() {
    this.themes = [...themeData];
    this.browseThemes = [...browseThemesData];
  }

  async generateThemes(partyData) {
    await delay(2000); // Simulate AI processing time
    
    // Simulate AI theme generation based on party data
    const baseThemes = [...this.themes];
    const generatedThemes = baseThemes.map(theme => ({
      ...theme,
      id: Date.now() + Math.random(),
      // Customize based on party preferences
      decorItems: theme.decorItems?.map(item => ({
        ...item,
        price: Math.round(item.price * (partyData.budget / 1000)) // Adjust prices based on budget
      }))
    }));

    return generatedThemes.slice(0, 3); // Return 3 generated themes
  }

  async getBrowseThemes() {
    await delay(400);
    return [...this.browseThemes];
  }

  async getById(id) {
    await delay(200);
    const theme = [...this.themes, ...this.browseThemes].find(t => t.id === id);
    if (!theme) {
      throw new Error('Theme not found');
    }
    return { ...theme };
  }

  async updateElement(themeId, elementType, elementId, newData) {
    await delay(300);
    // Simulate updating theme element
    const theme = this.themes.find(t => t.id === themeId);
    if (!theme) {
      throw new Error('Theme not found');
    }
    
    // Update the specific element based on type
    switch (elementType) {
      case 'decor':
        const decorIndex = theme.decorItems?.findIndex(item => item.id === elementId);
        if (decorIndex >= 0) {
          theme.decorItems[decorIndex] = { ...theme.decorItems[decorIndex], ...newData };
        }
        break;
      case 'menu':
        const menuIndex = theme.menuItems?.findIndex(item => item.id === elementId);
        if (menuIndex >= 0) {
          theme.menuItems[menuIndex] = { ...theme.menuItems[menuIndex], ...newData };
        }
        break;
      case 'activity':
        const activityIndex = theme.activities?.findIndex(item => item.id === elementId);
        if (activityIndex >= 0) {
          theme.activities[activityIndex] = { ...theme.activities[activityIndex], ...newData };
        }
        break;
    }
    
    return { ...theme };
  }
}

export default new ThemeService();