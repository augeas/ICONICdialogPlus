
import React, {useState} from 'react';
import { useLocalSearchParams, router } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet, Text, Pressable, View } from 'react-native';
import { decode } from 'html-entities';
import Entypo from '@expo/vector-icons/Entypo';

import { Assessment, Domains, DomainKey, DomainTitles, DomainPrompts, Question, Responses, IconScale, useAssesmentsStore } from "../data/assessment";
import { RadioItem, RadioGroup } from '../components/RadioButtons'
import { FadingButton} from '../components/Fading'
import DomainButtons from '../components/DomainButtons';
import DialogModal from '../components/DialogModal'
import styles from '../components/Styles';
import Smiley from '../components/Smiley';

type responseProps = {
  code: number;
};

const ResponseText = ({code}: responseProps) => {
   return (
     <Text style={{fontSize: 16}}>{Responses[code]}</Text>  
   )
}

const scaleButtons: RadioItem[] = [
  {value: 'Happy', id: 3, label: <Smiley code={'emoticon'} size={80} colour='green' />,},
  {value: 'Not Sure', id: 2, label: <Smiley code={'emoticon-neutral'} size={80} colour='yellow' />,},
  {value: 'Unhappy', id: 1, label:  <Smiley code={'emoticon-frown'} size={80} colour='red' />,},
];

const moreHelpButtons: RadioItem[] = [
  {value: 'Yes', id: 1},
  {value: 'No', id: 2},
];

const submitPrompt = "You haven't answered all the questions.\nDo you really want to finish this session and review it?";

const NewSession = () => {
  const [domain, setDomain] = useState(Domains.Mental);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [thisAssessment, setThisAssessment] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const addAssessment = useAssesmentsStore((state) => state.addAssessment);
  
  const getScaleValue = (i: DomainKey) => {
    return (thisAssessment[i] ? thisAssessment[i].score : null);
  };  
  
  const getHelpValue = (i: DomainKey) => {
    return (thisAssessment[i] ? thisAssessment[i].moreHelp : null);
  };
  
  const completedDomains = () => {
    return Object.entries(DomainTitles).map(([key, txt]) =>
      { 
        return (getScaleValue(key) != null && getHelpValue(key) != null) ? 1 : 0
      }
    ).reduce((val, acc) => val + acc, 0);
  }
  
  const cantMove: boolean = getScaleValue(domain) != null & getHelpValue(domain) === null;
  
  const scaleClick = (i: number) => {
    setThisAssessment({...thisAssessment, [domain]: {score: i, moreHelp: getHelpValue(domain)}});
  }

  const helpClick = (i: number) => {
    setThisAssessment({...thisAssessment, [domain]: {score: getScaleValue(domain), moreHelp: i === 1}});
  }  
  
  const helpButtonValue = () => {
    help = getHelpValue(domain)
    return (help === null ? null : help ? 1 : 2)
  }

  const submitAssessment = () => {
    setModalVisible(false);
    addAssessment(id, {
      timeStamp: new Date(),
      questions: thisAssessment
    });
    router.navigate({
      pathname: './review', params: { id: id }
    });
  }  

  const isChecked = (i: number) => (thisAssessment[i] ? 
    thisAssessment[i].score != null
    && thisAssessment[i].moreHelp != null: false
  );
  
  return (
    <SafeAreaView>
      <DialogModal
        title={submitPrompt}
        submitText="Review" isVisible={modalVisible}
        dismiss={() => {setModalVisible(false)}}
        submit={submitAssessment}
      >
      </DialogModal>   
    
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <View style={{flex: 1}}>
          <DomainButtons
            domain={domain}
            isChecked={isChecked}
            disabled={(i: number)=>cantMove}
            onClick={setDomain}
          />
        </View>
      
        <View style={{flex: 4}}>
          <View style={[styles.centeredView, {width: '100%', height: '100%'}]}>
            <Text style={styles.heading}>{'How happy are you '+DomainPrompts[domain]+'?'}</Text>
     
            <RadioGroup
              data={scaleButtons}
              onSelect={scaleClick}
              selectedId={getScaleValue(domain)}
              row={false}
            />

            <Text style={{fontSize: 20}}>Do you need more help with this?{cantMove ? ' (Choose to move on.)' : null}</Text>
        
            <RadioGroup
              data={moreHelpButtons}
              onSelect={helpClick}
              selectedId={helpButtonValue(domain)}
            />
            
            <View style={styles.centeredView}>
              <FadingButton 
                value={'Review'}
                faded={cantMove || completedDomains() == 0}
                onClick={() => {
                  if (completedDomains() < 11) {
                    setModalVisible(true);
                  } else {
                    submitAssessment();
                  }
                }}
              />
            </View>             
            
           </View>

               
          </View>

      </View>        
        
     
      
    </SafeAreaView>
  ) 
}

const sessionStyles = StyleSheet.create({  
  domainButton: {
    width: '85%',
    alignItems: 'left',
    padding: 3,
  },
  domainCheck: {
    width: '15%',
    alignItems: 'left',
    'justifyContent': 'center',
    padding: 3,
  },
});

export default NewSession;
