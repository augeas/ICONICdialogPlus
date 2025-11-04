
import { Text } from 'react-native';

import DialogModal from './DialogModal'
import { useAssesmentsStore } from "../data/assessment";

type ModalProps = {
  isVisible: boolean;
  dismiss: () => void;
  clientId: string;
  sessionId: string;
}

const DeleteSessionModal = ({isVisible = false, dismiss = () => {}, clientId, sessionId}: ModalProps) => {
  const dropAssessment = useAssesmentsStore((state) => state.dropAssessment);
  const sessionDate = new Date(sessionId); 
  const cleanDate = sessionDate.toString().split(' ').slice(0, 4).join(' ');
  
  
  return (
    <DialogModal
      title="Delete Session"
      submitText="Delete"
      isVisible={isVisible} dismiss={dismiss}
      submit={()=>{dropAssessment(clientId, sessionId); dismiss();}}
    >
      <Text style={{fontSize: 20}}>Are you sure you want to delete</Text>
      <Text style={{fontSize: 20}}>the session from {cleanDate}?</Text>
    </DialogModal>
  )
}

export default DeleteSessionModal;;
