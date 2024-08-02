import { IObjectStored } from "@/app/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAllKeys() : Promise<readonly string[]>{
  let StoredKey : readonly string[] = []
  try{
    StoredKey = await AsyncStorage.getAllKeys()
  }
  catch(e){
    
  }
  return StoredKey
} 

export async function StoredData(Key : string, Value : IObjectStored) : Promise<void> {
  try {
    const ValueStringify = JSON.stringify(Value)
    await AsyncStorage.setItem(Key, ValueStringify)
  }
  catch(e){
    console.log(e)
  }
}

export async function GetDataStored(Data : string) : Promise<string | null >{
  let Item : string | null = '' ;
  try {
    Item = await AsyncStorage.getItem(Data)
  }
  catch(e){
    console.log(e)
  }
  return Item
}