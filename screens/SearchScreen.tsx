import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Text,
    Alert,
    Dimensions
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Recipes } from '../models/Recipes'
import { recipeDetails } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';


const SearchScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const foodiesArray = useSelector((state: any) => state.recipes.recipes);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const details = async (item: Recipes) => {
        await AsyncStorage.getItem('Recent').then((req: any) => {
            const getItem = JSON.parse(req);
            console.log(getItem, 'hi GET ITEM HERE');
            if (getItem === null) {
                let recentArr = [item];
                AsyncStorage.setItem('Recent', JSON.stringify(recentArr));
            } else {
                for (let i = 0; i < getItem.length; i++) {
                    if (item.recipeId === getItem[i].recipeId) {
                        getItem.splice(i, 1);
                    }
                }
                getItem.unshift(item);
                AsyncStorage.setItem('Recent', JSON.stringify(getItem));
            }
        });
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid))
        navigation.navigate('RecipeDetailsScreen');
        recentfn();
    };

    const removeAlert = (item: Recipes) => {
        if (!search) {
            Alert.alert(
                "Clear",
                "Do you want to clear this search history?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => remove(item) },
                ],
                { cancelable: false }
            );
        }
    }

    const remove = async (item: Recipes) => {
        await AsyncStorage.getItem('Recent').then((req: any) => {
            const getItem = JSON.parse(req);
            for (let i = 0; i < getItem.length; i++) {
                if (item.recipeId === getItem[i].recipeId) {
                    getItem.splice(i, 1);
                }
            }
            AsyncStorage.setItem('Recent', JSON.stringify(getItem));
        });
        recentfn();
    };

    const recentfn = async () => {
        await AsyncStorage.getItem('Recent').then((req: any) => {
            const getItem = JSON.parse(req);
            console.log(getItem, 'hi GET ITEM HERE');
            if (getItem !== null) {
                setData(getItem);
            }
        });
    };

    useEffect(() => {
        recentfn();
    }, []);

    const searchFn = (search: string) => {
        setSearch(search);
        const filteredTags = foodiesArray.filter((item: Recipes) => {
            let tagLowercase = item.recipeName.split(" ").join("").toLowerCase();

            let searchTermLowercase = search.split(" ").join("").toLowerCase();

            return tagLowercase.indexOf(searchTermLowercase) > -1;
        });
        setSearchData(filteredTags);
    };

    const renderItem = (itemData: any) => {
        let date = itemData.item.timeStamp.seconds ? new Date(itemData.item.timeStamp.seconds * 1000 + itemData.item.timeStamp.nanoseconds / 1000000) : new Date();
        return (
            <TouchableOpacity style={{ borderColor: '#d9d9d9', borderBottomWidth: 0.5, }} onPress={() => details(itemData.item)} onLongPress={() => removeAlert(itemData.item)} >
                <View style={styles.listView}>
                    <Image source={{ uri: itemData.item.image }} style={styles.image} />
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle} numberOfLines={2}>{itemData.item.recipeName}</Text>
                        <View style={styles.listitemview}>
                            <View style={{ ...styles.menuView, backgroundColor: itemData.item.typeColor ? itemData.item.typeColor : 'green' }}>
                                <Text style={styles.menuTitle}>{itemData.item.type}</Text>
                            </View>
                            <Text style={styles.itemDate}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    const emptyComponent = () => {
        return (
            <View style={styles.emptyContainer} >
                <Text style={styles.emptyText}>{search ? 'No recipe found!' : ""}</Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.passwordContainer}>
                <Ionicons
                    style={{ alignSelf: 'center', padding: 5 }}
                    name='ios-arrow-back'
                    size={30}
                    color='#000'
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    style={styles.passwordText}
                    placeholder="Search"
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholderTextColor="#000"
                    onChangeText={(search) => searchFn(search)}
                    value={search}
                />
                {search ? <Ionicons
                    style={{ alignSelf: 'center', padding: 5 }}
                    size={30}
                    name='close'
                    onPress={() => setSearch('')}
                    color="#000"
                /> : null}
            </View>
            {!search && data.length ? <Text style={styles.recentText}>Recent</Text> : null}
            <View style={{ flex: 1, }} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={search ? searchData : data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    style={{ width: '100%' }}
                    ListEmptyComponent={emptyComponent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    passwordContainer: {
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',
        height: 42,
        marginBottom: 5,
        marginTop: '12%',
        justifyContent: 'center'
    },
    passwordText: {
        flex: 1,
        color: '#000',
        padding: 10,
        fontSize: 20,
    },
    recentText: {
        color: '#ccc',
        fontSize: 20,
        padding: 10,
    },
    listView: {
        flexDirection: 'row',
        marginLeft: '3%',
        marginTop: 20,
        marginBottom: 20,
    },
    image: {
        height: 90,
        width: 150,
    },
    itemView: {
        marginLeft: '2%',
        justifyContent: 'center',
        marginRight: '60%',
    },
    itemTitle: {
        color: '#000',
        fontSize: 16,
        marginRight: '5%',
    },
    listitemview: {
        flexDirection: 'row',
        marginTop: '10%'
    },
    itemDate: {
        color: '#8c8c8c',
        fontSize: 10,
        marginTop: '3%',
        marginLeft: '5%'
    },
    menuView: {
        height: 25,
        width: 100,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuTitle: {
        color: '#fff',
        fontSize: 13,
    },
    emptyContainer: {
        marginTop: Dimensions.get("window").height * 0.3,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "#ccc",
        fontSize: 16
    },
});

export default SearchScreen;