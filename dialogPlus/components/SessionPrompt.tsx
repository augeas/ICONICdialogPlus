
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { QuestionPrompts, QuestionIncludes } from "../data/questionPrompts";

export default function SessionPrompt({domain}) {
  console.log(QuestionPrompts[domain]);
  return (
    <View>
      <FlatList
        data={QuestionPrompts[domain]}
        renderItem={
          (prompt) => {return(
            <Text>{prompt.item}</Text>   
          )}    
        }
        horizontal={false}
      />
      <Text>It includes:</Text>
      <FlatList
        data={QuestionIncludes[domain]}
        renderItem={
          (prompt) => {return(
            <Text>{prompt.item}</Text>   
          )}    
        }
        horizontal={false}
     />
    </View>
  )
}
