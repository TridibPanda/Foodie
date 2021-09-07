import React, { useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Recipes } from '../models/Recipes';
import { myRecipes, recipeDetails } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';


const MyRecipesScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const listData = useSelector((state: any) => state.recipes.myRecipes);

    useEffect(() => {
        dispatch(myRecipes());
    }, [])

    const details = (item: Recipes) => {
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid));
        navigation.navigate('RecipeDetailsScreen')
    }

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            {listData.length ?
                <View style={styles.listView}>
                    {listData.map((item: Recipes, index: number) => {
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
                :
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}> No recipes available start adding some.</Text>
                </View>
            }
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
    },
    emptyContainer:{
        marginVertical: Dimensions.get("window").height * 0.4,
        marginHorizontal: Dimensions.get("window").width * 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText:{
        color: "#ccc", 
        fontSize: 16
    },
});

export default MyRecipesScreen;