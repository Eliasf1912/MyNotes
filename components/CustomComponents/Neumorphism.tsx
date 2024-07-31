import { Colors } from '@/constants/Colors';
import React from 'react'
import { View } from 'react-native'

interface INeumorphism {
  TypeChildren : 'ButtonPrimary' | 'ButtonSecondary' | 'CritcityHigh' | 'CritcityNormal' | 'CritcityNote' | 'Main',
  children : React.ReactNode
}


export default function Neumorphism({TypeChildren,children}: INeumorphism) {

  // On a adapte les couleurs en fonction du type d'enfant que le composant aura 
  let TopShadowColor : string;
  let BottomShadowColor : string;

  switch(TypeChildren){
    case 'ButtonPrimary' :
      TopShadowColor = Colors.ShadowPrimaryTop
      BottomShadowColor = Colors.ShadowPrimaryBottom
    break;
    case 'ButtonSecondary' : 
      TopShadowColor = Colors.ShadowSecondaryTop
      BottomShadowColor = Colors.ShadowSecondaryBottom
    break;
    case 'CritcityHigh' : 
      TopShadowColor = Colors.ShadowHighTop
      BottomShadowColor = Colors.ShadowHighBottom
    break;
    case 'CritcityNormal' : 
      TopShadowColor = Colors.ShadowNormalTop
      BottomShadowColor = Colors.ShadowNormalBottom
    break;
    case 'CritcityNote' : 
      TopShadowColor = Colors.ShadowNormalTop
      BottomShadowColor = Colors.ShadowNormalBottom
    break;
    case 'Main' : 
      TopShadowColor = Colors.ShadowMainTop
      BottomShadowColor = Colors.ShadowMainBottom
    break;
  }


  return (
    <View style={{
        borderRadius : 10,
        shadowOffset : {
          width : -2,
          height : -2
        },
        shadowColor : TopShadowColor,
        shadowOpacity : 90,
        shadowRadius : 2
      }}>
      <View style={{
        borderRadius : 10,
        shadowOffset : {
          width : 2,
          height : 2
        },
        shadowColor : BottomShadowColor,
        shadowOpacity : 90,
        shadowRadius : 2
      }}>
        {children}
      </View>
    </View>
  )
}
