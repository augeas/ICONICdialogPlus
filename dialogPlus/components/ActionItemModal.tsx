
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { useForm, Controller } from "react-hook-form"

import { Assessment, DomainTitles, useAssesmentsStore } from "../data/assessment";
import DialogModal from './DialogModal'

type ModalProps = {
  isVisible: boolean;
  clientID: string;
  assessmentID: string;
  domain: number;
  dismiss: () => void;
  index?: number;
}

const DeleteItemModal = ({isVisible = false, clientID, assessmentID, domain,  dismiss = () => {}, index}: ModalProps) => {
  const updateAssessment = useAssesmentsStore((state) => state.updateAssessment);
  const assessments = useAssesmentsStore((state) => state.assessments);
  const thisAssessment = assessments[clientID].find((a: Assessment) => a.timeStamp == assessmentID);
  const thisQuestion = thisAssessment.questions[domain];
  const theseItems =  thisQuestion.actionItems ? thisQuestion.actionItems : [];
    
  return (
    <DialogModal
      title="Delete Action Item"
      submitText="Delete"
      isVisible={isVisible}
      dismiss={dismiss}
      submit={
        ()=>{
          updateAssessment(clientID, {
            timeStamp: thisAssessment.timeStamp,
            questions: {...thisAssessment.questions, [domain]: {
              score: thisQuestion.score,
              moreHelp: thisQuestion.moreHelp,
            actionItems: [...theseItems.slice(0, index), ...theseItems.slice(index+1)]
            }
          }
        });
       dismiss();
      }}
    >
      <Text style={{fontSize: 20}}>Are you sure you want to delete this Action Item?</Text>
      <Text style={{fontSize: 20}}>"{theseItems[index]}"</Text>
    </DialogModal> 
  )
}  
  
const ActionItemModal = ({isVisible = false, clientID, assessmentID, domain,  dismiss = () => {}}: ModalProps) => {
  const updateAssessment = useAssesmentsStore((state) => state.updateAssessment);
  const assessments = useAssesmentsStore((state) => state.assessments);
  const thisAssessment = assessments[clientID].find((a: Assessment) => a.timeStamp == assessmentID);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
      itemText: ""
    },
  });
  
  const onSubmit = (data) => {
    const thisQuestion = thisAssessment.questions[domain];
    const theseItems = thisQuestion.actionItems ? thisQuestion.actionItems : [];
    updateAssessment(clientID, {
        timeStamp: thisAssessment.timeStamp,
        questions: {...thisAssessment.questions, [domain]: {
            score: thisQuestion.score,
            moreHelp: thisQuestion.moreHelp,
            actionItems: [...theseItems, data.itemText]
          }
        }
    });
    dismiss();
  }
  
  return (
    <DialogModal
      title={'New Action Item for '+DomainTitles[domain]}
      submitText="Add"
      isVisible={isVisible} dismiss={dismiss} 
      submit={handleSubmit(onSubmit)}
    >
      <View>
        <View style={styles.fieldLabelView}>
          <Text style={styles.fieldLabelText}>Action</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{flex: 1}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="itemText"
          />
        </View>
        {errors.itemText && <Text>You must enter an action.</Text>}
        
      </View>
    </DialogModal>   
  );
};



const styles = StyleSheet.create({
  fieldLabelView: {
    width: 600,
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
   fieldLabelText: {
     fontSize: 22,
  }
})

export default ActionItemModal;
export {DeleteItemModal};

