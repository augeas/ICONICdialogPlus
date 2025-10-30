
import { Image, FlatList, StyleSheet, Text, View } from 'react-native';

import { QuestionPrompts, QuestionIncludes } from '../data/questionPrompts';
import { QuestionImageURI, PromptImageURI } from '../data/promptImages';

export default function SessionPrompt({domain}) {
  return (
    <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
      <View style={promptStyles.promptItem}>
        <Image source={QuestionImageURI[domain]}/>
        <View>
          <FlatList
            data={QuestionPrompts[domain]}
            renderItem={
              (prompt) => {return(
                <Text
                  style={prompt.index ? promptStyles.promptItemTxt : promptStyles.promptHeading }
                >
                  {prompt.item}
                </Text>   
              )}    
            }
            horizontal={false}
          />
          <Text style={promptStyles.promptHeading}>For Example:</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={QuestionIncludes[domain]}
          renderItem={
            (prompt) => {return(
              <View style={promptStyles.promptItem}>
                 <Image source={PromptImageURI[domain][prompt.index]}/>
                <Text style={promptStyles.promptItemTxt}>{prompt.item}</Text>
              </View>
            )}    
          }
          horizontal={false}
      />
    </View>
    </View>
  )
}

const promptStyles = StyleSheet.create({
  promptItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  promptItemTxt: {
    fontSize: 18,
    padding: 3
  },
  promptHeading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 4
  }
});
