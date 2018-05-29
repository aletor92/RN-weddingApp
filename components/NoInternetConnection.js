import React from 'react';
import { 
    View,
    Text, 
    Image,
} from 'react-native';

export const NoInternetConnection = () => { 
 return <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/images/no_connection.gif')} />
            <Text>Controlla la connessione ad internet</Text>
        </View>
}