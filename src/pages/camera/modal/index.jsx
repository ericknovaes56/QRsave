import { View , Text, StyleSheet,TextInput, TouchableOpacity} from "react-native";
import { Linking } from 'react-native';
import { useState } from "react";
import * as ClipBoard from 'expo-clipboard'


import useStorage from "../../../hooks/useStorage";

export default function ModalQr({link , close}){

    const {additem} = useStorage()
    const [valor, setValor] = useState('');

    const salvar = async (link) => {
        await additem("@qr", {
          nome: valor,
          link: link
        });

        close()

      }
      

    const abrir = async (url) => {
        if (await Linking.canOpenURL(url)) {

          await Linking.openURL(url);

        } else {

          console.error('URL inválido:', url);

        }
    };

    const copiar = async (link) =>{
        await ClipBoard.setStringAsync(link)
    }



    const handleChangeTexto = (novoValor) => {
      setValor(novoValor);
    };

    return (
        <View style={styles.modalc } tran>

            <View style={styles.texts}>
                <Text style={styles.oqfazer2}>Salve seu QR-CODE ?</Text> 
                <Text style={styles.link} onLongPress={() => copiar(link)}>{link}</Text> 
            </View>
            <TextInput style={styles.input}  onChangeText={handleChangeTexto} placeholder="Nome do QR-CODE"/>

            <View style={styles.divbtn}>
                <TouchableOpacity style={styles.btn} onPress={close}>
                    <Text style={styles.oqfazer}>sair</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => abrir(link)}>
                    <Text style={styles.oqfazer}>abrir</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => salvar(link)} >
                    <Text style={styles.oqfazer}>salvar</Text> 
                </TouchableOpacity >
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    modalc:{
        backgroundColor: "rgba(24,24,24,0.6)",
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 50,
    },
    oqfazer:{
        color:'black',
        fontSize:20,
        textAlign:'center',
        textTransform:"uppercase",
        fontWeight:'bold'
        
        
    },
    oqfazer2:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        textTransform:"uppercase",
        fontWeight:'bold'
        
        
    },
    link:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        backgroundColor:'black',
        paddingTop:20,
        paddingBottom:20,
        borderRadius: 20,
        minWidth:350
        
    },
    texts:{
        gap:10,
    },
    input:{
        fontSize:20,
        backgroundColor: "#ffff",
        width: '95%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 20,
    },
    divbtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '95%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    btn:{
        backgroundColor: "#FFF",
        flex:1,
        borderRadius:999,
        minWidth:100,
        height:40,
        justifyContent: "center",
        alignItems: "center",
    }
})