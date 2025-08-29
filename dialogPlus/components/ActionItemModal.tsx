
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { useForm, Controller } from "react-hook-form"

import DialogModal from './DialogModal'

type ModalProps = {
  isVisible: boolean;
  dismiss: () => void;
}

const ActionItemModal = ({isVisible = false, dismiss = () => {}}: ModalProps) => {
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
      itemText: ""
    },
  });
  
  const onSubmit = (data) => { }
  
  return (
    <DialogModal title="New Action Item" submitText="Add" isVisible={isVisible} dismiss={dismiss} submit={handleSubmit(onSubmit)}>
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

