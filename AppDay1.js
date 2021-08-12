import { FontAwesome, AntDesign  } from '@expo/vector-icons'; 
import React, { useState } from 'react';
import {Platform,Modal, FlatList, View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Btn from "./components/c1"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function App() {
  const [Item, setItem] = useState({content:"", done:false});
  const [ItemList, setItemList] = useState([]);
  const [Filter, setFilter] = useState("all");

const  viewList=React.useMemo(() => {
    switch (Filter) {
      case "all":
        return ItemList;
        case "active":
          return ItemList.filter(i => i.done==false);
        case "done":
          return ItemList.filter(i => i.done);

    }
  }, [Item,ItemList,Filter])
          
  return (
    <View style={styles.container}>
        <Text 
          style={{
            marginTop:100,
            color:"coral",
            fontSize:48,
            fontWeight:"bold",
            
          }}
        >BABY SHARK</Text>
        <Text 
          style={{
                        color:"white",
            fontSize:22,
            fontWeight:"bold",
            marginBottom:40
          }}
        >TODO-App</Text>
        <View style={{flexDirection:"row", margin:20}}>
            <TextInput placeholder="Add a To-Do"
              onChangeText={(text)=> setItem({...Item, content:text})}
              value={Item.content}
              style={{
                backgroundColor:"white",
                padding:10,
                borderRadius:25,
                width:300,
                marginRight:10
              }}
            />

            <TouchableOpacity         
              onPress={() => {
              if(Item.content)
              setItemList ([...ItemList, Item])
              setItem({...Item, content:""})
              }
              }
            ><AntDesign name="pluscircle" size={40} color="coral" /></TouchableOpacity>
        </View>
        
        <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={()=>{setFilter("all")
                console.log(Filter)}}><Btn text="ALL" color={Filter=="all"?"coral":"white"} ></Btn></TouchableOpacity>
              <TouchableOpacity onPress={()=>setFilter("active")}><Btn text="ACTIVE" color={Filter=="active"?"coral":"white"} ></Btn></TouchableOpacity>
              <TouchableOpacity onPress={()=>setFilter("done")}><Btn text="DONE" color={Filter=="done"?"coral":"white"} ></Btn></TouchableOpacity>
              
        </View>

      <FlatList 
        data={viewList}
        renderItem={(item)=> 
        <TouchableOpacity onPress={()=> 
          {
          viewList[item.index].done=!viewList[item.index].done
          setItemList([...ItemList])
          console.log(item.item.done)
          }
        }
        
        style={{width:350, marginVertical:10}}>
        <Text style={[item.item.done?{color:"orange", textDecorationLine: 'line-through'}:{color:"white"}]}><AntDesign style={{marginRight:15 }} name="checkcircleo"  size={24} color="white"/>{item.item.content}</Text>
        </TouchableOpacity>}
      />
      
    </View>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
});
<KeyboardAwareScrollView><Text>sdd</Text></KeyboardAwareScrollView>