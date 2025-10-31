
import React, {useState} from 'react';
import { useLocalSearchParams, router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Assessment, Domains, DomainKey, DomainTitles, DomainPrompts, pluralItems, Question, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import { Tab, TabGroup } from '../components/Tabs';
import DomainButtons from '../components/DomainButtons';
import DomainImage from '../components/DomainImage'
import SessionDate from '../components/SessionDate';
import SessionPrompt from '../components/SessionPrompt'
import styles from '../components/Styles';
import Smiley from '../components/Smiley';

const Session = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const assessments = useAssesmentsStore((state) => state.assessments);
  const thisAssessment = assessments[id].find((a: Assessment) => a.timeStamp == thisTs.toISOString());
  
  const getScaleValue = (i: DomainKey) => {
    return (thisAssessment.questions[i] ? thisAssessment.questions[i].score : null);
  };  
  
  const [domain, setDomain] = useState(Object.values(Domains).find(getScaleValue));  
  const score = getScaleValue(domain);
  
  const getHelpValue = (i: DomainKey) => {
    return (thisAssessment.questions[i] ? thisAssessment.questions[i].moreHelp : null);
  };
  return (
    <View>

      <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <View style={{flex: 1}}>
          <DomainButtons
            domain={domain}
            isChecked={()=>false}
            disabled={(i: DomainKey) => {return getScaleValue(i) == null}}
            onClick={setDomain}
          />
        </View>
      
      <View style={{flex: 3}}>
      <TabGroup>
        <Tab label={'how you answered'}>
        
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{flex: 1}}>
                <DomainImage domain={domain}/>
              </View>
            < View style={{flex: 2}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.heading}>{'How happy are you '+DomainPrompts[domain]+'?'}</Text>
                
                  <View style={sessionStyles.response}>
                    <SessionDate timeStamp={thisTs}/>
                    <Smiley code={SmileyScaleIcon[score]} size={100} colour={SmileyScaleColour[score]} />
                    <Text style={{fontSize: 30}}>{Responses[score]}</Text>
                </View>
                
                <Text style={{fontSize: 30}}>I {getHelpValue(domain) ? "need" : "don't need"} more help.</Text>
                <Text style={{fontSize: 30}}>{pluralItems(thisAssessment.questions[domain], domain)}</Text>
                
                <FlatList
                    data={thisAssessment.questions[domain].actionItems}
                    renderItem={
                      (item) => {return (
                        <Text style={{fontSize: 30}}>{item.item}</Text>
                      )}
                  }
                />     
                
                </View>
              </View>
            </View>
            
          </Tab>
          <Tab label={'more about this'}>
              <SessionPrompt domain={domain}/>

          </Tab>
        </TabGroup>
        </View>
        
      </View>        
        
    </View>
  ) 
}

const sessionStyles = StyleSheet.create({
  body: {
    flex: 1,
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
