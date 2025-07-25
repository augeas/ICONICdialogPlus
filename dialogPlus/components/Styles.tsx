
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
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
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
