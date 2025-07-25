

import { FlatList, StyleSheet, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { DomainTitles } from "../data/assessment";
import { FadingButton} from './Fading'


const DomainButtons = ({domain, isChecked, disabled, onClick}) => {
  return (
    <FlatList
      data={Object.entries(DomainTitles).map(([key, txt]) => ({key, txt}))}
      renderItem={
        (item) => {
          const checked: boolean = isChecked(item.index);
          return(
            <View style={domainStyles.domainContainer}>
              <View style={domainStyles.domainButton}>
                <FadingButton
                  value={item.item.txt}
                  faded={item.index===domain | disabled(item.index)}
                  onClick={() => {onClick(item.index)}}
                />
              </View>
              <View style={domainStyles.domainCheck}>
                {checked && <Entypo name="check" size={24} color='lime' />}
              </View>
            </View>
          )
        }
      }      
      horizontal={false}
    />
  )
}

const domainStyles = StyleSheet.create({
  domainContainer: {
      flexDirection: 'row',
      alignItems: 'left'
  },
  domainButton: {
    width: '90%',
    alignItems: 'left',
    padding: 3,
  },
  domainCheck: {
    width: '10%',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 3,
  },
});

export default DomainButtons;
