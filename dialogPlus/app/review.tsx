
import React, {useState} from 'react';
import { Link, useLocalSearchParams  } from "expo-router";
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';

import { Assessment, Domains, DomainTitles, Question, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import Orientated from '../components/Orientated';
import { Tab, TabGroup } from '../components/Tabs';
import SessionDate from '../components/SessionDate';
import ActionItemsList from  '../components/ActionItems';
import DomainButtons from '../components/DomainButtons';
import DomainImage from '../components/DomainImage'
import SessionPrompt from '../components/SessionPrompt'
import Smiley from '../components/Smiley';
import styles from '../components/Styles';

function DateScore({domain, session, ts, label}) {
  const score = session ? (session.questions[domain] ? session.questions[domain].score : null) : null;
  const code = score ? SmileyScaleIcon[score] : null;
  const colour = score ? SmileyScaleColour[score] : null;
  return (session ? (session.questions[domain] ?
    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Text style={reviewStyles.scoreText}>{label}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <SessionDate timeStamp={ts}/>
        <Smiley code={code} size={60} colour={colour} />
      </View>
      <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={reviewStyles.scoreText}>{Responses[score]}</Text>
      </View>
    </View>
    : <View></View>) : <View></View>
  );
}

function DateItems({assessment, domain}) {
  return (
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 10}}>
      <SessionDate timeStamp={assessment.timeStamp}/>
      <ActionItemsList assessment={assessment} domain={domain} />
    </View>
  );
  
}

function PrevSessSelector({prev, ts, onClick}) {
  return (prev.length ? 
    <View>
      <Text style={reviewStyles.scoreText}>Choose a previous session to compare:</Text>
        <FlatList
          data={prev}
          horizontal={true}
          renderItem={
            ({item}) => <View
              style={item === ts ? reviewStyles.selectedDateContainer : reviewStyles.dateContainer}
            >
              <SessionDate timeStamp={item} onPress={()=>{onClick(item)}}/>
            </View>
          }
         />
    </View>
   :  <View><Text style={reviewStyles.scoreText}>(No previous sessions to compare.)</Text></View>
  );
}

const Review = () => {
  const [domain, setDomain] = useState(Domains.Mental);
  const [reviewTs, setReviewTs] = useState('');
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const assessments = useAssesmentsStore((state) => state.assessments);
  const lastAssessment = assessments[id].find((a: Assessment) => a.timeStamp === thisTs.toISOString());
  const previousAssessments = assessments[id].map(
    (a: Assessment) => a.timeStamp
  ).filter((ts) => ts !== thisTs.toISOString());
  const isChecked = (i: number) => {return false;};
    
  const compareSession = reviewTs ? assessments[id].find((a: Assessment) => a.timeStamp === reviewTs) : null;

  const gotResponse = (i: number) => {
    const lastResp = lastAssessment ? (lastAssessment.questions[i] ? true : false) : false;
    const compResp = compareSession ? (compareSession.questions[i] ? true : false) : false;
    return ! (lastResp || compResp);
  };

  const anyMoreHelp = lastAssessment ? Object.values(lastAssessment.questions).map(
      (q: Question) => q.moreHelp
    ).some((h) => h) : false;

  return (
    <View style={{flex: 1}}><ScrollView>
     
      <View style={{flexDirection: 'row'}}>
        <Orientated hStyle={{flex: 1}} vStyle={{flex: 2}}>
          <DomainButtons
              domain={domain}
              isChecked={isChecked}
              disabled={gotResponse}
              onClick={setDomain}
          />
        </Orientated>
                
        <View style={{flexDirection: 'column', flex: 3, justifyContent: 'space-between'}}>
        <TabGroup>
        
        <Tab label={'how you answered'}><View>
        
              <Orientated hStyle={reviewStyles.horizTab} vStyle={reviewStyles.vertTab}>
              
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <DomainImage domain={domain}/>
              </View>
            
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: 10}}>

         <PrevSessSelector prev={previousAssessments} ts={reviewTs} onClick={(item)=>setReviewTs(item)} />
 
          <Text style={reviewStyles.DomainTitle}>{DomainTitles[domain]}</Text>
      
          <View style={{flex: 1, alignItems: 'stretch'}}>
            <DateScore domain={domain} session={lastAssessment} ts={lastAssessment ? lastAssessment.timeStamp : null} label={'Just Now'}></DateScore>
            <DateScore domain={domain} session={compareSession} ts={reviewTs} label={"Previously"}></DateScore>
          </View>
          
          </View> 
          
          </Orientated>

        </View></Tab>
        
         <Tab label={'action items'}>
            <View  style={{flex: 2, flexDirection: 'column', alignItems: 'center', padding: 10}}>
              <PrevSessSelector prev={previousAssessments} ts={reviewTs} onClick={(item)=>setReviewTs(item)} />
              <Text style={reviewStyles.DomainTitle}>{DomainTitles[domain]}</Text>
              
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', padding: 10}}>
                <DateItems assessment={lastAssessment} domain={domain} />              
                { compareSession ? <DateItems assessment={compareSession} domain={domain} /> : <View></View>}
              </View>
              
            </View>
         </Tab>
        
        <Tab label={'more about this'}>
            <SessionPrompt domain={domain}/>
        </Tab>
      
      </TabGroup>

      <View style={styles.centeredView}>
      {anyMoreHelp ?

             <Link
              href = {{pathname: '/discuss', params: { id: id, ts: ts }}}
              style = {[styles.button, styles.buttonOpen, styles.buttonText]}>
              Discuss
            </Link>
            : <Link
              href = {{pathname: '/client', params: { id: id }}}
              style = {[styles.button, styles.buttonOpen, styles.buttonText]}>
              Finish
            </Link>
          }      
        </View>
      
      </View>
      
      </View>
    
    </ScrollView></View>
  )    
}

const reviewStyles = StyleSheet.create({
  dateContainer: {
    borderWidth: 0,
  },
  selectedDateContainer: {
    borderColor: "#00AAFF",
    borderWidth: 4,
  },
  DomainTitle: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  horizTab: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  vertTab: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-aroun',
    padding: 10
  }  
});

export default Review;
