import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Recipes } from '../models/Recipes';
import { recipeDetails } from '../store/actions/Recipes';
import { view } from '../store/actions/Auth';

const ListItem = (props: any) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const details = (item: Recipes) => {
        dispatch(recipeDetails(item.recipeId));
        dispatch(view(item.uid))
        navigation.navigate('RecipeDetailsScreen')
    }

    const renderItem = (itemData: any) => {
        let date = itemData.item.timeStamp.seconds ? new Date(itemData.item.timeStamp.seconds * 1000 + itemData.item.timeStamp.nanoseconds / 1000000) : new Date();
        return (
            itemData.index === 0 ?
                <TouchableOpacity onPress={() => details(itemData.item)}>
                    <ImageBackground
                        source={{ uri: itemData.item.image }}
                        style={styles.bgImage}>
                        <Text style={styles.title} numberOfLines={2}>{itemData.item.recipeName}</Text>
                        <View style={styles.viewContainer}>
                            <View style={{ ...styles.menuView, backgroundColor: itemData.item.typeColor ? itemData.item.typeColor : 'green' }}>
                                <Text style={styles.menuTitle}>{itemData.item.type}</Text>
                            </View>
                            <Text style={styles.menuDate}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity> :
                <TouchableOpacity style={{ borderColor: '#d9d9d9', borderBottomWidth: 0.5, }} onPress={() => details(itemData.item)}>
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
                <Text style={styles.emptyText}>No recipe found!</Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ width: '100%' }}
                ListEmptyComponent={emptyComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: 200,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        marginTop: '20%',
        marginLeft: '5%',
        marginRight: '15%'
    },
    viewContainer: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '5%'
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
    menuDate: {
        color: '#fff',
        fontSize: 13,
        marginTop: '1%',
        marginLeft: '5%'
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

export default ListItem;