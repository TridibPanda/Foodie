import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListItem = (props: any) => {
    const navigation = useNavigation();

    const renderItem = (itemData: any) => {
        return (
            itemData.index === 0 ?
                <TouchableOpacity>
                    <ImageBackground
                        source={{ uri: itemData.item.image }}
                        style={styles.bgImage}>
                        <Text style={styles.title} numberOfLines={2}>{itemData.item.title}</Text>
                        <View style={styles.viewContainer}>
                            <View style={{ ...styles.menuView, backgroundColor: itemData.item.typeColor ? itemData.item.typeColor : 'green' }}>
                                <Text style={styles.menuTitle}>{itemData.item.type}</Text>
                            </View>
                            <Text style={styles.menuDate}>{itemData.item.date}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity> :
                <TouchableOpacity style={{ borderColor: '#d9d9d9', borderBottomWidth: 0.5 }}>
                    <View style={styles.listView}>
                        <Image source={{ uri: itemData.item.image }} style={styles.image} />
                        <View style={styles.itemView}>
                            <Text style={styles.itemTitle} numberOfLines={2}>{itemData.item.title}</Text>
                            <View style={styles.listitemview}>
                                <View style={{ ...styles.menuView, backgroundColor: itemData.item.typeColor ? itemData.item.typeColor : 'green' }}>
                                    <Text style={styles.menuTitle}>{itemData.item.type}</Text>
                                </View>
                                <Text style={styles.itemDate}>{itemData.item.date}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ width: '100%' }}
            // ListEmptyComponent={emptyComponent}
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
        marginBottom: 20
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
    }
});

export default ListItem;