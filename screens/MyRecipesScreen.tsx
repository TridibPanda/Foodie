import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MyRecipesScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.screen}>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

});

export default MyRecipesScreen;