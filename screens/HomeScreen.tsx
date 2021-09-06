import React, { useState,useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch,useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { recipes, latestRecipes} from '../store/actions/Recipes';


const bookmarksArray = [
  {
    foodieId: 1,
    image: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006',
    title: "Perfect Combation: Cakes & coffees for breakfast",
    type: 'ASIAN FOOD',
    typeColor: '#005',
    date: '10/07/2021'
  },
]


const HomeScreen = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'latest', title: 'Latest' },
    { key: 'foodies', title: 'Foodies' },
    { key: 'bookmarks', title: 'Bookmarks' }
  ]);

  const latestArray = useSelector((state: any) => state.recipes.latestRecipes);
  const LatestScreen = () => (
    <ListItem data={latestArray} />
  );
  const foodiesArray = useSelector((state: any) => state.recipes.recipes);
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
  
  useEffect(()=>{
    dispatch(latestRecipes());
    dispatch(recipes());
  },[])

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