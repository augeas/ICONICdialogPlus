
import React, {useState} from 'react';
import { useLocalSearchParams, router } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { decode } from 'html-entities';
import Entypo from '@expo/vector-icons/Entypo';


import { Assessment, Domains, DomainKey, DomainTitles, DomainPrompts, Question, Responses, IconScale, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import { RadioItem, RadioGroup } from '../components/RadioButtons'
import { FadingButton} from '../components/Fading'
import DomainButtons from '../components/DomainButtons';
import DomainImage from '../components/DomainImage'
import DialogModal from '../components/DialogModal'
import SessionPrompt from '../components/SessionPrompt'
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

const scaleButtons: RadioItem[] = Object.entries(Responses).map(
  ([key, val]) => {
      return {value: val, id: key, label: <Smiley code={SmileyScaleIcon[key]} size={80} colour={SmileyScaleColour[key]} />, }
  }
);

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

  const answered: boolean = getScaleValue(domain) != null;
  
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
        submitText="Review"
        cancelText="Go Back"
        isVisible={modalVisible}
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
      
        <View style={{flex: 3}}>
          <View style={[styles.centeredView, {width: '100%', height: '100%' }]}>
            <Text style={styles.heading}>{'How happy are you '+DomainPrompts[domain]+'?'}</Text>
     
            <RadioGroup
              data={scaleButtons}
              onSelect={scaleClick}
              selectedId={getScaleValue(domain)}
              row={false}
            />

            {
              answered ? <View  style={styles.centeredView}>
                <Text style={styles.heading}>Do you need more help with this?{cantMove ? ' (Choose to move on.)' : null}</Text>
        
                <RadioGroup
                  data={moreHelpButtons}
                  onSelect={helpClick}
                  selectedId={helpButtonValue(domain)}
                />
            </View> : null
          }
          
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
          
          <View style={{flex: 2}}>
            <DomainImage domain={domain}/>
            <SessionPrompt domain={domain}/>
          </View>
        
      </View>        
        
    </SafeAreaView>
  ) 
}

export default NewSession;
