
import React, {useState} from 'react';
import { useLocalSearchParams,} from "expo-router";
import { FlatList, Link, StyleSheet, Text, Pressable, View } from 'react-native';

import DomainButtons from '../components/DomainButtons';
import { Assessment, Domains, DomainKey, DomainTitles, pluralSession, Responses, SmileyScaleIcon, SmileyScaleColour, useAssesmentsStore } from "../data/assessment";

function Discuss() {
    const [domain, setDomain] = useState(Domains.Mental);
    
  return (
    <View>  
      <View>
        <DomainButtons
          domain={domain}
          isChecked={(i: number) => false}
          disabled={(i: number) => false}
          onClick={setDomain}
        />
      </View>
      <View>
      </View>
    </View>
      
  )
}

export default Discuss;
