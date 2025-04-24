import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/main";
import SignInScreen from "../screens/Sign_In";

const Stack = createStackNavigator();
export default function MainScreen() {

  return(
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={Main} />
    
    </Stack.Navigator>


  )

}