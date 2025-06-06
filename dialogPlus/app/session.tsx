
import React, {useState} from 'react';
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Assessment, Domains, DomainKey, DomainTitles, DomainPrompts, Question, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import DomainButtons from '../components/DomainButtons';
import DomainImage from '../components/DomainImage'
import SessionDate from '../components/SessionDate';
import SessionPrompt from '../components/SessionPrompt'
import styles from '../components/Styles';
import Smiley from '../components/Smiley';

const Session = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const assessments = useAssesmentsStore((state) => state.assessments);
  const thisAssessment = assessments[id].find((a: Assessment) => a.timeStamp == ts);
  
  const getScaleValue = (i: DomainKey) => {
    return (thisAssessment.questions[i] ? thisAssessment.questions[i].score : null);
  };  
  
  const [domain, setDomain] = useState(Object.values(Domains).find(getScaleValue));  
  const score = getScaleValue(domain);
  
  const getHelpValue = (i: DomainKey) => {
    return (thisAssessment.questions[i] ? thisAssessment.questions[i].moreHelp : null);
  };
  return (
    <SafeAreaView>

      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <View style={{flex: 1}}>
          <DomainButtons
            domain={domain}
            isChecked={()=>false}
            disabled={(i: DomainKey) => {return getScaleValue(i) == null}}
            onClick={setDomain}
          />
        </View>
      
        <View style={{flex: 3}}>
          <View style={sessionStyles.body}>
            <SessionDate timeStamp={ts}/>
            <Text style={styles.heading}>{'How happy are you '+DomainPrompts[domain]+'?'}</Text>
            <View style={sessionStyles.response}>
              <Text style={{fontSize: 30}}>{Responses[score]}</Text>
              <Smiley code={SmileyScaleIcon[score]} size={100} colour={SmileyScaleColour[score]} />
            </View>
            <Text style={{fontSize: 30}}>I {getHelpValue(domain) ? "need" : "don't need"} more help.</Text>
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

const sessionStyles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 20    
  },
  response: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20
  },  
});

export default Session;
