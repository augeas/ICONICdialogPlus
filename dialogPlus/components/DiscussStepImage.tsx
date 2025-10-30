
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';

import { Steps, StepKey, StepPrompts } from "../data/discuss";

const StepImageURI: Record<StepKey, Object> = {
    [Steps.Understanding]: [
        require('../assets/images/steps/not_going_well.png'),
        require('../assets/images/steps/going_well.png')
    ],
    [Steps.Forward]: [
        require('../assets/images/steps/five_stars.png'),
        require('../assets/images/steps/three_stars.png')
    ],
    [Steps.Options]: [
        require('../assets/images/steps/what_can_you.png'),
        require('../assets/images/steps/what_can_i.png'),
        require('../assets/images/steps/what_can_others.png')
    ]
}

function StepImages({step}) {
    return (
        <FlatList
            data={StepImageURI[step]}
            renderItem={(url)=>{return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={url.item}/>
                    <Text style={discussStyles.promptText}>{StepPrompts[step][url.index]}</Text>
                </View>
            )}}
        />
    );
}

const discussStyles = StyleSheet.create({
    promptText: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  }
})

export default StepImages;
