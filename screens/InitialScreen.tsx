import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const bgImage1 = require("../assets/images/bg-image1.png");
const bgImage2 = require("../assets/images/bg-image2.png");
const bgImage3 = require("../assets/images/bg-image3.png");

const InitialScreen = () => {

    const navigation = useNavigation();
    const [check, setCheck] = useState(false);
    const [isSkip, setIsSkip] = useState(false);
    const isloggedout = useSelector((state: any) => state.auth.isloggedout);

    useEffect(() => {
        console.log(isloggedout, "isloggedout")
        if (isloggedout) {
            setIsSkip(true)
        }
    }, [isloggedout])

    return (
        <View style={styles.screen}>
            {isSkip ? (<ImageBackground
                source={bgImage3}
                style={styles.bgImage}>
                <View style={styles.initialView}>
                    <Text style={styles.initialTitle}>Wellcome to Foodie! {'\n'} Your one stop app for all foods and recipes</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={{ ...styles.button, backgroundColor: '#81cee3' }} >
                            <Text style={styles.buttonTitle}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={{ ...styles.button, backgroundColor: '#ba45ac' }}>
                            <Text style={styles.buttonTitle}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.initialCircleView}>
                    <View style={{ ...styles.circle, backgroundColor: '#8a8a8a' }} />
                    <View style={{ ...styles.circle, backgroundColor: '#8a8a8a' }} />
                    <View style={{ ...styles.circle, backgroundColor: '#fff' }} />
                </View>
            </ImageBackground>) :
                (<ImageBackground
                    source={check ? bgImage2 : bgImage1}
                    style={styles.bgImage}>
                    <View style={{ ...styles.titleView, marginHorizontal: check ? '13%' : '5%' }}>
                        <Text style={styles.title}>{check ? 'One dish meal, for you & your family' : 'Different recipes that will help you prepare your own.'}</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => setIsSkip(true)}>
                            <Text style={styles.buttonTitle}>SKIP</Text>
                        </TouchableOpacity>
                        <View style={styles.circleView}>
                            <View style={{ ...styles.circle, backgroundColor: !check ? '#fff' : '#8a8a8a' }} />
                            <View style={{ ...styles.circle, backgroundColor: check ? '#fff' : '#8a8a8a' }} />
                            <View style={{ ...styles.circle, backgroundColor: '#8a8a8a' }} />
                        </View>
                        <TouchableOpacity onPress={() => check ? setIsSkip(true) : setCheck(true)}>
                            <Text style={styles.buttonTitle}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>)}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: '100%',

    },
    initialView: {
        height: '90%',
        justifyContent: 'flex-end',
    },
    initialTitle: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: "28%"
    },
    buttonView: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: '12%'
    },
    button: {
        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    initialCircleView: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 15,
    },
    titleView: {
        height: '90%',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    circleView: {
        flexDirection: 'row',
    },
    circle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 16,
    }
});

export default InitialScreen;