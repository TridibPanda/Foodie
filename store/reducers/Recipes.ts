import { RECIPES, LATEST_RECIPES, RECIPE_DETAILS, POST_RECIPE, MY_RECIPES, USER_RECIPES,BOOKMARKS } from '../actions/Recipes';

const initialState = {
    recipes: new Array,
    latestRecipes: new Array,
    bookmarks: new Array,
    myRecipes: new Array,
    userRecipes: new Array,
    recipe: {}
};

const RecipesReducer = (state = initialState, action: Object | any) => {
    switch (action.type) {
        case RECIPES:
            return { ...state, recipes: action.recipes };
        case LATEST_RECIPES:
            return { ...state, latestRecipes: action.latestRecipes };
        case BOOKMARKS:
            return {...state,bookmarks: action.bookmarks}
        case POST_RECIPE:
            return { ...state, recipes: state.recipes.concat(action.addRecipe),latestRecipes: state.latestRecipes.concat(action.addRecipe) };
        case MY_RECIPES:
            return { ...state, myRecipes: action.myRecipes };
        case USER_RECIPES:
            return { ...state, userRecipes: action.userRecipes };
        case RECIPE_DETAILS:
            const details = state.recipes.find((recipe: any) => recipe.recipeId === action.recipeId);
            return { ...state, recipe: details };
        default:
            return state;
    }
};

export default RecipesReducer;