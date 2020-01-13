import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Components/home'
import Bank from './Components/bank'
import TransactionAmount from './Components/transactionAmount'

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});

const RootNavigator = createStackNavigator({
  Main: { screen: MainNavigator },
  Bank: { screen: Bank },
  Transaction: {screen: TransactionAmount}
},
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createAppContainer(RootNavigator);

export default App;
