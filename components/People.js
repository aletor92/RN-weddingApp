import React from 'react';
import { 
    View,
    Text, 
    Image,
} from 'react-native';

export const People = (props) => { 
    return (<View style={{marginTop: 20, paddingHorizontal:10, justifyContent:'center', flexDirection:`row${props.direction}`}}>
        <Image
            style={{width:100, height:200}}
            source={props.image}
        />
        <View style={{flex: 1, width:60, height:160, margin: 20, padding:20, borderRadius:10,justifyContent:'center', flexDirection:'row', backgroundColor: 'pink'}}>
            <Text>{props.text}</Text>
        </View>
    </View>);
}