import {Camera} from 'expo-camera'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground} from 'react-native'
import { useState, useRef } from 'react'
import { Feather } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CameraModule({}){

    const cameraRef = useRef()
    const [startCamera, setStartCamera] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const startCameraFunc = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
          // start the camera
          setStartCamera(true)
        } else {
          alert('Access denied')
        }
    }

    const takePicture = async () => {
        if (!cameraRef.current) return
        const photo = await cameraRef.current.takePictureAsync()
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        startCameraFunc()
    }

    const closeCamera = () => {
        setStartCamera(false)
        setPreviewVisible(false)
        setCapturedImage(null)
    }

    const savePicture = async() => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        if(status != 'granted'){
            const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status != 'granted') {
                return;
            }
        }
        try {
            const asset = await MediaLibrary.createAssetAsync(capturedImage.uri);
            const album = await MediaLibrary.getAlbumAsync('Alrayhan');
            if (album == null) {
              await MediaLibrary.createAlbumAsync('Alrayhan', asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
            }
        } catch (e) {
            console.log(e);
        }
        retakePicture()
    }

    const CameraPreview = ({photo}) => {
        return (
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          >
            <ImageBackground
              source={{uri: photo && photo.uri}}
              style={{
                flex: 1
              }}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    height:'100%',
                    padding: 20,
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}
            >
                <View
                    style={{
                    alignSelf: 'flex-end',
                    flex: 1,
                    }}
                >
                    <TouchableOpacity
                        onPress={closeCamera}
                    >
                        <Feather name="x" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    width: '100%',          
                    bottom: 0,
                }}>
                    <TouchableOpacity
                        onPress={retakePicture}
                    >
                        <Text style={{color:'#fff',fontSize:20}}>re-take</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={savePicture}
                    >
                        <Text style={{color:'#fff',fontSize:20}}>save</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        )
    }

    return (
        <>
            {startCamera ? (
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left:0,
                    height:0.65*windowHeight,
                    width:windowWidth
                }}>
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage}/>
                    ) : (
                        <Camera
                        style={{flex: 1,width:'100%',height:'100%'}}
                        ref={cameraRef}
                        >
                            <View
                                style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'column',
                                flex: 1,
                                width: '100%',
                                height:'100%',
                                padding: 20,
                                justifyContent: 'space-between',
                                alignItems:'center'
                                }}
                            >
                                <View
                                style={{
                                alignSelf: 'flex-end',
                                flex: 1,
                                }}
                                >
                                    <TouchableOpacity
                                        onPress={closeCamera}
                                    >
                                        <Feather name="x" size={30} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                <View
                                >
                                    <TouchableOpacity
                                    onPress={takePicture}
                                    style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    backgroundColor: '#fff'
                                    }}
                                    />
                            </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (
                <View style={styles.container}>
                    <View
                        style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={startCameraFunc}
                            style={{
                                width: 130,
                                borderRadius: 4,
                                backgroundColor: '#14274e',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40
                            }}
                        >
                        <Text
                            style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })