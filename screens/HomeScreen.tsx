import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListItem from '../components/ListItem';

const latestArray = [
  {
    foodieId: 1,
    image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
    title: "Perfect Combation: Cakes & coffees for breakfast",
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
    image: 'https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282',
    title: 'Best Ramen in town! for foodie lover',
    type: 'ASIAN FOOD',
    typeColor: 'blue',
    date: '20/07/2021'
  },
  {
    foodieId: 4,
    image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
    title: 'Best Ramen in town! for foodie lover',
    type: 'ASIAN FOOD',
    typeColor: '#444',
    date: '10/12/2021'
  },
  {
    foodieId: 5,
    image: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?s=612x612',
    title: 'Best Ramen in town! for foodie lover',
    type: 'ASIAN FOOD',
    typeColor: '#444',
    date: '10/12/2021'
  }
];
const foodiesArray = [
  {
    foodieId: 1,
    image: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?s=612x612',
    title: "Perfect Combation: Cakes & coffees for breakfast",
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
];
const bookmarksArray = [
  {
    foodieId: 1,
    image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
    title: "Perfect Combation: Cakes & coffees for breakfast",
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
    image: 'https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282',
    title: 'Best Ramen in town! for foodie lover',
    type: 'ASIAN FOOD',
    typeColor: 'blue',
    date: '20/07/2021'
  },
]

const LatestScreen = () => (
  <ListItem data={latestArray} />
);

const Foodies = () => (
  <ListItem data={foodiesArray} />
);

const Bookmarks = () => (
  <ListItem data={bookmarksArray} />
);

const renderScene = SceneMap({
  latest: LatestScreen,
  foodies: Foodies,
  bookmarks: Bookmarks
});

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'latest', title: 'Latest' },
    { key: 'foodies', title: 'Foodies' },
    { key: 'bookmarks', title: 'Bookmarks' }
  ]);

  return (

    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} indicatorStyle={{ backgroundColor: '#2759d9', height: 3 }}
        labelStyle={{ color: '#8c8c8c' }}
        activeColor='#2759d9'
        style={{ backgroundColor: '#fff' }} />}
    />

  );
}

export default HomeScreen;