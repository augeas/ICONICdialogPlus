
import React  from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type FadingProps = {
  value: string;
  faded: boolean;
  onClick: () => {};
}

export const FadingButton = ({value, faded, onClick}: FadingProps) => {
  return (
      <Pressable
        style={[fadingStyles.fadingButton, faded ? fadingStyles.faded : fadingStyles.unfaded]}
        onPress={() => {if (!faded) onClick()}}
      >
        <Text style={faded ? fadingStyles.fadedText : fadingStyles.unfadedText}>{value}</Text>
      </Pressable>
  )
}

const fadingStyles = StyleSheet.create({  
  fadingButton: {
    borderRadius: 20,
    borderWidth: 0,
    borderColour: 'black',
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  unfaded: {
    backgroundColor: '#00AAFF',  
  },  
  faded: {
    backgroundColor: '#DDDDDD',  
  },
  fadedText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
  unfadedText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
});

