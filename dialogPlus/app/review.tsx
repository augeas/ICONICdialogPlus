
import React, {useState} from 'react';
import { useLocalSearchParams,} from "expo-router";
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';

import { Client, useClientStore } from "../data/client";
import { Assessment, Domains, DomainKey, DomainTitles, pluralSession, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";
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
        <Smiley code={code} size={80} colour={colour} />
      </View>
    );
  else
    return (<View></View>);
}

function DateScore({domain, session, ts}) {
  return (session ? (session.questions[domain] ?
    <View style={{flexDirection: 'row', alignItems: 'space-between', justifyContent: 'center'}}>
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
  const clientName = clients.find((client) => client.id == id).name;
  const assessments = useAssesmentsStore((state) => state.assessments); 

  const isChecked = (i: number) => {return false;};
  
  clientAssessments = assessments[id] ? assessments[id].map(
    (a: Assessment) => a.timeStamp
  ) : [];

  const lastAssessment = clientAssessments.slice(-1)[0];
  const previousAssessments = clientAssessments.slice(0, -1);
  
  const lastSession = assessments[id].find((a: Assessment) => a.timeStamp == lastAssessment);
  const compareSession = reviewTs ? assessments[id].find((a: Assessment) => a.timeStamp == reviewTs) : null;

  const gotResponse = (i: number) => {
    const lastResp = lastSession.questions[i] ? true : false;
    const compResp = compareSession ? (compareSession.questions[i] ? true : false) : false;
    console.log(lastResp);
    console.log(compResp);
    return ! (lastResp || compResp);
  };
    
  return (
    <View>
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
          <Text style={reviewStyles.DomainTitle}>{DomainTitles[domain]}</Text>
          <DateScore domain={domain} session={lastSession} ts={lastAssessment}></DateScore>
          <DateScore domain={domain} session={compareSession} ts={reviewTs}></DateScore>
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
