import { IObjectStored } from '@/app/Form'
import { GetDataStored } from '@/constants/AsyncStorage'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, FlatList, Text, ListRenderItemInfo, StyleSheet } from 'react-native'
import Neumorphism from './Neumorphism'

interface INotes {
  DataStored : string[]
}

export default function Notes({DataStored} : INotes) {

  const [NotesToDisplay,setNotesToDisplay] = useState<IObjectStored[] | undefined >([])

  const getNote = async (key : string) : Promise<IObjectStored | undefined> =>{
    try{
      let Note : string | null  = await GetDataStored(key)
      if(!Note){return undefined}
      let NoteParsed : IObjectStored = JSON.parse(Note)
      return NoteParsed
    }
    catch(e){
      console.log(e)
    }
  }

  const getAllNotes = async (data: typeof DataStored): Promise<IObjectStored[] | undefined> => {
    const notes: IObjectStored[] = [];
    for (let i = 0; i < (data.length - 1); i++) {
      try {
        const note = await getNote(data[i]);
        if (!note) {
          return undefined;
        }
        notes.push(note);
      } catch (error) {
        console.error('Error retrieving note:', error);
        return undefined;
      }
    }
    return notes;
  };

  useEffect(()=>{
    const fetchData = async () => {
      try{  
        const Notes = await getAllNotes(DataStored)
        setNotesToDisplay(Notes)
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  return (  
    <View style={styles.Notes}>
      {
        <Neumorphism TypeChildren='Main'>
          <FlatList contentContainerStyle={styles.FlatList} data={NotesToDisplay} renderItem={({item} : ListRenderItemInfo<IObjectStored>) => (
            <TouchableOpacity style={styles.Note}>
              <View style={styles.TopContainer}>
                <Neumorphism TypeChildren='ButtonPrimary'>
                  <Text style={styles.Title}>{item.TitleStored}</Text>
                </Neumorphism>
                <Neumorphism TypeChildren='ButtonPrimary'>
                  <Text style={styles.DateStyle}>{item.DateStored}</Text>
                </Neumorphism>
              </View>
              <Text style={styles.Text}>{item.TextStored}</Text>
              <View style={[styles.Criticity,{backgroundColor : Colors.Red}]}></View>
            </TouchableOpacity>
          )}/>
        </Neumorphism>
      }
    </View>
  )

}

const styles = StyleSheet.create({
  Notes : {
    width : '90%',
    padding : 10,
    height : 550,
  },
  Note : {
    backgroundColor : Colors.BlueGreen,
    borderRadius : 10,
    padding : 20, 
  },
  Title : {
    backgroundColor : Colors.BlueSky,
    padding : 10,
    borderRadius : 10,
    fontWeight : 'bold',
    color : Colors.White,
    fontSize : 17,
    overflow :'hidden',
    minWidth : 100
  },
  DateStyle : {
    backgroundColor : Colors.BlueSky,
    padding : 10, 
    color : Colors.White, 
    fontSize : 17,
    fontWeight : 'bold',
    borderRadius : 10,    
    overflow :'hidden',
    minWidth : 100
  },
  TopContainer : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom : 20
  },
  FlatList : {
    display : 'flex',
    flexDirection : 'column',
    gap : 20
  },
  Text : {
    color : Colors.White,
    fontSize : 17,
    fontWeight : 'bold',
    marginBottom : 10
  },
  Criticity : {
    width : 30,
    height : 30,
    borderRadius : 50,
    alignSelf : 'flex-end'
  }
})