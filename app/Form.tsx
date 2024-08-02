import React, { useState } from 'react'
import { Text, StyleSheet , TextInput, View, useWindowDimensions , TouchableWithoutFeedback, Keyboard} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/CustomComponents/NavBar";
import Neumorphism from "@/components/CustomComponents/Neumorphism";
import ButtonCustom from "@/components/CustomComponents/ButtonCustom";
import Dropdown, { IDropdown } from '@/components/CustomComponents/Dropdown';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface IForm {
  Data : any // passer un object 
}

export default function Form({ Data } : IForm) {

  const navigation = useNavigation<ScreenNavigationProp>();
  const [Title,setTitle] = useState('')
  const [TextContent,setText] = useState('')
  const [Criticity,setCriticity] = useState<IDropdown['Criticity']>()
  const {width, height} = useWindowDimensions();

  const Callback = (data : Parameters<IDropdown['Callback']>[0] ) => {
    setCriticity(data)
  }

  const submit = () =>{
    if(Title !== '' && TextContent !== ''){
      // stocker la note.
      navigation.navigate('Home')
    }
  }

  console.log(Criticity)
  const date = new Date().toLocaleDateString('us')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <NavBar Page="Form"/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Neumorphism TypeChildren='Main'>
              <View style={Styles.Main}>
                <Neumorphism TypeChildren='ButtonPrimary'>
                  <TextInput 
                    style={Styles.Title}
                    onChangeText={Title => setTitle(Title)}
                    placeholder='Title...'
                    value={Title}
                    placeholderTextColor={Colors.White}
                  />
                </Neumorphism>
                <View style={Styles.BelowContainer}> 
                  <Neumorphism TypeChildren='ButtonPrimary'>
                    <Text style={Styles.DateStyle}>{date}</Text>
                  </Neumorphism>
                  <Dropdown Callback={Callback}/>
                </View>
                <TextInput 
                  placeholderTextColor={Colors.White}
                  textAlign='left'
                  textAlignVertical='top'
                  style={Styles.TextArea}
                  onChangeText={TextContent => setText(TextContent)}
                  placeholder='Write your content...'
                  value={TextContent}
                  multiline = {true}
                  enablesReturnKeyAutomatically = {true}
                
                />
              </View>
            </Neumorphism>
          </View>
        </TouchableWithoutFeedback>
        { 
          <Neumorphism TypeChildren='ButtonSecondary'>
            <ButtonCustom TextContent='Save the note'  ButtonContent='Text' ButtonStyle='Secondary' OnPress={submit} />
          </Neumorphism>
        }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}


const Styles = StyleSheet.create({
  container : {
    flex : 1,
    gap: 20,
    backgroundColor : Colors.DarkBlue,
  },
  Main : {
    marginVertical : 20,
    alignSelf : 'center',
    backgroundColor : Colors.BlueGreen,
    display : 'flex',
    width : '80%',
    borderBottomLeftRadius : 10,
    borderTopRightRadius : 10, 
    padding : 20
  },
  Title : {
    backgroundColor : Colors.BlueSky,
    padding : 10,
    borderRadius : 10,
    fontWeight : 'bold',
    color : Colors.White,
    fontSize : 20,
    marginBottom : 30
  },
  BelowContainer : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginBottom : 30
  },
  DateStyle : {
    backgroundColor : Colors.BlueSky,
    padding : 10, 
    color : Colors.White, 
    fontSize : 17,
    fontWeight : 'bold',
    borderRadius : 10,    
    overflow :'hidden'
  },
  TextArea : {
    width : '100%',
    height : 300,
    borderColor : Colors.BlueSky,
    borderWidth : 1,
    borderRadius : 10,
    padding : 10,
    color : Colors.White,
    flexWrap : 'wrap',
  }

})