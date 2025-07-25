import React from "react";
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';

type ModalProps = {
  title: string;
  submit: string;
  isVisible: boolean;
  dismiss: () => void;
  children: React.ReactNode;
}

const DialogModal = ({title = '', submitText = 'submit', cancelText = 'cancel' ,isVisible = false, dismiss = () => {}, submit = () => {}, children}: ModalProps) => {

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            {children}
            <View style={styles.hButtonView}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={submit}>
                <Text style={styles.textStyle}>{submitText}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={dismiss}>
                <Text style={styles.textStyle}>{cancelText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );    
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hButtonView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
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
  textStyle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DialogModal;
