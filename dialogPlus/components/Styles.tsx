
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
