import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userRecipes, recipeDetails } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userProfile = useSelector((state: any) => state.auth.userProfile);
    const recipe = useSelector((state: any) => state.recipes.recipe);
    const listData = useSelector((state: any) => state.recipes.userRecipes);

    useEffect(() => {
        dispatch(userRecipes(recipe.uid));
    }, []);

    const details = (item: any) => {
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid))
        navigation.navigate('RecipeDetailsScreen')
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
            <View style={{ alignItems: 'center', marginTop: '7%' }}>
                <Image style={styles.profileImage} source={{ uri: userProfile.image ? userProfile.image : 'https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg' }} />
                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.about}>{userProfile.about}</Text>
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
        overflow: 'hidden',
        borderColor: '#ccc',
    },
    name: {
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '10%'
    },
    about:{
        fontSize: 16, 
        color: '#7E8084', 
        textAlign: 'center', 
        margin: '5%'
    },
    recipeText:{
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
    }
});

export default ProfileScreen;