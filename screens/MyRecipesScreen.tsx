import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { myRecipes, recipeDetails } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';


const MyRecipesScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const listData = useSelector((state: any) => state.recipes.myRecipes);

    useEffect(() => {
        dispatch(myRecipes());
    }, [])

    const details = (item: any) => {
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid));
        navigation.navigate('RecipeDetailsScreen')
    }

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <View style={styles.listView}>

                {listData.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => details(item)}>
                            <ImageBackground source={{ uri: item.image }}
                                style={styles.bgImage}>
                                <Text style={styles.title} numberOfLines={1}>{item.recipeName}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    listView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
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
    }
});

export default MyRecipesScreen;