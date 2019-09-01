import React, { Component } from 'react';
import { Text,Image ,Button ,  View } from 'react-native';
import { Permissions} from 'expo';
import  Constants from 'expo-constants';
import ImagePicker from 'expo-image-picker';

export class Recognition extends Component {
    state = {
        image: null,
      };

      componentDidMount() {
        this.getPermissionAsync();
      }

      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    render() {
        let { image } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> This is the stage where all the magic happens  </Text>

                <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
 
            </View>
        )
    }
}

export default Recognition
