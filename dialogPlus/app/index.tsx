import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Client, useClientStore } from "../data/client";
import NewClientModal, {DeleteClientModal} from '../components/NewClientModal';
import styles from '../components/Styles';

import { decode } from 'html-entities';

const App = () => {
  const [newClientModalVisible, setClientModalVisible] = useState(false);
  const [deletingClientID, setDeletingClientID] = useState(null);
  const clients = useClientStore((state) => state.clients);
  
  const dismissModal = () => setClientModalVisible(false);

 const renderClient = ({item}: {item: Client}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Link asChild
          style={clientStyles.clientView}
          href={{
            pathname: '/client',
            params: { id: item.id }
          }}
      >
        <Pressable>
          <Text style={clientStyles.clientText}>{item.name}</Text>
        </Pressable>
      </Link>
      <Pressable onPress={() => {setDeletingClientID(item.id)}}>
        <View style={[styles.button, clientStyles.deleteButton]}>
          <MaterialCommunityIcons name={'trash-can-outline'} size={24} color={'black'} />
        </View>
      </Pressable>
    </View>
  );   
 } 
  
  return (
    <View style={styles.centeredView}>
      <View>
        <Text style={styles.heading}>{clients.length ? 'Service Users' : '(No Service Users)'}</Text>
        <FlatList
          style={{alignSelf: 'flex-start'}}
          data={clients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
        />
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {setClientModalVisible(true)}}
        >
          <Text style={styles.buttonText}>New Service User</Text>
        </Pressable>        
      </View>
          
      <NewClientModal isVisible={newClientModalVisible} dismiss={dismissModal}>   
      </NewClientModal>
      
      <DeleteClientModal
        isVisible={deletingClientID != null}
        dismiss={()=>{setDeletingClientID(null)}}
        clientId={deletingClientID}

      >
      </DeleteClientModal>
      

    </View>
  );
};

const clientStyles = StyleSheet.create({

  clientView: {
    flex: 1,
    padding: 5,    
  },
  clientText: {
    flex: 1,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'lightgrey'  
  },
});


export default App;
