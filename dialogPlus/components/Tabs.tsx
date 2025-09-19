
import React, {useState} from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type tabProps = {
    label: string,
    children: React.ReactNode
};

export function Tab({label, children}: tabProps) {
    return (
      <View>{children}</View>  
    );
}

export function TabGroup({children}) {
    const [index, setIndex] = useState(0);
    return (
      <View>
        <FlatList
            data={children.map((child)=>child.props.label)}
            horizontal={true}
            renderItem={
                (tab) => {
                    const selected = tab.index == index;
                    const thisTabStyle = selected ? tabStyles.selectedTab : tabStyles.unselectedTab;
                    const thisTextStyle = selected ? tabStyles.selectedText : tabStyles.unselectedText;
                    return (
                        <View style={[tabStyles.tab, thisTabStyle]}>
                            <Pressable
                                onPress={()=>(setIndex(tab.index))}
                            >
                                <Text style={[tabStyles.tabText, thisTextStyle]}>{tab.item}</Text>
                            </Pressable>
                        </View>
                    )
                }
            }
        />
        {children[index]}
     </View>
    );
}

const tabStyles = StyleSheet.create({
    tab: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,        
        borderColour: 'black',
        padding: 10
    },
    selectedTab: {
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3, 
        borderBottomWidth: 0,
    },
    unselectedTab: {
        borderBottomWidth: 2
    },
    tabText : {
        fontSize: 24
    },
    selectedText: {
        color: 'black',
        fontWeight: 'bold'
    },
    unselectedText: {
        color: 'gray'
    }
});
