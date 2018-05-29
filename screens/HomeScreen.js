import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Easing
} from 'react-native';
import { Font } from 'expo';
import CountDown from 'react-native-countdown-component';
import FlipView  from 'react-native-flip-view-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'react-native-elements';

import Colors from '../constants/Colors';
import { People } from "../components/People";

export default class HomeScreen extends React.Component {
  state = {
    fontLoaded: false,
    isFlipped: false
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      AlexBrushRegular: require('../assets/fonts/AlexBrush-Regular.ttf'),
      IowanOldStBTRoman: require('../assets/fonts/IowanOldStBTRoman.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  calculateSecondFromDate(){
    const weddingSecond = 1568466000000;
    const now = new Date();
    return (weddingSecond - now.getTime()) / 1000;
  }

  render() {
    return (
      <FlipView style={{flex: 1}}
                front={this._renderFront(styles)}
                back={this._renderBack(styles)}
                isFlipped={this.state.isFlipped}
                onFlipped={(val) => {console.log('Flipped: ' + val);}}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={1000}/>
    );
  }

  _renderFront = (styles) => {
    const {container, contentContainer, name, text, information, backgroundImage, buttonText} = styles;
    return (
      <ImageBackground source={require('../assets/images/background.png')} style={backgroundImage} >
      <View style={container}>
          <ScrollView style={container} contentContainerStyle={contentContainer}>
          <Text style={[{ fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null}, text, name, {marginBottom: 20, fontSize:35}]}>{'14 Settembre 2019'}</Text>
            <CountDown
                until={this.calculateSecondFromDate()}
                onFinish={() => alert('Auguri agli sposi !!! :) ')}
                // onPress={() => alert('#unnièoraumumento')}
                digitBgColor={'pink'}
                // digitTxtColor={'black '}
                size={30}
              />
            <Text style={[{ fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null}, name]}>Fabrizio</Text>
            <Text style={[{ fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null, color:'#e84a68', fontSize:20}]}>&</Text>
            <Text style={[{ fontFamily: this.state.fontLoaded ? 'AlexBrushRegular' : null}, name]}>Federica</Text>

            
            <TouchableOpacity onPress={()=> this._flip()}>
              <View style={{marginTop: 20, paddingHorizontal:10, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row', backgroundColor: 'pink'}}>
                <Text style={[{ fontFamily: this.state.fontLoaded ? 'IowanOldStBTRoman' : null}, text, buttonText]}>Gli Sposi</Text>
                <Ionicons
                  name={Platform.OS === 'ios' ? `ios-heart` : 'md-heart'}
                  size={40}
                  color={'#ffe8f7'}
                  style={{ margin: 10 }}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
      </View>
      </ImageBackground>
    );
  };
 
  _renderBack = (styles) => {
    const {container, contentContainerBack, name, text, information, backgroundImage, buttonText} = styles;
    return (
      <ImageBackground source={require('../assets/images/background.png')} style={backgroundImage} >
      <View style={container}>
          <ScrollView style={container} contentContainerStyle={contentContainerBack}>
            <People direction="" image={require('../assets/images/fabrizio.png')} text="CUCIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII" />
            <People direction="-reverse" image={require('../assets/images/federica.png')} text="FEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEderi" />

            <TouchableOpacity style={{flex: 1, justifyContent:'flex-end'}} onPress={()=> this._flip()}>
              <View style={{marginTop: 20, paddingHorizontal:10, alignItems:'center', justifyContent:'center', flexDirection:'row', backgroundColor: '#e84a68'}}>
                <Text style={[{ fontFamily: this.state.fontLoaded ? 'IowanOldStBTRoman' : null}, text, buttonText]}>CountDown!</Text>
                <Ionicons
                  name={Platform.OS === 'ios' ? `ios-timer` : 'md-timer'}
                  size={40}
                  color={'#ffe8f7'}
                  style={{ margin: 10 }}
                />  
              </View>
            </TouchableOpacity>
          </ScrollView>
      </View>
      </ImageBackground>
    );
  };
 
  _flip = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.tintColor,
  },
  contentContainer: {
    paddingTop: 100,
    alignItems:'center',
    // justifyContent:'center',
    flex:1,
    zIndex:100
  },
  contentContainerBack: {
    paddingTop: 60,
    flex:1,
    zIndex:100
  },
  backgroundImage:{
    flex: 1,
    // resizeMode: 'cover',
    width: null,
    height: null,
  },
  text: {
    // color: 'white'
  },
  information: {
    fontSize:20
  },
  buttonText:{
    color:'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  name: {
    fontSize: 50,
    // fontWeight: 'bold',
    color: '#e84a68'
  }
});
