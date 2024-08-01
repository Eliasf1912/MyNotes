import React, { useState } from 'react'
import { Text, StyleSheet , TextInput, View} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/CustomComponents/NavBar";
import Neumorphism from "@/components/CustomComponents/Neumorphism";
import ButtonCustom from "@/components/CustomComponents/ButtonCustom";
import Dropdown from '@/components/CustomComponents/Dropdown';
import { IDropdown } from '@/components/CustomComponents/Dropdown';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface IForm {
  Data : any // passer un object 
}

export default function Form({Data} : IForm) {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [Title,setTitle] = useState('')
  const [TextContent,setText] = useState('')
  const [Criticity,setCriticity] = useState<any>()

  const Callback = (data : typeof Criticity) => {
    setCriticity(data)
  }

  const date = new Date().toLocaleDateString('fr')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <NavBar Page="Form"/>
        <View>
          <Neumorphism TypeChildren='ButtonPrimary'>
            <TextInput 
              onChangeText={Title => setTitle(Title)}
              placeholder='Title...'
              value={Title}
            />
          </Neumorphism>
          <View>
            <Dropdown Callback={Callback}/> 
            <Text>{date}</Text>
          </View>
          <TextInput 
            onChangeText={TextContent => setText(TextContent)}
            placeholder='Write your content...'
            value={TextContent}
          />
        </View>
        
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