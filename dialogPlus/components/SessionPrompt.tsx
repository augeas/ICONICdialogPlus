
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { QuestionPrompts, QuestionIncludes } from "../data/questionPrompts";

export default function SessionPrompt({domain}) {
  return (
    <View>
      <FlatList
        data={QuestionPrompts[domain]}
        renderItem={
          (prompt) => {return(
            <Text
              style={prompt.index ? promptStyles.promptItem : promptStyles.promptHeading }
            >
              {prompt.item}
            </Text>   
          )}    
        }
        horizontal={false}
      />
      <Text style={promptStyles.promptHeading}>For Example:</Text>
      <FlatList
        data={QuestionIncludes[domain]}
        renderItem={
          (prompt) => {return(
            <Text style={promptStyles.promptItem}>{prompt.item}</Text>   
          )}    
        }
        horizontal={false}
     />
    </View>
  )
}

const promptStyles = StyleSheet.create({  
  promptItem: {
    fontSize: 18,
    padding: 3
  },
  promptHeading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 4
  }
});
