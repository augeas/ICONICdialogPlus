
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { pluralItems } from "../data/assessment";

function ActionItemsList({assessment, domain}) {
    const actionItems = assessment ? ( 
        assessment.questions[domain] ? assessment.questions[domain].actionItems : null
    ) : null;
    return (
        <View>
            { actionItems ?
                <View>
                    <Text style={{fontSize: 30}}>{pluralItems(assessment.questions[domain], domain)}</Text>
                    <FlatList
                        data={actionItems}
                        renderItem={
                            (item) => {return (
                                <Text style={{fontSize: 30}}>{item.item}</Text>
                            )}
                        }
                />
            </View> : <Text style={{fontSize: 30}}>No action items.</Text> }            
        </View>
    )
}

export default ActionItemsList;
