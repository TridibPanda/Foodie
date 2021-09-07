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
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Input from '../components/Input';
import Loading from '../components/Loading';
import { signup } from '../store/actions/Auth';


const SignupScreen = () => {

    const navigation = useNavigation();
    const [secure, setSecure] = useState(true);
    const [name, setName] = useState({ field: '', check: false });
    const [email, setEmail] = useState({ field: '', check: false });
    const [phone, setPhone] = useState({ field: '', check: false });
    const [password, setPassword] = useState({ field: '', check: false });
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const changeEntry = () => {
        setSecure((prevState) => !prevState);
    };

    //Signup
    const Signupfn = () => {
        if (name.field && email.field && password.field && phone.field) {
            setVisible(true);
            dispatch(signup(name.field, email.field, password.field, phone.field));
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        } else {
            name.field ? null : setName({ field: '', check: true });
            email.field ? null : setEmail({ field: '', check: true })
            password.field ? null : setPassword({ field: '', check: true })
            phone.field ? null : setPhone({ field: '', check: true })
        }
    }

    const Emailfn = (email: string) => {
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        ) ? setEmail({ field: email, check: false }) : setEmail({ field: '', check: true })
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Loading visible={visible} />
                <View style={styles.container}>
                    <View style={styles.headerMargin}>
                        <Text style={styles.headerText}>SIGN UP</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Name'}
                            keyboardType="default"
                            autoCapitalize="none"
                            onChange={(name: string) => (name ? setName({ field: name, check: false }) : setName({ field: '', check: true }))}
                        />
                        {name.check ? <Text style={styles.errortext}>Enter your full name </Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Email'}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChange={(email: string) => Emailfn(email)}
                        />
                        {email.check ? <Text style={styles.errortext}>Enter valid email address </Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Phone'}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            maxLength={10}
                            onChange={(phone: string) => (phone ? setPhone({ field: phone, check: false }) : setPhone({ field: '', check: true }))}
                        />
                        {phone.check ? <Text style={styles.errortext}>Enter your phone number </Text> : null}
                    </View>
                    <View style={{ ...styles.passwordContainer, marginBottom: password.check ? 0 : 5 }}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Password"
                            keyboardType="default"
                            secureTextEntry={secure}
                            autoCapitalize="none"
                            placeholderTextColor="#000"
                            onChangeText={(password) => (password.length > 7 ? setPassword({ field: password, check: false }) : setPassword({ field: '', check: true }))}
                        />
                        <Ionicons
                            style={{ padding: 10 }}
                            size={23}
                            name={secure ? 'ios-eye-off' : 'ios-eye'}
                            onPress={changeEntry}
                            color="#000"
                        />
                    </View>
                    {password.check ? <Text style={{ ...styles.errortext, padding: 5 }}>Password should be atleast 8 character </Text> : null}
                    <TouchableOpacity
                        onPress={Signupfn}
                        style={styles.buttonSignup}
                    >
                        <Text style={styles.buttonSignupText}>Sign up</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginTop: Dimensions.get('window').height * 0.02,
                        }}
                    >
                        <Text style={styles.bottomText}>
                            By clicking sign up, you agree to our terms and condition which include our privacy policy without reservation
                        </Text>
                    </View>
                    <View style={styles.loginView}>
                        <Text style={styles.bottomLoginText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginScreen')} >
                            <Text style={styles.loginText}>
                                Login here
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    headerMargin: {
        marginVertical: 70,
    },
    headerText: {
        color: '#81cee3',
        fontSize: 35,
        marginLeft: 15,
    },
    inputContainer: {
        width: '90%',
    },
    input: {
        padding: 8,
    },
    errortext: {
        color: '#a61d02',
        fontSize: 14,
        alignSelf: 'center',
    },
    passwordContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 35,
        borderColor: '#000',
        height: 42,
        marginTop: 5,
    },
    passwordText: {
        flex: 1,
        color: '#000',
        padding: 10,
        fontSize: 17,
    },
    buttonSignup: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#81cee3',
        marginTop: 10
    },
    buttonSignupText: {
        padding: 15,
        textAlign: 'center',
        color: "white",
        fontSize: 15,
    },
    bottomText: {
        textAlign: 'center',
        color: '#7E8084',
        fontSize: 13,
        padding: 2
    },
    loginView: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10
    },
    bottomLoginText: {
        paddingRight: 5,
        textAlign: 'center',
        color: '#000',
        fontSize: 15
    },
    loginText: {
        textAlign: 'center',
        color: '#ba45ac',
        fontSize: 15
    }
});

export default SignupScreen;