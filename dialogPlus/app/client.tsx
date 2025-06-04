
import React, {useState} from 'react';
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';

import { Client, useClientStore } from "../data/client";
import { pluralSessions, Assessment, useAssesmentsStore } from "../data/assessment";
import SessionDate from '../components/SessionDate';
import styles from '../components/Styles';

const ClientPage = () => {
  
  const clients = useClientStore((state) => state.clients);
  const { id } = useLocalSearchParams<{ id: string }>();
  const clientName = clients.find((client) => client.id == id).name;
  const assessments = useAssesmentsStore((state) => state.assessments);
  
  clientAssessments = assessments[id] ? assessments[id].map(
    (a: Assessment)=>a.timeStamp
  ) : [];

    
  return (
    <View style={styles.centeredView}>
      <Text style={styles.heading}>
        {pluralSessions(clientAssessments.length) + clientName}
      </Text>
      
      <FlatList
        data={clientAssessments}
        horizontal={true}
        renderItem={
         ({item}) => <Link
           href={{pathname: '/session', params: {id: id, ts: item}}}
         > 
           <SessionDate timeStamp={item}/>
          </Link>
        }
      >
      </FlatList>
      
    <Link
       href = {{
         pathname: '/newsession',
         params: { id: id }
       }}
       style = {[styles.button, styles.buttonOpen, styles.buttonText]}
    >New Session
    </Link>
    
    </View>    
  )
}


export default ClientPage;
