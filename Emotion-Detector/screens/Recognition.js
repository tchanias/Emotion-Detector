import React, { Component } from 'react';
import { Text,Image ,Button ,  View } from 'react-native';
import { Permissions} from 'expo';
import  Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import {apiUrl,headers} from '../constants/constants';
import axios from 'axios';


 
 const apiheaders={headers:headers};
export class Recognition extends Component {
    state = {
        image: null,
      };

      componentDidMount() {
        this.getPermissionAsync();
      }

      

      processImageForRecognition=()=>{
      
       
    
        // Display the image.
        // var sourceImageUrl = document.getElementById("inputImage").value;
        // document.querySelector("#sourceImage").src = sourceImageUrl;
        let sourceImageUrl = this.state.image;
        axios.post(apiUrl,{
          data: '{"url": ' + '"' + sourceImageUrl + '"}  '
        },
        apiheaders)
        .then((response)=>{
          console.log(response,'api call response')
        })
        .catch((error)=>{
          console.log('imageUrl: ',sourceImageUrl)
          console.log('apiUrl: ',apiUrl)
          console.log('data: ','{"url": ' + '"' + sourceImageUrl + '"}  ')
          console.log('headers: ',apiheaders);
          console.log('An error occured: ',error)
        })
        // Perform the REST API call.
        // $.ajax({
        //     url: uriBase + "?" + $.param(params),
    
        //     // Request headers.
        //     beforeSend: function(xhrObj){
        //         xhrObj.setRequestHeader("Content-Type","application/json");
        //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        //     },
    
        //     type: "POST",
    
        //     // Request body.
        //     data: '{"url": ' + '"' + sourceImageUrl + '"}',
        // })
    
        // .done(function(data) {
        //     // Show formatted JSON on webpage.
        //     // $("#responseTextArea").val(JSON.stringify(data, null, 2));
        //     console.log(data)
        // })
    
        // .fail(function(jqXHR, textStatus, errorThrown) {
        //     // Display error message.
        //     var errorString = (errorThrown === "") ?
        //         "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        //     errorString += (jqXHR.responseText === "") ?
        //         "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        //             jQuery.parseJSON(jqXHR.responseText).message :
        //                 jQuery.parseJSON(jqXHR.responseText).error.message;
        //     alert(errorString);
        // });
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
          this.setState({ image: result.uri },()=>{
            this.processImageForRecognition();
          });

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
