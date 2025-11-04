
import React, {useState} from 'react';
import { Link, useLocalSearchParams,} from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import DomainButtons from '../components/DomainButtons';
import { Client, useClientStore } from '../data/client';
import { Steps, StepNames, StepPrompts } from '../data/discuss';
import StepImages  from '../components/DiscussStepImage';
import { Assessment, Domains, DomainKey, DomainTitles, questionItemCount, pluralItems, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import { Tab, TabGroup } from '../components/Tabs';
import { RadioItem, RadioGroup } from '../components/RadioButtons';
import ActionItemModal, {DeleteItemModal} from '../components/ActionItemModal';
import DomainImage from '../components/DomainImage'
import SessionPrompt from '../components/SessionPrompt'
import Smiley from '../components/Smiley';
import styles from '../components/Styles';

function Actions({assess, domain, onDelete, onCreate}) {
    return (
      <View>
       <Text style={discussStyles.itemCountText}>{pluralItems(assess.questions[domain], domain)}</Text>
      <FlatList
          data={assess.questions[domain].actionItems}
          renderItem={
            (item) => {return (
              <View style={discussStyles.itemContainer}>
                <Text style={discussStyles.itemText}>{item.item}</Text>
                <Pressable onPress={()=>onDelete(item.index)}>
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
          onPress={onCreate}
        >
          <Text style={styles.buttonText}>New Action Item</Text>
        </Pressable>        
    </View>
  )
}

const stageButtons: RadioItem[] = Object.entries(StepNames).map(
  ([key, val]) => {
      return {value: 'Step '+key+': '+val, id: key }
  }
);

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
  const [step, setStep] = useState(Steps.Understanding);
  const [newItemModalVisible, setNewItemModalVisible] = useState(false);
  const [itemIndex, setItemIndex] = useState();
  const [deleteItemModalVisible, setDeleteItemModalVisible] = useState(false);

  const getScaleValue = (i: DomainKey) => {
    return (lastAssessment.questions[i] ? lastAssessment.questions[i].score : null);
  };  
  
    const disabledDomains = (i: DomainKey) => {
       return i == domain | (lastAssessment.questions[i] ? !lastAssessment.questions[i].moreHelp : true);
    };  
    
  const score = getScaleValue(domain);    

  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>  

         <ActionItemModal
              isVisible={newItemModalVisible}
              dismiss={() => setNewItemModalVisible(false)}
              clientID={id}
              assessmentID={assessID}
              domain={domain}
            />   
            
          <DeleteItemModal
              isVisible={deleteItemModalVisible}
              dismiss={() => setDeleteItemModalVisible(false)}
              clientID={id}
              assessmentID={assessID}
              domain={domain}
              index={itemIndex}
            /> 
    
    <View style={{flex: 1}}>
        <DomainButtons
          domain={domain}
          isChecked={(i: number) => {return (
            lastAssessment.questions[i] ? questionItemCount(lastAssessment.questions[i]) > 0 : false
          )}}
          disabled={disabledDomains}
          onClick={setDomain}
        />
      </View>
      
      <View style={{flex: 3}}>
        <TabGroup>
          <Tab label={'Discuss'}>
            <View style={{flex: 3,  flexDirection: 'column'}}>
            ` <View>
                  <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Text style={discussStyles.scoreText}>{DomainTitles[domain]}</Text>
                    </View>
                    <View >
                      <Smiley code={SmileyScaleIcon[score]} size={100} colour={SmileyScaleColour[score]} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                      <Text style={discussStyles.scoreText}>{Responses[score]}</Text>
                    </View>
                  </View>
              </View>
              <View style={{flex: 3,  flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <DomainImage domain={domain}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'stretch'}}>
                  <RadioGroup
                    data={stageButtons}
                    onSelect={(i: number)=>{setStep(i)}}
                    selectedId={step}
                    row={false}
                  />
                </View>
                <View style={{flex: 1,  flexDirection: 'column'}}>{
                    step==Steps.Actions ? <Actions
                      assess={lastAssessment}
                      domain={domain}
                      onDelete={(i: number)=>{setItemIndex(i); setDeleteItemModalVisible(true);}}
                      onCreate={()=>setNewItemModalVisible(true)}
                    /> : <StepImages step={step} />
                }
                </View>
              </View>
            </View>
          </Tab>
          <Tab label={'More About This'}>
            <SessionPrompt domain={domain}/>
          </Tab>
        </TabGroup>
        
        <View style={styles.centeredView}>
            <Link
              href = {{pathname: '/client', params: { id: id }}}
              style = {[styles.centeredView, styles.button, styles.buttonOpen, styles.buttonText]}
            >
              <Text>Finish</Text>
            </Link>
      </View>   
        
      </View>

      
    </View>
      
  )
}

const discussStyles = StyleSheet.create({
    promptText: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
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
    marginVertical: 10,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: 'lightgrey'  
  },
  scoreText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    padding: 10,
    marginHorizontal: 10
  },
});

export default Discuss;

