import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './screens/HomeScreen/Home';
import AddContact from './screens/ContactsScreen/Contact';

const navigator = createStackNavigator(
  {
    HomeScreen: Home,
    ContactScreen: AddContact,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  },
);

export const App = createAppContainer(navigator);
