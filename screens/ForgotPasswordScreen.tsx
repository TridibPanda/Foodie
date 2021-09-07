import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Loading from '../components/Loading';
import Input from '../components/Input';
import { forget } from '../store/actions/Auth';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const submit = () => {
        setVisible(true);
        forget(email)
        setTimeout(() => {
            setVisible(false);
            setEmail('');
        }, 2000);
    };

    return (
        <View style={styles.container} >
            <Loading visible={visible} />
            <View style={styles.closeBtn}>
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                    size={Platform.OS === 'android' ? 30 : 40}
                    color="#000"
                    onPress={() => navigation.goBack()}
                    style={{
                        marginTop: 10,
                    }}
                />
            </View>
            <Text style={styles.headerTitle}>Forgot password</Text>
            <Text style={styles.headerText}>
                Please enter your email address. We will send a password reset link to your registered email
                address.
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder={'Your email'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChange={(email: string) => setEmail(email)}
                    value={email}
                />
            </View>
            <TouchableOpacity onPress={submit} style={styles.buttonContainer}>

                <Text style={styles.buttonText}>SEND</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headerTitle: {
        marginTop: 30,
        fontSize: 34,
        color: '#ba45ac',
    },
    headerText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 17,
        color: '#7E8084',
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    buttonContainer: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#ba45ac',
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        padding: 15,
        fontSize: 15
    },
    closeBtn: {
        alignSelf: 'flex-start',
        marginTop: 25,
        marginLeft: 20,
    },
});

export default ForgotPasswordScreen;