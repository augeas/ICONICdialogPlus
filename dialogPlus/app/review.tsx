
import React, {useState} from 'react';
import { Link, useLocalSearchParams,} from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';

import { Client, useClientStore } from "../data/client";
import { Assessment, Domains, DomainKey, DomainTitles, pluralSession, Question, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
import SessionDate from '../components/SessionDate';
import DomainButtons from '../components/DomainButtons';
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
  const [domain, setDomain] = useState(Domains.Mental);
  const [reviewTs, setReviewTs] = useState('');
  const clients = useClientStore((state) => state.clients);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ts } = useLocalSearchParams<{ ts: string }>();
  const thisTs = ts ? new Date(parseInt(ts)) : null;
  const clientName = clients.find((client) => client.id == id).name;
  const assessments = useAssesmentsStore((state) => state.assessments);
  const lastAssessment = assessments[id].find((a: Assessment) => a.timeStamp == thisTs.toISOString());
  const previousAssessments = assessments[id].map(
    (a: Assessment) => a.timeStamp
  ).filter((ts) => ts != thisTs.toISOString());
  const isChecked = (i: number) => {return false;};
    
  const compareSession = reviewTs ? assessments[id].find((a: Assessment) => a.timeStamp == reviewTs) : null;

  const gotResponse = (i: number) => {
    const lastResp = lastAssessment.questions[i] ? true : false
    const compResp = compareSession ? (compareSession.questions[i] ? true : false) : false;
    return ! (lastResp || compResp);
  };

  const anyMoreHelp = Object.values(lastAssessment.questions).map(
      (q: Question) => q.moreHelp
    ).some((h) => h);
    
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
        <View style={{flexDirection: 'column', flex: 4, justifyContent: 'space-between'}}>
        
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
          <DateScore domain={domain} session={lastAssessment} ts={lastAssessment.timeStamp} label={'Just Now'}></DateScore>
          <DateScore domain={domain} session={compareSession} ts={reviewTs} label={"Previously"}></DateScore>

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
