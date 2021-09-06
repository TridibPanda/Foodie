import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Input from '../components/Input';
import Loading from '../components/Loading';
import { login } from '../store/actions/Auth';


const LoginScreen = () => {

    const [secure, setSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const changeEntry = () => {
        setSecure((prevState) => !prevState);
    };

    const handleLogin = () => {
        setVisible(true);
        dispatch(login(email, password));
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Loading visible={visible} />
                <View style={styles.container}>
                    <View style={styles.headerMargin}>
                        <Text style={styles.headerText}>LOG IN</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Email'}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChange={(email: string) => setEmail(email)}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Password"
                            keyboardType="default"
                            secureTextEntry={secure}
                            autoCapitalize="none"
                            placeholderTextColor="#000"
                            onChangeText={(password) => {
                                setPassword(password);
                            }}
                        />
                        <Ionicons
                            style={{ padding: 10 }}
                            size={23}
                            name={secure ? 'ios-eye-off' : 'ios-eye'}
                            onPress={changeEntry}
                            color="#000"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.buttonLoginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordScreen')}
                    >
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                    <View style={styles.signupView}>
                        <Text style={styles.bottomText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignupScreen')} >
                            <Text style={styles.signupText}>
                                Signup here
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
        backgroundColor: "#fff"
    },
    headerMargin: {
        marginVertical: 100,
        alignItems: 'center',
    },
    headerText: {
        color: '#ba45ac',
        fontSize: 35,
        marginLeft: 15,
    },

    inputContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    input: {
        padding: 8,
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
        marginBottom: 5,
    },
    passwordText: {
        flex: 1,
        color: '#000',
        padding: 10,
        fontSize: 17,
    },
    buttonLogin: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#ba45ac',
        marginTop: 10
    },
    buttonLoginText: {
        padding: 15,
        textAlign: 'center',
        color: "white",
        fontSize: 15,
    },
    forgotText: {
        textAlign: 'center',
        color: '#000',
        padding: 15,
        fontSize: 15,
    },
    signupView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    bottomText: {
        paddingRight: 5,
        textAlign: 'center',
        color: '#000',
        fontSize: 15
    },
    signupText: {
        textAlign: 'center',
        color: '#81cee3',
        fontSize: 15
    }
});

export default LoginScreen;