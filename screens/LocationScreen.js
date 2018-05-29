import React from 'react';
import { View, ImageBackground, StyleSheet, Text, Image, Linking, Platform, Dimensions} from 'react-native';
import { Tile } from "react-native-elements";
import { Font } from 'expo';

import Colors from '../constants/Colors';
import { Location } from '../components/Location';

export default class LocationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontLoaded: false
  }

  getDirections(type, lat, lng){
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const latLng = `${lat},${lng}`;
    const label = type;
    const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`;

    Linking.openURL(url); 
  }

  async componentDidMount() {
    await Font.loadAsync({
      AlexBrushRegular: require('../assets/fonts/AlexBrush-Regular.ttf'),
      IowanOldStBTRoman: require('../assets/fonts/IowanOldStBTRoman.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { container, contentContainer, backgroundImage } = styles;
    return (  
        <ImageBackground source={require('../assets/images/background.png')} style={container}>
          {/* <Image source={require('../assets/images/chiesa.jpg')} style={contentContainer}></Image> */}
          {/* <Image source={require('../assets/images/ricevimento.jpg')} style={contentContainer}></Image> */}
          {/* <Tile
            imageSrc={require('../assets/images/chiesa.jpg')}
            imageContainerStyle={{justifyContent: 'center',alignSelf:'center',width:(Dimensions.get('window').width/2), height:(Dimensions.get('window').height/6)}}
            title="Parrocchia Maria SS. della Provvidenza"
            containerStyle={{height:(Dimensions.get('window').height/2)}}
            titleStyle={{fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null,fontSize:30}}
            contentContainerStyle={{ backgroundColor: 'pink',height: 50}}
            onPress={() => this.getDirections('Parrocchia Maria SS. della provvidenza', 38.1554889, 13.0815922)}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Via Dei Mille, 5, 90049</Text>
              <Text>Terrasini (PA)</Text>
            </View>
          </Tile>
          <Tile
            imageSrc={require('../assets/images/ricevimento.jpg')}
            title="Villa Buffa"
            titleStyle={{fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null,fontSize:30}}
            containerStyle={{position: 'absolute',bottom:0, height:(Dimensions.get('window').height/2)}}
            contentContainerStyle={{backgroundColor: 'pink', height: 50}}
            imageContainerStyle={{justifyContent: 'center',alignSelf:'center',width:(Dimensions.get('window').width/2), height:(Dimensions.get('window').height/6)}}
            onPress={() => this.getDirections('Villa Buffa', 38.1643947, 13.1934375)}
          >
            <View
              style={{ flex: 1, marginTop: 20,flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Via Agrumeti, 43, 90044</Text>
              <Text>Carini (PA)</Text>
            </View>
          </Tile> */}
          <Location onPress={() => this.getDirections('Parrocchia Maria SS. della provvidenza', 38.1554889, 13.0815922)} direction="" image={require('../assets/images/chiesa.jpg')} title="Parrocchia Maria SS. della Provvidenza" address="Via Dei Mille, 5, 90049" city="Terrasini (PA)" />
          <Location onPress={() => this.getDirections('Villa Buffa', 38.1643947, 13.1934375)} direction="-reverse" image={require('../assets/images/ricevimento.jpg')} title="Villa Buffa" address="Via Agrumeti, 43, 90044" city="Carini (PA)" />
        </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    // resizeMode: 'cover',
    width: null,
    height: null,
  },
  contentContainer: {
    alignItems:'flex-end',
    justifyContent:'flex-start',
    flex:1,
    height:50,
    width:null,
    alignItems: 'stretch'
  }
});
