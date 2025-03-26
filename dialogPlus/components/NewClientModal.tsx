
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { useForm, Controller } from "react-hook-form"

import { useClientStore } from "../data/client";
import DialogModal from './DialogModal'

type ModalProps = {
  isVisible: boolean;
  dismiss: () => void;
}

const NewClientModal = ({isVisible = false, dismiss = () => {}}: ModalProps) => {
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
      clientName: ""
    },
  });
  
  
  const addClient = useClientStore((state) => state.addClient);
  const onSubmit = (data) => { addClient(data.clientName); dismiss(); }
  
  return (
    <DialogModal title="New Client" submitText="Add" isVisible={isVisible} dismiss={dismiss} submit={handleSubmit(onSubmit)}>
      <View>
        <View style={styles.fieldLabelView}>
          <Text>Name</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="clientName"
          />
        </View>
        {errors.clientName && <Text>You must enter a name.</Text>}
        
      </View>
    </DialogModal>   
  );
};

type DeleteModalProps = ModalProps & {clientId: string}

const DeleteClientModal = ({isVisible = false, dismiss = () => {}, clientId}: DeleteModalProps) => {
  const clients = useClientStore((state) => state.clients);
  const dropClient = useClientStore((state) => state.dropClient);
  const name = clientId ? clients.find((client) => client.id == clientId).name : null
  
  console.log(clients.filter((client) => client.id == clientId))
  return (
    <DialogModal
      title="Delete Client"
      submitText="Delete"
      isVisible={isVisible} dismiss={dismiss}
      submit={()=>{dropClient(clientId); dismiss();}}
    >
      <Text>Are you sure you want to delete {name}?</Text>
    </DialogModal>
  )
}

const styles = StyleSheet.create({
  fieldLabelView: {
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
    flexDirection: "row",
    gap: 10,
  }, 
})

export default NewClientModal;
export {DeleteClientModal};
