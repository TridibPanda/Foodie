import Firebase, { db } from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RECIPE_DETAILS = 'RECIPE_DETAILS';
export const RECIPES = 'RECIPES';
export const LATEST_RECIPES = 'LATEST_RECIPES';
export const POST_RECIPE = 'POST_RECIPE';
export const MY_RECIPES = 'MY_RECIPES';
export const USER_RECIPES = 'USER_RECIPES';
export const BOOKMARKS = 'BOOKMARKS';

//recipes
export const recipes = () => {
    return (dispatch: Object | any) => {
        var data = new Array;
        db.collection('RecipeList')
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    dispatch({ type: RECIPES, recipes: data });
                }
            }).catch((error) => {
                console.error('Error adding document: ', error);
            })
    }
};

// latest recipes
export const latestRecipes = () => {
    return (dispatch: Object | any) => {
        var data = new Array;
        db.collection('RecipeList').orderBy( 'timeStamp','desc')
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    dispatch({ type: LATEST_RECIPES, latestRecipes: data });
                }
            }).catch((error) => {
                console.error('Error adding document: ', error);
            })
    }
};

// Post recipe
export const postRecipe = (recipeName: string, selectedValue: any, description: string, pickedImage: string,navigation:any) => {
    const recipeId = Math.random().toString(36).replace('0.', '') + new Date().getTime();
    const timeStamp = new Date();
    return async (dispatch: Object | any) => {
        const uid = await AsyncStorage.getItem('uid');

        // Image Upload 
        const response = await fetch(pickedImage);
        const blob = await response.blob();
        var ref = Firebase.storage()
            .ref()
            .child(`RecipeImage/` + `${recipeId}.jpeg`);
        await ref.put(blob)

        // Image Download
        var ref = Firebase.storage()
            .ref()
            .child(`RecipeImage/` + `${recipeId}.jpeg`);
        const image = await ref.getDownloadURL();

        // save recipe in firestore
        if (image) {
            db.collection('RecipeList')
                .doc(recipeId)
                .set({
                    recipeName: recipeName,
                    description: description,
                    type: selectedValue.type,
                    typeColor: selectedValue.typeColor,
                    uid: uid,
                    image: image,
                    recipeId: recipeId,
                    timeStamp: timeStamp
                })
                .then(() => {
                    console.log('Document saved');
                    navigation.navigate('HomeScreen');
                    dispatch({
                        type: POST_RECIPE,
                        addRecipe: {
                            recipeName: recipeName,
                            description: description,
                            type: selectedValue.type,
                            typeColor: selectedValue.typeColor,
                            uid: uid,
                            image: image,
                            recipeId: recipeId,
                            timeStamp: timeStamp
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                });
        } else {
            alert("Something wrong try again later")
        }
    }
};

//My recipes 
export const myRecipes = () => {
    return async (dispatch: Object | any) => {
        const uid = await AsyncStorage.getItem('uid');
        var data = new Array;
        db.collection('RecipeList').where('uid','==',uid)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    dispatch({ type: MY_RECIPES, myRecipes: data });
                }
            }).catch((error) => {
                console.error('Error adding document: ', error);
            })
    }
};

//user recipes 
export const userRecipes = (uid:string | null) => {
    return async (dispatch: Object | any) => {
        var data = new Array;
        db.collection('RecipeList').where('uid','==',uid)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    dispatch({ type: USER_RECIPES, userRecipes: data });
                }
            }).catch((error) => {
                console.error('Error adding document: ', error);
            })
    }
};

// recipe details
export const recipeDetails = (id: string) => {
    return { type: RECIPE_DETAILS, recipeId: id };
};

//bookmarks recipe
export const bookmarks = () => {
    return async (dispatch: Object | any) => {
    await AsyncStorage.getItem('Bookmarks').then((req:any) => {
        const getItem = JSON.parse(req);
        console.log(getItem, 'hi GET ITEM HERE');
        if (getItem !== null) {
            dispatch({ type: BOOKMARKS, bookmarks: getItem });
        }
    });
};
};