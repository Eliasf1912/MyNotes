import React, { useState } from 'react'
import { View , StyleSheet, FlatList, Text , Pressable, GestureResponderEvent} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Neumorphism from './Neumorphism';

export interface IDropdown {
  Criticity ?: 'High' | 'Note' | 'Normal' | null | undefined,
  Callback : (data : 'High' | 'Note' | 'Normal' | null | undefined ) => void
}

export default function Dropdown({Criticity, Callback} : IDropdown) {

  const [IsDropDownOpen,setIsDropDownOpen] = useState(false)
  const [ChooseCriticity, setChooseCriticity] = Criticity === null ? useState<typeof Criticity>() : useState(Criticity)

  let CriticityColor : string = ''

  switch(ChooseCriticity){
    case 'High':
      CriticityColor = Colors.Red
    break;
    case 'Note':
      CriticityColor = Colors.White
    break;
    case 'Normal':
      CriticityColor = Colors.Salmon
    break;
    default : 
      CriticityColor = Colors.Red
    break;
  }

  let borderInput : any

  switch(IsDropDownOpen){
    case true:
      borderInput = StyleSheet.compose(styles.Input,styles.BorderOpen)
    break;
    case false:
      borderInput = StyleSheet.compose(styles.Input,styles.BorderClose)
    break;
  }

  const Toggle = () => {
    if(IsDropDownOpen){
      setIsDropDownOpen(false)
    }else{
      setIsDropDownOpen(true)
    }
  }

  const chooseCritictyColor = (choice : any) => {
    setChooseCriticity(choice)
    setIsDropDownOpen(false)
    Callback(ChooseCriticity)
  } 

  const DropdownContent = [
    {
      text : 'High',
      color : Colors.Red,
      Neuro : 'CritcityHigh'
    },
    {
      text : 'Normal',
      color : Colors.Salmon,
      Neuro : 'CritcityNormal'
    },
    {
      text : 'Note',
      color : Colors.White,
      Neuro : 'CritcityNote'
    }
  ]

  return (
    <View>
      <Neumorphism TypeChildren='ButtonPrimary'>
        <View style={borderInput} >
          <View style={{
            backgroundColor : CriticityColor,
            borderRadius : 10,
            width : 60,
            height : 20
          }}
          ></View>
          <FontAwesome  name={IsDropDownOpen === true ? 'chevron-up' : 'chevron-down'} size={20} color='white' onPress={Toggle}/>
        </View>
      </Neumorphism>
      {IsDropDownOpen === true && 
        <FlatList 
          data={DropdownContent} 
          contentContainerStyle={styles.FlatListContainer}
          renderItem={({item})=>
            <View style={styles.FlatListContent}>
              <Pressable style={styles.Button} onPress={()=>{chooseCritictyColor(item.text)}}>
                <Text style={styles.FlatListText}>{item.text}</Text>
                <View style={{
                  backgroundColor : item.color,
                  width : 20,
                  height : 20,
                  borderRadius : 50
                }}></View>
              </Pressable>
            </View>
          }
        />
      }
    </View>
  )
}


const styles = StyleSheet.create({
  Input : {
    backgroundColor : Colors.BlueSky,
    padding : 10, 
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    gap : 10
  },
  BorderClose : {
    borderRadius : 10,
  },
  BorderOpen : {
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    borderBottomLeftRadius : 0,
    borderBottomRightRadius : 0
  },
  FlatListContainer : {
    padding : 10,
    backgroundColor : Colors.BlueGreen,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius : 10,
  },
  Button : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    marginBottom : 10
  },
  FlatListContent : {
    display : 'flex',
    flexDirection : 'column',
  },
  FlatListText : {
    color : Colors.White,
    fontSize : 18 
  }
})