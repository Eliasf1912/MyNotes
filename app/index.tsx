import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/app/Home'
import Note from '@/app/Note'
import Form from "@/app/Form";


// On passe les pages de l'application 
export type RootStackParamList = {
  Home: undefined,
  Note: undefined,
  Text: undefined,
  Form : undefined
};

const Nav = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer independent={true}> 
      <Nav.Navigator initialRouteName="Home">
        <Nav.Screen name="Home"  component={Home} options={{headerShown : false}} />
        <Nav.Screen name="Note"  component={Note} options={{headerShown : false}} />
        <Nav.Screen name="Form"  component={Form} options={{headerShown : false}} />
      </Nav.Navigator>
    </NavigationContainer>
  )
}
