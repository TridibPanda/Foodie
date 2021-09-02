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

const MyRecipesScreen = () => {

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <View style={styles.listView}>

                {listData.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity key={index} >
                            <ImageBackground source={{ uri: item.image }}
                                style={styles.bgImage}>
                                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
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
    },
    title: {
        color: '#fff',
        fontSize: 16,
        padding: 15
    }
});

export default MyRecipesScreen;