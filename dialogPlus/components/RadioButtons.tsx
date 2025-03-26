
import React, {useState} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, Pressable, View } from 'react-native';

import styles from './Styles';

type radioProps = {
  value: string,
  id: number,
  selected: boolean,
  onClick: (number) => {},
  children: React.ReactNode;
};

const RadioButton = ({value, id, selected, onClick, children}: radioProps) => {
  return (
    <Pressable
      style={[radioStyles.radioButton, selected ? radioStyles.radioSelected: radioStyles.radioUnselected]}
      onPress={onClick}
    >
      <Text style={selected ? radioStyles.radioTextSelected : radioStyles.radioTextUnselected}>{value}</Text>
    </Pressable>
  )
}

export type RadioItem = {
  value: string,
  id: number,
  label?: React.ReactNode,
}

type RadioGroupProps = {
  data: RadioItem[],
  selectedId?: number;
  onSelect: (number) => void;
  row: boolean;
}

export const RadioGroup = ({data, selectedId, onSelect=(i: number) => {}, row=true}: RadioGroupProps) => {
  return (
    <FlatList
      data={data}
      renderItem={
        ({item}) =>
           <View style={radioStyles.radioGroup}>
           <RadioButton
             value={String(item.value)}
             id={item.id} selected={selectedId===item.id}
             onClick={() => onSelect(item.id)}
           >
           </RadioButton>
          {item.label}
           </View>
      }
      horizontal={row}
    >        
    </FlatList>
  )
}

const radioStyles = StyleSheet.create({
  radioGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,    
  },
  radioButton: {
    borderRadius: 20,
    borderWidth: 0,
    borderColour: 'black',
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  radioUnselected: {
    backgroundColor: '#EEEEEE',  
  },
  radioSelected: {
    backgroundColor: '#00AAFF',  
  },
  radioTextSelected: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioTextUnselected: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
