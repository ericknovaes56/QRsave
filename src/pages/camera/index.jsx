import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal , StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import ModalQr from './modal/'
import { Ionicons } from '@expo/vector-icons';


export default function Camera() {


    const isFocused = useIsFocused(); 
    const [hasPermission, setPermission] = useState(null);
    const [verModal, setModal] = useState(false)
    const [link , setLink] = useState(null)

    const askForPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    };

    useEffect(() => {
      askForPermission();
    }, []);

    const handleBarCodeScanned = (scannedData) => {
      if (isFocused && verModal == false) { 
        setModal(true)
        console.log(verModal)
        setLink(scannedData.data)
        console.log(scannedData.data)
      }
    };

    if (hasPermission == null) {
      return (
        <View style={styles.cerro}>
          <Ionicons style={{fontSize: 160}} color='green' name='camera-reverse' />
          <Text style={styles.aguardo}>Aguardando permissão</Text>
          <TouchableOpacity style={styles.btn1} onPress={() => askForPermission()}>
            <Text style={styles.filho}>PERMITIR</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {isFocused && (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{ width: '100%', height: '100%' }}
          />
        )}

        <Modal visible={verModal} animationType='slide' transparent>
          <ModalQr link={link} close={() => setModal(false)}/>
        </Modal>
      </View>
    );
}
const styles = StyleSheet.create({
  cerro:{
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      gap: 50,
  },
  aguardo:{
    fontSize:25,
    textTransform:'uppercase',
    fontWeight:'bold',
    textAlign:'center'
  },
  btn1: {
    backgroundColor: "#131313",
    padding:20,
    width:240,
    borderRadius:999,

  },
  filho: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
})