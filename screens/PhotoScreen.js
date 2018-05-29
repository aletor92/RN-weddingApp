import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  ImageBackground,
  // Share,
  Dimensions
} from 'react-native';
import { Font, FileSystem } from 'expo';
import { Icon } from 'react-native-elements'
import Exponent, { Constants,Permissions, ImagePicker, registerRootComponent } from 'expo';
import FastImage from 'react-native-fast-image'
import { Ionicons } from '@expo/vector-icons';
import base64 from 'base-64';
import ImageLoad from 'react-native-image-placeholder';
import Share, {ShareSheet} from 'react-native-share';

import {GridImage} from '../components/GridImage';
import ImageBrowser from '../components/ImageBrowser';

// const HOST = 'http://192.168.51.134:8080/';
const HOST = 'https://wedding.zombox.it/';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    images: [],
    refreshing: false,
    imageBrowserOpen: false,
  };

  static navigationOptions = {
    header: null,
  };

  componentWillMount(){
    this._refreshImagesList();
  }

  render() {
    let { images, imageBrowserOpen, image} = this.state;
    const fullImage = image && `${HOST}Images${image.split('?')[0].substring(9, image.length)}`;
    // console.log('images', images);
    console.log('fullImage', fullImage);
    if (imageBrowserOpen) {
      return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
    }
    return (
      // <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end', flexDirection: 'row'}}>
      //   <Button
      //     onPress={this._pickImage}
      //     title="Pick an image from camera roll"
      //   />
      //   <Button onPress={this._takePhoto} title="Take a photo" />

      //   {this._maybeRenderImage()}
      //   {/* {this._maybeRenderUploadingOverlay()} */}

      // </View>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage} >
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
            {!fullImage &&
              <Text style={[{fontSize: 30, margin: 10, color: '#ffe8f7'}]}>Foto</Text>
            }
            {fullImage &&
              <TouchableOpacity 
                style={{justifyContent: 'flex-start'}}
                onPress={()=> this.hideImage()}
              >
                <Ionicons
                  name={Platform.OS === 'ios' ? `ios-arrow-round-back` : 'md-arrow-round-back'}
                  size={35}
                  color={'#ffe8f7'}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
            }
          </View>
            {fullImage && 
              <View style={styles.appBarButtons}>
                <TouchableOpacity 
                  onPress={() => this.shareImage(fullImage)}>
                  <Ionicons
                    name={Platform.OS === 'ios' ? `ios-share` : 'md-share'}
                    size={35}
                    color={'#ffe8f7'}
                    style={{ margin: 10 }}
                  />
                </TouchableOpacity>
              </View>
            }
            {!fullImage && 
            <View style={styles.appBarButtons}>
              <TouchableOpacity style={{justifyContent: 'flex-end'}} onPress={this.chooseImage.bind(this)}>
                <Ionicons
                  name={Platform.OS === 'ios' ? `ios-images` : 'md-images'}
                  size={35}
                  color={'#ffe8f7'}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this._takePhoto}>
                <Ionicons
                  name={Platform.OS === 'ios' ? `ios-camera` : 'md-camera'}
                  size={35}
                  color={'#ffe8f7'}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
            </View>}
        </View>
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          {this.state.images.length > 0 && !this.state.image &&
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={[{fontFamily: 'AlexBrushRegular', color:'#e84a68', 
                              fontSize: 45, margin: 20}]}>
                Condividete con noi
              </Text>
              <Text style={[{fontFamily: 'AlexBrushRegular', color:'#e84a68', 
                              fontSize: 45, marginTop: -20}]}>
                le vostre foto...
              </Text>
              
              <GridImage 
                images={this.state.images} 
                host={HOST} 
                refreshing={this.state.refreshing} 
                _refreshImagesList={this._refreshImagesList.bind(this)}
                onPress={(image)=>this.showImage(image)} />
              </View>
          }
          {fullImage && 
            <ImageLoad 
                key={fullImage}
                style={{ flex:1,height: (Dimensions.get('window').height - 50), width:(Dimensions.get('window').width) }}
                source={
                    {               
                        uri : fullImage, 
                        cache: 'force-cache',
                        headers: {Authorization:  "Basic ZGV2ZWxvcGVyOiEhRDMzdmVsPTBwLg=="}
                    }
                }
                loadingStyle={{ size: 'large', color: 'green' }} 
                mutable                                       
            />
          }
        </View>
      </ImageBackground>
    );
  }

  showImage(image){
    this.setState({image: image});
  }

  hideImage(){
    this.setState({image: null});
  }

  shareImage(image){
    // FileSystem.downloadAsync(
    //   image,
    //   FileSystem.documentDirectory + Date.now() + image.substring(image.length -4)
    // )
    //   .then(({ uri }) => {
    //     console.log('Finished downloading to ', uri);

        
    // })
    // .catch(error => {
      //   console.error(error);
      // });
    console.log('encode from ', `${HOST}imageEncoded/${(image.split('/')[4])}`);
    let headers = new Headers();
    headers.append("Authorization", "Basic ZGV2ZWxvcGVyOiEhRDMzdmVsPTBwLg==");
    console.log("headers", headers);
    fetch(`${HOST}imageEncoded/${(image.split('/')[4])}`,{headers: headers}).then((response) => response.json()).then(json =>{
      // console.log('data', json);
      // Share.share({
      //   url: `data:image/png;base64,${json.base64}`,
      //   title: 'Matrimonio Fabrizio e Federica',
      //   // message: `data:image/png;base64,${json.base64}`
      // }, {});
      let shareImageBase64 = {
        title: "Matrimonio Fabrizio e Federica",
        message: "Talia sta foto! ",
        url: `data:image/png;base64,${json.base64}`,
      };
      Share.open(shareImageBase64);

    }).catch(e => console.log("error share", e))  
    // alert('Coming soon');  
  }

  async getBase64FromImage(image){

  }

  chooseImage(){
    this.setState({imageBrowserOpen: true});
  }

  _takePhoto = async () => {
    const result = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),

    ]);
    const permissions = Permissions.CAMERA;
    const { status } =  result;//  await Permissions.askAsync(permissions);

    console.log("permissions", result, status);
    if(result.some((({status}) => status === 'granted'))) {
        let image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
      }).catch(error => {console.log(permissions, { error }); alert('Upload fallito. Controllare i permessi o la connessione internet e riprovare');});      console.log(permissions, 'SUCCESS', image);
      this._handleImagePicked(image);

    }
  };

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
      });
      console.log("start");
      photos.forEach(photo => {
        console.log('photo.file', photo.file);
        this._uploadImage(photo);
      });
      console.log("end");
    }).catch((e) => console.log(e))
  }

  _pickImage = async () => {
    const result = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),

    ]);
    const permissions = Permissions.CAMERA;

    console.log("permissions", result, status);
    if(result.some((({status}) => status === 'granted'))) {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
      }).catch(error => {console.log(permissions, { error }); alert('Upload fallito. Controllare i permessi o la connessione internet e riprovare');});
      console.log(permissions, 'SUCCESS', image);
      this._handleImagePicked(image);
    }
  };
  
  async _refreshImagesList(){
    this.setState({refreshing: true});
    let apiUrl = `${HOST}imagesList/`;
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("developer:!!D33vel=0p."));

    console.log('fetch', apiUrl, headers);
    const response = await fetch(apiUrl,{headers: headers});
    let images = await response.json();
    let imagesSorted = images.sort((a,b) => {
      let tA = a.substring(10,a.indexOf("_",6));
      let tB = b.substring(10,b.indexOf("_",6));
      return tB - tA;
    });
    // let i = [];
    // images.map(image => {
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    //   i.push(image);
    // });
    this.setState({images: images, refreshing: false});
  }

  async _uploadImage(image){
    console.log('image', image);
    try {
        this.setState({ uploading: true, refreshing: true});
        uploadResponse = await uploadImageAsync(image.file);
        console.log('uploadResponse', uploadResponse);
      } catch (e) {
        console.log({ uploadResponse });
        console.log({ uploadResult });
        console.log({ e });
        alert('Upload fallito. Controllare i permessi o la connessione internet e riprovare');
      } finally {
        this._refreshImagesList();
        this.setState({ uploading: false, refreshing: false });
      }
  }

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true, refreshing: true});

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        // this.setState({ image: HOST + uploadResult[0].location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this._refreshImagesList();
      this.setState({ uploading: false, refreshing: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = `${HOST}api/Upload/`;

  // let uriParts = uri.split('.');
  let fileType = Platform.OS === 'ios' ? 
                  uri.substring((uri.length) -3 ).toLowerCase()//uriParts[uriParts.length - 1];
                  : 'png';


  let formData = new FormData();
  formData.append('images', {
    uri: uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: "Basic " + base64.encode("developer:!!D33vel=0p.")
    },
  };
  console.log('uri', uri, options);
  return fetch(apiUrl, options);
}

async function getImageList() {
  let options = {
    method: 'GET',

  };
  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    // resizeMode: 'cover',
    width: null,
    height: null
  },
  appBar:{
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems:"flex-end",
    height:80,
    backgroundColor: '#e84a68',
    paddingHorizontal: 5
  },
  appBarButtons:{
    alignItems: "flex-end",
    flexDirection: "row"
  },
  appBarLeft:{
    alignItems: "flex-start",
    flexDirection: "row"
  }
});