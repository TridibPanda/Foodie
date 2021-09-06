import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const RecipeDetailsScreen = () => {

    const navigation = useNavigation();
    const recipe = useSelector((state: any) => state.recipes.recipe);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                {recipe.recipeName}
            </Text>
            <Image style={styles.image} source={{ uri: recipe.image  }} />
            <ScrollView  showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                   {recipe.description}
                </Text>
            </ScrollView>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>ADD TO MY BOOKMARKS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        color: '#000',
        marginVertical: 10,
        marginHorizontal: 25
    },
    image: {
        width: '100%',
        height: 220
    },
    description: {
        fontSize: 16,
        // textAlign:'center',
        color: '#000',
        marginVertical: '10%',
        marginHorizontal: 25
    },
    buttonContainer:{
        backgroundColor:'#2759d9',
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle:{
        fontSize: 16,
        textAlign:'center',
        color: '#fff',
    },
});

export default RecipeDetailsScreen;