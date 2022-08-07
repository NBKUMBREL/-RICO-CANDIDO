import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native"

import React, { useState, useEffect} from "react"

import * as ImagePicker from 'expo-image-picker'

import {firebase, storage, db, r} from './Config'

import { SafeAreaView } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage'

import { getStorage, ref, getDownloadURL } from "firebase/storage";

 

const UploadScreen = () => {

const [ image, setImage ] = useState(null);

const [ upload, setUpload ] = useState(false);

const [ arrayImg, setArrayImg ] = useState([]);

const [ url, setUrl] = useState(null);

const [ arquivoURL, setArquivoURL ] = useState();




useEffect(()=> {

    db.collection('img').doc().collection('file').onSnapshot((snapshot) => {

  setArrayImg(snapshot.docs.map(arrayImg => {

    return arrayImg.data();

  }));

 

})

console.log(arrayImg)

},[]);

 

const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({

        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [4,3],

        quality:1,

    });

 

    const source = {uri: result.uri};

    console.log(source);

    setImage(source);

};

 

const uploadImage = async () => {

    setUpload(true);

    const response = await fetch(image.uri)

    const blob = await response.blob();

    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);

    var ref = firebase.storage().ref('img').child(filename).put(blob);

    ref.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){

       

        console.log("enviado")

    }, function(error){

       

        console.log("erro")

    }, function(){

       

        firebase.storage().ref("img").child(filename).getDownloadURL(url)

            .then(function(url){

                db.collection('drive').doc().collection("file").add({

                    arquivoURL: url,

                   

                })

 

                 console.log(url);

            })
 })

 

    try {

        await ref;

    } catch (e) {

        console.log(e);

    }

    setUpload(false);

    Alert.alert(

        'upload realizado'

    );

    setImage(null);

};

 

    return (

       <SafeAreaView style={styles.container}>

           <TouchableOpacity style={styles.select} onPress={pickImage}>

                <Text style={styles.botaoTx}>Escolher</Text>

           </TouchableOpacity>

           <View style={styles.imageCon}>        

           {image && <Image source={{uri: image.uri}} style={{width:300, height:300}} />}

           

                <TouchableOpacity style={styles.enviarBtn} onPress={uploadImage}>

                    <Text style={styles.botaoTx}>

                        Enviar

                    </Text>

                    </TouchableOpacity>

                </View>

           

           <View style={styles.imageCon}>

           <Image source={arquivoURL} style={{width:300, height:300}} />

           </View>

           

       </SafeAreaView>

    )

}

 

export default UploadScreen

 

const styles = StyleSheet.create({

    container:{

        flex:1,

        alignItems:'center',

        backgroundColor:'#000',

        justifyContent:'center',

    },

    select:{

        borderRadius:5,

        width:150,

        height:50,

        backgroundColor:'blue',

        alignItems:'center',

        justifyContent:'center',

    },

    enviarBtn:{

        borderRadius:5,

        width:150,

        height:50,

        backgroundColor:'red',

        alignItems:'center',

        justifyContent:'center',

    },

    botaoTx:{

        color:'white',

        fontSize:18,

        fontWeight:'bold',
},

    imageCon:{

        flex:1,

        alignItems:'center',

        alignSelf:'center',

       

       

    },

})
