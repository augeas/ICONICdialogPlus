
import React, {useState} from 'react';
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useClientStore } from "../data/client";
import { pluralSessions, Assessment, useAssesmentsStore, assessmentsToCSV } from "../data/assessment";
import SessionDate from '../components/SessionDate';
import DeleteSessionModal from '../components/SessionModal';
import styles from '../components/Styles';

function CSVfname(name: string) {
  const [rawDate, rawTime] = new Date().toISOString().split('T')
  return [
    ...name.split(),
    ...rawDate.split('-'), 
    ...rawTime.split('.')[0].split(':')
  ].join('_')+'.csv';
}

function sessionTs(sess: string) {
  return new Date(sess).getTime()
}

const ClientPage = () => {
  const router = useRouter();
  const [deletingSessionID, setDeletingSessionID] = useState(null);
  const clients = useClientStore((state) => state.clients);
  const clientsHydrated = useClientStore(state => state._hasHydrated);
  const { id } = useLocalSearchParams<{ id: string }>();
  const clientName = clientsHydrated ? clients.find((client) => client.id === id).name : null;
  const assessments = useAssesmentsStore((state) => state.assessments);
  const assessmentsHydrated = useAssesmentsStore(state => state._hasHydrated);
  
  const clientAssessments = assessments[id] ? assessments[id].map(
    (a: Assessment)=>a.timeStamp
  ) : [];
  
  return (
    <View style={styles.centeredView}>
      <Text style={styles.heading}>
        {(clientsHydrated && assessmentsHydrated) ? 
          pluralSessions(clientAssessments.length) + clientName : '(Waiting for sessions...)'
        }
      </Text>
      
      <FlatList
        data={clientAssessments}
        horizontal={true}
        contentContainerStyle={sessionListStyles.sessionContainer}
        renderItem={
         ({item}) => <View style={sessionListStyles.sessionItem}>
            <SessionDate
              timeStamp={item}
              onPress={()=>{router.push({pathname: '/prevsession', params: {id: id, ts: sessionTs(item)}})}}
          />
          <Pressable onPress={() => {setDeletingSessionID(item)}}>
            <MaterialCommunityIcons name={'trash-can-outline'} size={24} color={'black'} />
          </Pressable>
        </View>
        }
      >
      </FlatList>
      
    <View style={{padding: 10}}>
      <Link push
        href = {{
          pathname: '/newsession',
         params: { id: id }
        }}
       style = {[styles.button, styles.buttonOpen, styles.buttonText]}
      >
        <Text>New Session</Text>
      </Link>
  </View>
    
    {clientAssessments.length > 0  &&  <View>
      <Link style = {[styles.button, styles.buttonOpen, styles.buttonText]}
        href={'data:text/plain,'+encodeURIComponent(assessmentsToCSV([{client: clientName, assessments: assessments[id]}]))}
        download={CSVfname(clientName)}
        target="_blank" 
      >Export Sessions</Link>
    </View> }
    
      <DeleteSessionModal
        isVisible={deletingSessionID != null}
        dismiss={()=>{setDeletingSessionID(null)}}
        clientId={id}
        sessionId={deletingSessionID}
      >   
      </DeleteSessionModal>    
    
    </View>    
  )
}

const sessionListStyles = StyleSheet.create({
  sessionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sessionItem: {
      alignItems: 'center', 
  }
});


export default ClientPage;
