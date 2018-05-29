import React from 'react';
import { 
    View,
    Image,
    RefreshControl,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import GridView from 'react-native-super-grid';
import ImageLoad from 'react-native-image-placeholder';


export const GridImage = (props) => { 
    return <GridView
            items={props.images}
            spacing={0}
            refreshing={props.refreshing}
            itemDimension={80}
            onRefresh={()=>props._refreshImagesList()}
            renderItem={image => (<TouchableOpacity onPress={()=> props.onPress(image)}>
                                        <ImageLoad 
                                            key={image}
                                            style={{ height: 80, width:80 }}
                                            source={
                                                {               
                                                    uri : props.host + image, 
                                                    // cache: 'force-cache',
                                                    headers: {Authorization:  "Basic ZGV2ZWxvcGVyOiEhRDMzdmVsPTBwLg=="}
                                                }
                                            }
                                            loadingStyle={{ size: 'large', color: '#e84a68' }} 
                                            mutable                                       
                                        />
                                    </TouchableOpacity>
                                )
                        }
        />;
  
}