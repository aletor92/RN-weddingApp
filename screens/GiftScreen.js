import React from 'react';
import { 
    ScrollView,
    StyleSheet, 
    Text, 
    ImageBackground, 
    Image,
    View,
    WebView,
    TouchableHighlight,
    ActivityIndicator,
    NetInfo} from 'react-native';
import Colors from '../constants/Colors';
import { NoInternetConnection } from "../components/NoInternetConnection";


export default class GiftScreen extends React.Component {
  state = { webviewLoaded: true, connected: false};

  static navigationOptions = {
    header: null,
  };

  renderLoading() {
    // return <Image style={{flex: 1,
    //   width: 100,
    //   height: 0,
    //   resizeMode: 'contain',
    //   alignItems:'center', 
    //   alignSelf:'center',
    //   justifyContent:'center',
    // }} source={require('../assets/images/loading.gif')}/>;
    // return <Text style={{flex: 1, fontSize: 25, alignItems:'center', justifyContent:'center',paddingTop: 120}}> Caricamento contenuti... </Text>
    return <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator
              animating={true}
              style={
                {
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              size="large"
              color="#e84a68"
            />
          </View>
  }

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (playload)=>{
      // console.log('willFocus');
      this.setState({webviewLoaded: true});
    });
    this.props.navigation.addListener('didBlur', (playload)=>{
      // console.log('didBlur', this.state.webviewLoaded, this.props.navigation);
      this.setState({webviewLoaded: false});
    });
    
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      this.setState({connected : connectionInfo.type !== 'none'});
    });

    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectivityChange.bind(this)
    );
  }

  handleConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    this.setState({connected : connectionInfo.type !== 'none'});
  }

  render() {
    // console.log('render', this.props.navigation);
    const { container, contentContainer, backgroundImage, loading, webView} = styles;
    return (  
      this.state.webviewLoaded ? 
          <ScrollView style={container} contentContainerStyle={contentContainer}> 
            {this.state.connected ? 
            <WebView 
              style={webView} 
              renderLoading={this.renderLoading}
              startInLoadingState
              source={{uri : 'https://www.paypal.me/fabrifedewedding'}} /> 
            : <NoInternetConnection />
            }
          </ScrollView>
        :
        <ImageBackground source={require('../assets/images/background.png')} style={backgroundImage} >
          {
            this.renderLoading() 
          }
        </ImageBackground>
        
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage:{
    flex: 1,
    // resizeMode: 'cover',
    width: null,
    height: null,
  },
  webView: {
    flex: 1,
    alignItems:'center',
    // justifyContent:'center',
  },
  contentContainer: { 
    paddingTop: 20,
    // alignItems:'center',
    // justifyContent:'center',
    flex:1,
  }
});
