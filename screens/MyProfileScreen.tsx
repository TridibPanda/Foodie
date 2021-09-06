import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase, { db } from '../config/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { myRecipes, recipeDetails } from '../store/actions/Recipes';
import { get,view } from '../store/actions/Auth';


const MyProfileScreen = () => {

    const [visible, setVisible] = useState(false);
    const [about, setAbout] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userData = useSelector((state: any) => state.auth.data);
    const listData = useSelector((state: any) => state.recipes.myRecipes);;

    useEffect(() => {
        dispatch(myRecipes());
        setAbout(userData.about);
        setProfileImage(userData.image)

    }, []);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image: any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5
        });

        // Image Upload 
        const response = await fetch(image.uri);
        const blob = await response.blob();
        var ref = Firebase.storage()
            .ref()
            .child(`ProfileImage/` + `${uid}.jpeg`);
        await ref.put(blob)

        // Image Download
        var ref = Firebase.storage()
            .ref()
            .child(`ProfileImage/` + `${uid}.jpeg`);
        const DownloadImage = await ref.getDownloadURL();

        if (DownloadImage) {
            setProfileImage(DownloadImage);
            db.collection('Users')
                .doc(`${uid}`)
                .update({
                    image: DownloadImage,
                })
                .then(() => {
                    dispatch(get());
                    alert('Profile Image upload completed')
                })
                .catch((error) => console.log(error));
        }
    };

    const details = (item: any) => {
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid))
        navigation.navigate('RecipeDetailsScreen')
    };

    const saveAbout = async () => {
        const uid = await AsyncStorage.getItem('uid');
        db.collection('Users')
            .doc(`${uid}`)
            .update({
                about: about,
            })
            .then(() => setVisible(false))
            .catch((error) => console.log(error));
    };

    const renderItem = (itemData: any) => {
        return (
            <TouchableOpacity onPress={() => details(itemData.item)}>
                <ImageBackground source={{ uri: itemData.item.image }}
                    style={styles.bgImage}>
                    <Text style={styles.title} numberOfLines={1}>{itemData.item.recipeName}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={styles.screen}>
            <Modal visible={visible} transparent={true} animationType="slide"  >
                <View style={styles.popover}>
                    <Text style={styles.poptext}>About</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Your description'}
                            keyboardType="default"
                            autoCapitalize="none"
                            maxLength={200}
                            onChange={(about: string) => setAbout(about)}
                            value={about}
                        />
                    </View>
                    <View style={styles.popbutton}>
                        <TouchableOpacity style={styles.cancel} onPress={() => setVisible(false)}>
                            <Text style={{ color: '#fff', }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.connect} onPress={saveAbout}>
                            <Text style={{ color: '#fff', }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ alignItems: 'center', marginTop: '7%' }}>
                <ImageBackground style={styles.profileImage} source={{ uri: profileImage ? profileImage : 'https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg' }} >
                    <TouchableOpacity style={styles.edit} onPress={() => takeImageHandler()}>
                        <Ionicons
                            style={{}}
                            name="md-pencil"
                            size={10}
                            color="#000"

                        />
                    </TouchableOpacity>
                </ImageBackground>
                <Text style={styles.name} >{userData.name}</Text>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={styles.about}>{about ? about : '[Tap to enter bio]'}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.recipeText}>Recipes</Text>
            <View style={styles.listView}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={listData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    style={{ width: '100%' }}
                // ListEmptyComponent={emptyComponent}
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
        borderWidth: 2,
        overflow: 'hidden',
        borderColor: '#ccc',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    edit: {
        height: 20,
        width: 20,
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '10%'
    },
    about: {
        fontSize: 16,
        color: '#7E8084',
        textAlign: 'center',
        margin: '5%'
    },
    recipeText: {
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
    },
    listView: {
        flexDirection: 'row',
        marginVertical: 5
    },
    bgImage: {
        width: 160,
        height: 250,
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'flex-end',
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5
    },
    title: {
        color: '#fff',
        fontSize: 16,
        padding: 15
    },
    popover: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 2,
        marginTop: '50%'
    },
    poptext: {
        marginHorizontal: '3%',
        textAlign: 'center',
        fontSize: 20,
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    input: {
        padding: 8,
    },
    popbutton: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '4%',
    },
    cancel: {
        backgroundColor: '#eb635b',
        borderRadius: 20,
        width: '40%',
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    connect: {
        backgroundColor: '#2c629c',
        borderRadius: 20,
        width: '40%',
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default MyProfileScreen;