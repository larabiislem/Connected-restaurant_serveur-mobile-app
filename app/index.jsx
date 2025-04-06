
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/welcome';
import SignUpScreen from '../screens/Sign_In';
import HomeScreen from '../screens/Home';
import ClientScreen from '../screens/client';
import CheftScreen from '../screens/chef';
import { registerRootComponent } from 'expo';

const App = ()=>{
  return <CheftScreen />

};
registerRootComponent(App);

export default App;
 

