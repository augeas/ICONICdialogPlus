
import React, {useState} from 'react';
import { Link, useLocalSearchParams,} from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';

import DomainButtons from '../components/DomainButtons';
import { Client, useClientStore } from "../data/client";
import { Assessment, Domains, DomainKey, DomainTitles, pluralItems, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import ActionItemModal from '../components/ActionItemModal';
import styles from '../components/Styles';

function Discuss() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const assessments = useAssesmentsStore((state) => state.assessments); 
  const clientAssessments = assessments[id] ? assessments[id] : [];
  const lastAssessment = assessments[id].find((a: Assessment) => a.timeStamp == thisTs.toISOString());
  const firstMoreHelp = Object.keys(lastAssessment.questions).find(
    (i: number) => lastAssessment.questions[i].moreHelp
  );
  
  const [domain, setDomain] = useState(firstMoreHelp);
  const [newItemModalVisible, setNewItemModalVisible] = useState(false);
  
  const dismissModal = () => setNewItemModalVisible(false);
  
    const disabledDomains = (i: DomainKey) => {
       return i == domain | (lastAssessment.questions[i] ? !lastAssessment.questions[i].moreHelp : true);
    };  
    
    
    
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>  
      <View style={{flex: 1}}>
        <DomainButtons
          domain={domain}
          isChecked={(i: number) => false}
          disabled={disabledDomains}
          onClick={setDomain}
        />
      </View>
      
      <View View style={{flex: 2, flexDirection: 'column'}}>
        <View style={styles.centeredView}>
        <Text style={discussStyles.itemCountText}>{pluralItems(lastAssessment.questions[domain], domain)}</Text>
        
         
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {setNewItemModalVisible(true)}}
        >
          <Text style={styles.buttonText}>New Action Item</Text>
        </Pressable>

              <ActionItemModal isVisible={newItemModalVisible} dismiss={dismissModal}>   
              </ActionItemModal>
        
        </View>
        

        
      </View>
    </View>
      
  )
}

const discussStyles = StyleSheet.create({
    itemCountText: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Discuss;
