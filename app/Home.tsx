import { Text, View, StyleSheet,useWindowDimensions} from "react-native";
import { Colors } from "@/constants/Colors";
import Neumorphism from "@/components/CustomComponents/Neumorphism";
import ButtonCustom from "@/components/CustomComponents/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/CustomComponents/NavBar";

// On crée un type pour Le hook useNavigation sache les pages de l'appli
type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function Home({}) {
  const {width} = useWindowDimensions()
  const navigation = useNavigation<ScreenNavigationProp>()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <NavBar Page="Home"/>
        <View style={width > 400 ? Landscape : Default}>
          <Text style={Styles.Title} >Welcome to MyNotes</Text>
          <Text style={Styles.Text} >
            We're excited to have you here. It looks like you haven't created any notes yet. No worries—now's the perfect time to get started with organizing your ideas, tasks, and projects!
          </Text>
        </View>
        {width < 400 && 
            <Neumorphism TypeChildren="ButtonSecondary">
              <ButtonCustom ButtonContent="Text" TextContent="Create a note" ButtonStyle="Secondary" OnPress={()=>{navigation.navigate('Form')}} />
            </Neumorphism>
          }
      </SafeAreaView>
    </SafeAreaProvider>
  ); 
}


const Styles = StyleSheet.create({
  container : {
    flex : 1,
    gap: 20,
    alignItems : 'center',
    backgroundColor : Colors.DarkBlue
  },
  MarginDefault :{
    marginTop  : '30%'
  },
  MarginLandscape :{
    marginTop  : '5%'
  },
  MiddleContainer : {
    padding : 15,
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'center',
    gap : 30
  },
  Title : {
    color : 'white',
    fontSize : 30,
    fontWeight : 'bold'
  },
  Text : {
    color : 'white',
    fontSize : 20,
    textAlign : 'center'
  }

})

const Default = StyleSheet.compose(Styles.MiddleContainer,Styles.MarginDefault)
const Landscape = StyleSheet.compose(Styles.MiddleContainer,Styles.MarginLandscape)