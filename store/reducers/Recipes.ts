import { RECIPES, LATEST_RECIPES, RECIPE_DETAILS, POST_RECIPE,MY_RECIPES } from '../actions/Recipes';

const initialState = {
    recipes: new Array,
    latestRecipes: new Array,
    bookmarks: new Array,
    myRecipes: new Array,
    recipe:{}
  };

  const RecipesReducer = (state = initialState, action:Object | any) => {
    switch (action.type) {
        case RECIPES:
            return {...state,recipes: action.recipes};
        case LATEST_RECIPES:
            return {...state,latestRecipes: action.latestRecipes};
        case POST_RECIPE:
            return {...state, recipes:state.recipes.concat(action.addRecipe)};
        case MY_RECIPES:
            return {...state,myRecipes: action.myRecipes};
        case RECIPE_DETAILS:
            const details = state.recipes.find((recipe: any) => recipe.recipeId === action.recipeId);
            return {...state,recipe:details};
        default:
            return state;
    }
  };
  
  export default RecipesReducer;