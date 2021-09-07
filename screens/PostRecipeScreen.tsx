import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Image,
    Button,
    Alert,
    Picker
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from "expo-file-system";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { postRecipe } from '../store/actions/Recipes';
import Loading from '../components/Loading';

// recipe types
const recipeTypes = [
    {
        type: 'ASIAN FOOD',
        typeColor: '#a519e6',
    },
    {
        type: 'AMERICAN FOOD',
        typeColor: '#d40bc3',
    },
    {
        type: 'EUROPEAN FOOD',
        typeColor: '#db0465',
    },
    {
        type: 'ITALIAN FOOD',
        typeColor: '#6018db',
    },
    {
        type: 'CHINESE FOOD',
        typeColor: '#1d7cdb',
    },
    {
        type: 'INDIAN FOOD',
        typeColor: '#d66418',
    },
    {
        type: 'MEXICAN FOOD',
        typeColor: '#a5db1d',
    },
    {
        type: 'FRENCH FOOD',
        typeColor: '#ed2f2f',
    },
    {
        type: 'JAPANESE FOOD',
        typeColor: '#dec41d',
    },
    {
        type: 'AFRICAN FOOD',
        typeColor: '#dea41d',
    },
    {
        type: 'THAI FOOD',
        typeColor: '#8e65a1',
    },
    {
        type: 'KOREAN FOOD',
        typeColor: '#50f74a',
    },
    {
        type: 'FOOD',
        typeColor: '#4af7b2',
    },
];

const PostRecipeScreen = () => {

    const navigation = useNavigation();
    const [pickedImage, setPickedImage] = useState({ field: '', check: false });
    const [recipeName, setRecipeName] = useState({ field: '', check: false });
    const [selectedValue, setSelectedValue] = useState({ field: '', check: false });
    const [description, setDescription] = useState({ field: '', check: false });
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

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
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image: any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5
        });

        let fileInfo: any = await FileSystem.getInfoAsync(image.uri);
        console.log(image, "image", fileInfo)

        let imageSize = fileInfo.size / (1024 * 1024);
        if (imageSize > 1) {
            setPickedImage({ field: '', check: true });
            alert(`Maximum image size is 1MB,This image size is ${imageSize.toFixed(2)}`)
        } else {
            setPickedImage({ field: image.uri, check: false });
        }

    };


    const submit = async () => {
        if (pickedImage.field && recipeName.field && selectedValue.field && description.field) {
            setVisible(true);
            dispatch(postRecipe(recipeName.field, selectedValue.field, description.field, pickedImage.field, navigation));
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        } else {
            recipeName.field ? null : setRecipeName({ field: '', check: true });
            selectedValue.field ? null : setSelectedValue({ field: '', check: true })
            description.field ? null : setDescription({ field: '', check: true })
            pickedImage.field ? null : setPickedImage({ field: '', check: true })
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Loading visible={visible} />
                <View style={styles.icnTxtContainer}>
                    <View >
                        <Ionicons
                            name='ios-arrow-back'
                            size={40}
                            color='#000'
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <TouchableOpacity onPress={submit}>
                        <View>
                            <Text style={styles.topMostTxt} >Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View >
                        <Text style={styles.headerText}>Post</Text>
                    </View>

                    <View style={styles.imagePreview}>
                        <Image style={styles.image} source={{ uri: pickedImage.field ? pickedImage.field : 'https://image.freepik.com/free-photo/white-simple-textured-design-background_53876-106174.jpg' }} />
                    </View>
                    <Text style={styles.errormessage}>Maximum image size is 1MB.</Text>
                    {pickedImage.check ? <Text style={styles.errortext}>Select one image </Text> : null}
                    <Button
                        title="Take Image"
                        color={'#0690c2'}
                        onPress={takeImageHandler}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Recipe Name"
                            keyboardType="default"
                            autoCapitalize="none"
                            placeholderTextColor="#000"
                            onChangeText={(name) => (name ? setRecipeName({ field: name, check: false }) : setRecipeName({ field: '', check: true }))}
                        />
                    </View>
                    {recipeName.check ? <Text style={styles.errortext}>Enter recipe name </Text> : null}
                    <View style={styles.passwordContainer}>
                        <Picker
                            selectedValue={selectedValue.field}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => (itemValue === "Select recipe type" ? setSelectedValue({ field: '', check: true }) : setSelectedValue({ field: itemValue, check: false }))}
                        >
                            <Picker.Item color='#5e5e5e' label="Select recipe type" value="Select recipe type" />
                            {
                                recipeTypes.map((item: any, index: any) => {
                                    return (
                                        <Picker.Item key={index} label={item.type} value={item} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {selectedValue.check ? <Text style={styles.errortext}>Select recipe type </Text> : null}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Recipe description"
                            keyboardType="default"
                            autoCapitalize="none"
                            multiline={true}
                            placeholderTextColor="#000"
                            onChangeText={(description) => (description ? setDescription({ field: description, check: false }) : setDescription({ field: '', check: true }))}
                        />
                    </View>
                    {description.check ? <Text style={styles.errortext}>Enter recipe description </Text> : null}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        color: '#000',
        fontSize: 35,
        marginLeft: 15,
    },
    errormessage: {
        color: '#000',
        fontSize: 12,
        alignSelf: 'center',
        paddingBottom: 5
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#000'
    },
    passwordContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginTop: 10
    },
    passwordText: {
        flex: 1,
        color: '#000',
        padding: 10,
        fontSize: 17,
    },
    errortext: {
        color: '#a61d02',
        fontSize: 14,
        alignSelf: 'center',
        padding: 5
    },
    icnTxtContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        marginHorizontal: 12,
    },
    topMostTxt: {
        fontSize: 20,
        color: '#000'
    },
    imagePreview: {
        height: 200,
        width: '95%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        margin: Dimensions.get('window').height * 0.02
    },
    image: {
        width: '100%',
        height: '100%'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default PostRecipeScreen;