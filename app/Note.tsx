import React from 'react'
import { Text, View, StyleSheet, Image } from "react-native";
import NavBar from '@/components/CustomComponents/NavBar';
import { Colors } from '@/constants/Colors';
import { SafeAreaView , SafeAreaProvider } from 'react-native-safe-area-context';



export default function Note() {

  return (
    <SafeAreaProvider style={Styles.Note} >
      <SafeAreaView style={Styles.Note} edges={['top', 'bottom', 'left', 'right']}>
        <NavBar Page='Note' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}


const Styles = StyleSheet.create({
  Note : {
    backgroundColor : Colors.DarkBlue,
    flex: 1,
  },
})
