import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from './screens/FoodList';
import FoodDetails from './screens/FoodDetails';
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import GetStarted from './screens/GetStarted';
import FoodListv2 from './screens/FoodListv2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='GetStarted'>
        <Stack.Screen name='GetStarted'
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='FoodList'
          component={FoodListv2}
          options={{ title: 'Food List' }}
        />
        <Stack.Screen name='FoodDetails'
          component={FoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

