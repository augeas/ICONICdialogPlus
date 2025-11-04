

import {  View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type smileyProps = {
  code: string;
  size: number;
  color: string;
};

function Smiley({ code, size, colour}: smileyProps ) {
    const bgSize = Math.floor(size / 2);
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 10}}>
          <View style={{width: bgSize, height: bgSize, backgroundColor: 'black'}}/>
          <View style={{position:'absolute'}}>
            <MaterialCommunityIcons name={code} size={size} color={colour} />
          </View>
        </View>
    )
}

export default Smiley;
