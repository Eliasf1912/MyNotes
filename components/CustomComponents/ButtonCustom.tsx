import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Text, Pressable, StyleSheet, GestureResponderEvent} from "react-native";


interface IButtonCustom {
  ButtonContent : 'Icon' | 'Text',
  ButtonStyle : 'Primary' | 'Secondary',
  TextContent ?: string,
  Icon ?: keyof typeof FontAwesome.glyphMap, 
  IconSize ?: number,
  OnPress ?: (event: GestureResponderEvent) => void
}

const Styles = StyleSheet.create({
  ButtonBase : {
    paddingHorizontal : 10,
    paddingVertical : 10, 
    borderRadius : 10,
    width : 'auto'
  },
  TextBase : {
    fontFamily : 'MontSerrat',
    fontWeight : 'bold',
    fontSize : 20
  },
  ButtonPrimary : {
    backgroundColor : Colors.BlueSky
  },
  TextPrimary : {
    color : Colors.DarkBlue
  },
  ButtonSecondary : {
    backgroundColor : Colors.DarkBlue
  },
  TextSecondary : {
    color : Colors.BlueSky
  }
})

 

export default function ButtonCustom({ButtonContent,IconSize,ButtonStyle,Icon,TextContent,OnPress}: IButtonCustom) {
  let TextStyle; 
  let ButtonCSS;
  switch(ButtonStyle){
    case 'Primary':
      ButtonCSS = StyleSheet.compose(Styles.ButtonBase,Styles.ButtonPrimary)
      TextStyle = StyleSheet.compose(Styles.TextBase,Styles.TextPrimary)
    break;
    case 'Secondary':
      ButtonCSS = StyleSheet.compose(Styles.ButtonBase,Styles.ButtonSecondary)
      TextStyle = StyleSheet.compose(Styles.TextBase,Styles.TextSecondary)
    break;
  }

  return (
    <Pressable style={ButtonCSS} onPress={OnPress}>
      { ButtonContent === 'Text' ? <Text style={TextStyle}>{TextContent}</Text> : <FontAwesome name={Icon} size={IconSize} color={'#FFFF'} />}
    </Pressable>
  )
}
