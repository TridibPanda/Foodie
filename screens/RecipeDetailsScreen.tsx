import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { bookmarks } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';

const RecipeDetailsScreen = () => {

    const [isBooked, setIsBooked] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const recipe = useSelector((state: any) => state.recipes.recipe);
    const Bookmarks = useSelector((state: any) => state.recipes.bookmarks);

    useEffect(() => {
        dispatch(view(recipe.uid));
        if (Bookmarks.find((data: any) => data.recipeId === recipe.recipeId)) {
            setIsBooked(true);
        }
    }, []);

    const addBookmarks = async () => {
        setIsBooked(true);
        await AsyncStorage.getItem('Bookmarks').then((req: any) => {
            const getItem = JSON.parse(req);
            console.log(getItem, 'hi GET ITEM HERE');
            if (getItem === null) {
                let Arr = [recipe];
                AsyncStorage.setItem('Bookmarks', JSON.stringify(Arr));
            } else {
                getItem.unshift(recipe);
                AsyncStorage.setItem('Bookmarks', JSON.stringify(getItem));
            }
        });
        dispatch(bookmarks());
    };

    const remove = async () => {
        setIsBooked(false);
        await AsyncStorage.getItem('Bookmarks').then((req: any) => {
            const getItem = JSON.parse(req);
            for (let i = 0; i < getItem.length; i++) {
                if (recipe.recipeId === getItem[i].recipeId) {
                    getItem.splice(i, 1);
                }
            }
            AsyncStorage.setItem('Bookmarks', JSON.stringify(getItem));
        });
        dispatch(bookmarks());
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                {recipe.recipeName}
            </Text>
            <Image style={styles.image} source={{ uri: recipe.image }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                    {recipe.description}
                </Text>
            </ScrollView>
            {isBooked ?
                <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: '#eb635b' }} onPress={remove}>
                    <Text style={styles.buttonTitle}>REMOVE</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: '#2759d9' }} onPress={addBookmarks}>
                    <Text style={styles.buttonTitle}>ADD TO MY BOOKMARKS</Text>
                </TouchableOpacity>
            }
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
    buttonContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
});

export default RecipeDetailsScreen;