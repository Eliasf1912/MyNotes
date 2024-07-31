import { Colors } from '@/constants/Colors';
import React from 'react'
import { Text, View, Image, StyleSheet, useWindowDimensions, SafeAreaView } from "react-native";
import ButtonCustom from './ButtonCustom';
import Neumorphism from './Neumorphism';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app';
import { useNavigation } from 'expo-router';


interface INavBar {
  Page : 'Index' | 'Home' | 'Note' | 'Form'
}

export default function NavBar({Page} : INavBar) {
  // Récupérer la largeur et la hauteur de l'écran afin de faire du responsive 
  const {width, height} = useWindowDimensions()
  type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={Styles.Nav}>
      {
        Page === 'Note' &&
        <Neumorphism TypeChildren='ButtonPrimary'>
          <ButtonCustom ButtonContent='Icon' Icon='home' IconSize={35} ButtonStyle='Primary' OnPress={()=>{navigation.navigate('Home')}}/>
        </Neumorphism> 
      }
      <View style={Styles.TitleAndLogo}>
        <Image source={require('../../assets/images/myNote_icon.png')} style={Styles.Image}/>
        <Text style={Styles.Text}>MyNotes</Text>
      </View>
      {
        Page === 'Note' &&
        <View style={Styles.TitleAndLogo}>
          { width > 400 && 
            <Neumorphism TypeChildren='ButtonPrimary'>
              <ButtonCustom ButtonContent='Icon' Icon='trash' IconSize={35} ButtonStyle='Primary' />
            </Neumorphism>
          }
          <Neumorphism TypeChildren='ButtonPrimary'>
            <ButtonCustom ButtonContent='Icon' Icon='pencil' IconSize={35} ButtonStyle='Primary' />
          </Neumorphism>
        </View>
      }
      {
        Page === 'Form' &&
        <View style={Styles.TitleAndLogo}>
          <Neumorphism TypeChildren='ButtonPrimary'>
            <ButtonCustom ButtonContent='Icon' Icon='trash' IconSize={35} ButtonStyle='Primary' />
          </Neumorphism>
          { width > 400 && 
            <Neumorphism TypeChildren='ButtonPrimary'>
              <ButtonCustom ButtonContent='Text' TextContent='Save' ButtonStyle='Primary' />
            </Neumorphism>
          }
        </View>
      }
      {
        width > 400 && Page === 'Home' ?
        <Neumorphism TypeChildren='ButtonPrimary'>
          <ButtonCustom TextContent='Create a note' ButtonContent='Text' ButtonStyle='Primary'/>
        </Neumorphism> 
        : null
      }
    </View>
  )
}

const Styles = StyleSheet.create({
  Nav : {
    backgroundColor : Colors.BlueSky,
    height : 70,
    display : 'flex', 
    width: '100%',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : 15,
  },
  TitleAndLogo : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : 10
  },
  Image : {
    height : 50,
    width : 50,
    objectFit : 'contain'
  },
  Text : {
    fontFamily : 'MontSerrat',
    fontWeight : 'bold',
    fontSize : 20,
    color : Colors.DarkBlue
  }
})
