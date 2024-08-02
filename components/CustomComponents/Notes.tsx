import { IObjectStored } from '@/app/Form'
import { GetDataStored } from '@/constants/AsyncStorage'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, FlatList, Text, ListRenderItemInfo, StyleSheet } from 'react-native'

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
        <FlatList data={NotesToDisplay} renderItem={({item} : ListRenderItemInfo<IObjectStored>) => (
          <TouchableOpacity>
            <View>
              <Text>{item.TitleStored}</Text>
              <Text>{item.DateStored}</Text>
            </View>
            
            <View></View>
          </TouchableOpacity>
        )}/>
      }
    </View>
  )

}

const styles = StyleSheet.create({
  Notes : {
    width : '80%',
    padding : 10,
  },
})