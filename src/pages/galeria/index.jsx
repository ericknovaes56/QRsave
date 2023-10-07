import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View , Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native"
import useStorage from "../../hooks/useStorage"
import { Linking } from 'react-native';
import qrImage from '../../assets/img/qr.png'; 
import * as ClipBoard from 'expo-clipboard'

export default function Galeria(){
    const [list , setList] = useState([])
    const focu = useIsFocused()
    const { getItem , delet } = useStorage()
    const [numQr, setNumQr] = useState(0)

    useEffect(()=>{

        async function load(){
            const qrs = await getItem('@qr')
            setList(qrs)
        }
        load()
    },[focu])
    useEffect(() => {
        setNumQr(list.length);
    }, [list]);
    const openLink = async (url) => {
  
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        } else {
          console.error('URL inválido:', url);
        }
    };

    const apagar = async ()=>{
        const allQrs = list

        allQrs.forEach( async qr => {
            const qrs = await delet('@qr', qr)
        });

        setList([])

    }
    const copiar = async (link) =>{
        await ClipBoard.setStringAsync(link)
    }
    function getSiteName(link) {
        try {
          const urlRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;
          const match = link.match(urlRegex);
          if (match && match[1]) {
            return match[1];
          }
          return 'Sem Nome !';
        } catch (error) {
          console.error('Erro ao acessar o site:', error);
          return 'Sem Nome !';
        }
      }

    return (
        <View style={styles.pai}>
            <View style={styles.actions}>
            {numQr > 0 ? (
                <TouchableOpacity onPress={()=> apagar()}>
                <Text style={styles.btnaction}>APAGAR TUDO</Text>
                </TouchableOpacity>
            ) : null}
            {numQr > 0 ? (
            <Text style={styles.btnaction}>QR's: {numQr}</Text>
            ) : null}
            </View>
            <FlatList  data={list.reverse()}
                renderItem={ ({item}) => {
    
                    if (item.nome == ""){
                        item.nome = getSiteName(item.link)
                    }
                    return(
                        <TouchableOpacity style={styles.box} onLongPress={() => copiar(item.link)} onPress={() => openLink(item.link)}>
                            <Image
                            source={qrImage} // SubstRL ou caminho da sua imagem
                            style={styles.imagem}
                            />
                            <View>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.link}>{item.link}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    pai:{
        padding:20,
        gap:10,
        height:"99%"
    },
    box:{
        borderWidth:2,
        borderColor:'black',
        marginTop:10,
        padding:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center'
    },
    nome:{
        fontSize:14,
        textTransform:'uppercase',
        fontWeight:'bold',
    },
    link:{
        maxWidth: '99%',
    },
    imagem: {
        width: 50, // Defina a largura desejada da imagem
        height: 50, // Defina a altura desejada da imagem
    },
    actions:{
        flexDirection: 'row',
        gap:10,
    },
    btnaction:{
        backgroundColor: "#131313",
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20,
        minWidth:110,
        borderRadius:999,
        color:'white',
        fontWeight:"bold"
    }
})