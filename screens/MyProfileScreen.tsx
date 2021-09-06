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
import { useSelector } from 'react-redux';

const listData = [
    {
        foodieId: 1,
        image: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?s=612x612',
        title: "Main Entree",
        type: 'ASIAN FOOD',
        typeColor: '#005',
        date: '10/07/2021'
    },
    {
        foodieId: 2,
        image: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?s=612x612',
        title: 'Best Ramen in town! for foodie lover',
        type: 'ASIAN FOOD',
        typeColor: 'red',
        date: '1/07/2021'
    },

    {
        foodieId: 3,
        image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
        title: 'Best Ramen in town! for foodie lover',
        type: 'ASIAN FOOD',
        typeColor: '#444',
        date: '10/12/2021'
    },
    {
        foodieId: 4,
        image: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?s=612x612',
        title: 'Best Ramen in town! for foodie lover',
        type: 'ASIAN FOOD',
        typeColor: '#444',
        date: '10/12/2021'
    },
    {
        foodieId: 5,
        image: 'https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282',
        title: 'Best Ramen in town! for foodie lover',
        type: 'ASIAN FOOD',
        typeColor: 'blue',
        date: '20/07/2021'
    },
    {
        foodieId: 6,
        image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
        title: 'Best Ramen in town! for foodie lover',
        type: 'ASIAN FOOD',
        typeColor: '#444',
        date: '10/12/2021'
    },
];


const MyProfileScreen = () => {

    const navigation = useNavigation();

    const renderItem = (itemData: any) => {
        return (
            <TouchableOpacity onPress={()=> navigation.navigate('RecipeDetailsScreen', itemData.item.type ) }>
                <ImageBackground source={{ uri: itemData.item.image }}
                    style={styles.bgImage}>
                    <Text style={styles.title} numberOfLines={1}>{itemData.item.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={{ alignItems: 'center', marginTop: '7%' }}>
                <Image style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    borderWidth: 2,
                    overflow: 'hidden',
                    borderColor: '#ccc',
                }} source={{ uri: 'https://avatars.githubusercontent.com/u/52310053?s=400&u=44545b8cff208f6e9a2fcf145827d4cc9d7ffb1f&v=4' }} />
                <Text style={{ fontSize: 25, color: '#000', textAlign: 'center', marginTop: '5%',marginHorizontal:'10%' }}>Tridib Panda</Text>
                <Text style={{ fontSize: 16, color: '#7E8084', textAlign: 'center',margin: '5%'}}>This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.</Text>
            </View>
            <Text style={{ fontSize: 25, color: '#000', textAlign: 'center', }}>Recipes</Text>
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
    listView: {
        flexDirection: 'row',
        marginVertical:5
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

export default MyProfileScreen;