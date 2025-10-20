
import React, {useState} from 'react';
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';

import { Client, useClientStore } from "../data/client";
import { Assessment, Domains, DomainKey, DomainTitles, pluralSession, Question, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import { Tab, TabGroup } from '../components/Tabs';
import SessionDate from '../components/SessionDate';
import DomainButtons from '../components/DomainButtons';
import DomainImage from '../components/DomainImage'
import SessionPrompt from '../components/SessionPrompt'
import Smiley from '../components/Smiley';
import styles from '../components/Styles';

function Score({assess, domain}) {
  const score = assess.questions[domain] ? assess.questions[domain].score : null;
  const code = score ? SmileyScaleIcon[score] : null;
  const colour = score ? SmileyScaleColour[score] : null;
  if (code)
    return (
      <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={reviewStyles.scoreText}>{Responses[score]}</Text>
        <Smiley code={code} size={60} colour={colour} />
      </View>
    );
  else
    return (<View></View>);
}

function DateScore({domain, session, ts, label}) {
  return (session ? (session.questions[domain] ?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={reviewStyles.scoreText}>{label}</Text>
      <SessionDate timeStamp={ts}/>
      <Score assess={session} domain={domain}></Score>
    </View>
    : <View></View>) : <View></View>
  );
}

const Review = () => {
  const router = useRouter();
  const [domain, setDomain] = useState(Domains.Mental);
  const [reviewTs, setReviewTs] = useState('');
  const clients = useClientStore((state) => state.clients);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const clientName = clients.find((client) => client.id == id).name;
  const assessments = useAssesmentsStore((state) => state.assessments);
  const assessmentsHydrated = useAssesmentsStore(state => state._hasHydrated);
  const lastAssessment = assessments[id].find((a: Assessment) => a.timeStamp == thisTs.toISOString());
  const previousAssessments = assessments[id].map(
    (a: Assessment) => a.timeStamp
  ).filter((ts) => ts != thisTs.toISOString());
  const isChecked = (i: number) => {return false;};
    
  const compareSession = reviewTs ? assessments[id].find((a: Assessment) => a.timeStamp == reviewTs) : null;

  const gotResponse = (i: number) => {
    const lastResp = lastAssessment ? (lastAssessment.questions[i] ? true : false) : false;
    const compResp = compareSession ? (compareSession.questions[i] ? true : false) : false;
    return ! (lastResp || compResp);
  };

  const anyMoreHelp = lastAssessment ? Object.values(lastAssessment.questions).map(
      (q: Question) => q.moreHelp
    ).some((h) => h) : false;

  return (
    <View>
     
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <DomainButtons
              domain={domain}
              isChecked={isChecked}
              disabled={gotResponse}
              onClick={setDomain}
          />
        </View>
        
              <View style={{flex: 2, justifyContent: 'center'}}>
                <DomainImage domain={domain}/>
            </View>
        
        <View style={{flexDirection: 'column', flex: 3, justifyContent: 'space-between'}}>
        <TabGroup>
        
        <Tab label={'how you answered'}><View>
        
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
       {previousAssessments.length ?
         <FlatList
            data={previousAssessments}
            horizontal={true}
            renderItem={
              ({item}) => <View
                style={item == reviewTs ? reviewStyles.selectedDateContainer : reviewStyles.dateContainer}
              >
                <SessionDate timeStamp={item} onPress={()=>setReviewTs(item)}/>
              </View>
            }
         >
         </FlatList>
        : <Text>(No previous sessions)</Text>
       } 
      </View> 
        
          <Text style={reviewStyles.DomainTitle}>{DomainTitles[domain]}</Text>
          <DateScore domain={domain} session={lastAssessment} ts={lastAssessment ? lastAssessment.timeStamp : null} label={'Just Now'}></DateScore>
          <DateScore domain={domain} session={compareSession} ts={reviewTs} label={"Previously"}></DateScore>

          
          
        </View></Tab>
        
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

            /**
            <Pressable onPress={()=>router.replace({pathname: '/discuss', params: { id: id, ts: ts }})}>
              <Text style = {[styles.button, styles.buttonOpen, styles.buttonText]}>{'Discuss'}</Text>
            </Pressable>
            **/
            : <Link
              href = {{pathname: '/client', params: { id: id }}}
              style = {[styles.button, styles.buttonOpen, styles.buttonText]}>
              Finish
            </Link>
          }      
        </View>
      
      </View>
      
      </View>
    
    </View>
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
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  scoreText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Review;
