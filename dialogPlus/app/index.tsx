import React, {  useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, Pressable, View} from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Client, useClientStore } from "../data/client";
import { useAssesmentsStore, assessmentsToCSV, DomainImageURI } from "../data/assessment";
import { QuestionImageURI, PromptImageURI } from '../data/promptImages';
import NewClientModal, {DeleteClientModal} from '../components/NewClientModal';
import styles from '../components/Styles';

const flattenURIRecords = (records) => Object.values(records).reduce((acc, curr) => acc.concat(curr));

const App = () => {
  const [imgsPreloaded, setImgsPreloaded] = useState(false);
  const [fontsLoaded] = useFonts(MaterialCommunityIcons.font);
  const [newClientModalVisible, setClientModalVisible] = useState(false);
  const [deletingClientID, setDeletingClientID] = useState(null);
  const clients = useClientStore((state) => state.clients);
  const assessments = useAssesmentsStore((state) => state.assessments);
  const clientsHydrated = useClientStore(state => state._hasHydrated);
    
  const dismissModal = () => setClientModalVisible(false);

  const allTheImages = flattenURIRecords(
    DomainImageURI
  ).concat(
    flattenURIRecords(PromptImageURI)
  ).concat(Object.values(QuestionImageURI)).map(
    (img) => img.uri
  );  
  
  useEffect(() => {
    if (! imgsPreloaded) {
      Promise.all(allTheImages.map(Image.prefetch)).then((results) => {
        // All the results are resolving to undefined, even when prefetch succeeds?!
        setImgsPreloaded(true);
        console.log('images preloaded');
      }).catch(() => console.log('images NOT preloaded'));
    }
  }, [imgsPreloaded]);  
  
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
 
  if (!fontsLoaded) return (null);
 
  return  (
    <View style={styles.centeredView}>
      <View>
        <Text style={styles.heading}>
        {
            clientsHydrated ? (clients.length ? 'Service Users' : '(No Service Users)')
            : '(Waiting for Service Users...)'
        }
        </Text>
        <FlatList
          style={{alignSelf: 'flex-start'}}
          data={clients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
        />
        <View style={clientStyles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {setClientModalVisible(true)}}
          >
            <Text style={styles.buttonText}>New Service User</Text>
          </Pressable>
        </View>
        <View style={clientStyles.buttonContainer}>
          <Link
            style={[styles.button, styles.buttonOpen]}
            href={
              'data:text/plain,'+encodeURIComponent(
                assessmentsToCSV(
                  clients.map((cl)=>{return {client: cl.name, assessments: assessments[cl.id]}})
                )
              )
            }
            download='all_service_user_sessions.csv'
            target='_blank' 
          >
            <Text style={styles.buttonText}>Export All Sessions</Text>
          </Link>
        </View>
        <View>
          { ! imgsPreloaded && <Text>(preloading images...)</Text> }
        </View>
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
  buttonContainer: {
    padding: 10
  },
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
