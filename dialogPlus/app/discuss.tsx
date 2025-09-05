
import React, {useState} from 'react';
import { Link, useLocalSearchParams,} from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import DomainButtons from '../components/DomainButtons';
import { Client, useClientStore } from "../data/client";
import { Assessment, Domains, DomainKey, DomainTitles, pluralItems, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import ActionItemModal, {DeleteItemModal} from '../components/ActionItemModal';
import styles from '../components/Styles';

function Discuss() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const assessID = thisTs.toISOString();
  const assessments = useAssesmentsStore((state) => state.assessments); 
  const clientAssessments = assessments[id] ? assessments[id] : [];
  const lastAssessment = assessments[id].find((a: Assessment) => a.timeStamp == assessID);
  const firstMoreHelp = Object.keys(lastAssessment.questions).find(
    (i: number) => lastAssessment.questions[i].moreHelp
  );
  
  const [domain, setDomain] = useState(firstMoreHelp);
  const [newItemModalVisible, setNewItemModalVisible] = useState(false);
  const [itemIndex, setItemIndex] = useState();
  const [deleteItemModalVisible, setDeleteItemModalVisible] = useState(false);
    
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
        
        <FlatList
          data={lastAssessment.questions[domain].actionItems}
          renderItem={
            (item) => {return (
              <View style={discussStyles.itemContainer}>
                <Text style={discussStyles.itemText}>{item.item}</Text>
                    <Pressable onPress={
                      () => {
                        setItemIndex(item.index);
                        setDeleteItemModalVisible(true);
                      }
                      
                    }>
                      <View style={[styles.button, discussStyles.deleteButton]}>
                        <MaterialCommunityIcons name={'trash-can-outline'} size={24} color={'black'} />
                      </View>
                    </Pressable>
                </View>
            )}
          }
        />
        
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {setNewItemModalVisible(true)}}
        >
          <Text style={styles.buttonText}>New Action Item</Text>
        </Pressable>

          <ActionItemModal
              isVisible={newItemModalVisible}
              dismiss={() => setNewItemModalVisible(false)}
              clientID={id}
              assessmentID={assessID}
              domain={domain}
            >   
            </ActionItemModal>

          <DeleteItemModal
              isVisible={deleteItemModalVisible}
              dismiss={() => setDeleteItemModalVisible(false)}
              clientID={id}
              assessmentID={assessID}
              domain={domain}
              index={itemIndex}
            >   
            </DeleteItemModal>
            


        </View>

            <Link
              href = {{pathname: '/client', params: { id: id }}}
              style = {[styles.button, styles.buttonOpen, styles.buttonText]}>
              Finish
            </Link>        
        
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
  itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 20,
     borderColour: 'black',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: 'lightgrey'  
  },
});

export default Discuss;

