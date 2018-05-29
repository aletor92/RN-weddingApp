import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FileSystem } from 'expo';
import ImageTile from './ImageTile';
const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    }
  }

  componentDidMount(){
    this.getPhotos()
  }

  selectImage = (index) => {
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
  }

  getPhotos = () => {
    let params = { first: 50, mimeTypes: ['image/jpeg'] };
    console.log('getPhotos', this.state);
    if (this.state.after) params.after = this.state.after
    if (!this.state.has_next_page) return
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos)
  }

  processPhotos = (r) => {
    console.log('process', r);
    if (this.state.after === r.page_info.end_cursor) return;
    let uris = r.edges.map(i=> i.node).map(i=> i.image).map(i=>i.uri)
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  }

  getItemLayout = (data,index) => {
    let length = width/4;
    return { length, offset: length * index, index }
  }

  prepareCallback() {
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      return(selected[index])
    });
    let files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    let callbackResult = Promise
      .all(files)
      .then(imageData=> {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data}
        })
      })
    this.props.callback(callbackResult)
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText = selectedCount + ' Selected';
    if (selectedCount === this.props.max) headerText = headerText + ' (Max)';
    return (
      <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
            <Text style={[{fontSize: 30, margin: 10, color: '#ffe8f7'}]}>{headerText}</Text>
          </View>
          <View style={styles.appBarButtons}>
            <TouchableOpacity style={{justifyContent: 'flex-end'}} onPress={() => this.props.callback(Promise.resolve([]))}>
              <Ionicons
                name={Platform.OS === 'ios' ? `ios-close` : 'md-close'}
                size={35}
                color={'#ffe8f7'}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.prepareCallback()}>
              <Ionicons
                name={Platform.OS === 'ios' ? `ios-cloud-upload` : 'md-cloud-upload'}
                size={35}
                color={'#ffe8f7'}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      // <View style={styles.header}>
      //   <Button
      //     title="Exit"
      //     onPress={() => this.props.callback(Promise.resolve([]))}
      //   />
      //   <Text>{headerText}</Text>
      //   <Button
      //     title="Choose"
      //     onPress={() => this.prepareCallback()}
      //   />
      // </View>
    )
  }
  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
  }
  renderImages() {
    return(
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
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
})