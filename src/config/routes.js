import Home from '../pages/Home';
import CreateParty from '../pages/CreateParty';
import MyParties from '../pages/MyParties';
import BrowseThemes from '../pages/BrowseThemes';
import PartyDetails from '../pages/PartyDetails';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  createParty: {
    id: 'createParty',
    label: 'Create Party',
    path: '/create',
    icon: 'Plus',
    component: CreateParty
  },
  myParties: {
    id: 'myParties',
    label: 'My Parties',
    path: '/parties',
    icon: 'Calendar',
    component: MyParties
  },
  browseThemes: {
    id: 'browseThemes',
    label: 'Browse Themes',
    path: '/themes',
    icon: 'Palette',
    component: BrowseThemes
  },
  partyDetails: {
    id: 'partyDetails',
    label: 'Party Details',
    path: '/party/:id',
    icon: 'Eye',
    component: PartyDetails
  }
};

export const routeArray = Object.values(routes);