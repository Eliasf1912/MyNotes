import React from 'react'
import { Text, StyleSheet} from "react-native";
import { Colors } from "@/constants/Colors";
import Neumorphism from "@/components/CustomComponents/Neumorphism";
import ButtonCustom from "@/components/CustomComponents/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/CustomComponents/NavBar";

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Form() {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <NavBar Page="Form"/>
        <Neumorphism TypeChildren="ButtonSecondary">
          <ButtonCustom ButtonContent="Text" TextContent="Create a note" ButtonStyle="Secondary" OnPress={()=>{navigation.navigate('Form')}} />
        </Neumorphism>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}


const Styles = StyleSheet.create({
  container : {
    flex : 1,
    gap: 20,
    alignItems : 'center',
    backgroundColor : Colors.DarkBlue
  },
})