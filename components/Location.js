import React from 'react';
import { 
    View,
    Text, 
    Image,
    TouchableOpacity
} from 'react-native';

export const Location = (props) => { 
    return (<TouchableOpacity onPress={props.onPress}>
    <View style={{marginTop: 20, paddingHorizontal:10, alignContent:'center', justifyContent:'center', flexDirection:`row${props.direction}` }}>
        <Image
            style={{width:150, height:250, borderRadius: 10}}
            source={props.image}
        />
        <View
              style={{ borderRadius:10, flex: 1,padding:5 ,alignItems:'center', 
                        justifyContent:'center',margin: 20,justifyContent:'center', 
                        backgroundColor:'pink'}}
            >
              <Text style={{fontFamily: 'AlexBrushRegular',fontSize:22, marginBottom:10, justifyContent:'center',}}>{props.title}</Text>
              <Text>{props.address + " " + props.city}</Text>
              <Text>{}</Text>
            </View>
    </View>
    </TouchableOpacity>);
}