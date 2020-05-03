import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false,
    INGREDIENT_PRICES: null
};


const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - state.INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedSt );
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            ketchup: action.ingredients.kentuckyketchup.quantity,
            sourcream: action.ingredients.sourcream.quantity,
            mustard: action.ingredients.mustard.quantity,
            jalapeno: action.ingredients.thousandislands.quantity,
            bbq: action.ingredients.bbq.quantity,
            mayo: action.ingredients.bluecheese.quantity,
            knackwurst: action.ingredients.knackwurst.quantity,
            bratwurst: action.ingredients.bratwurst.quantity,
            andouille: action.ingredients.andouille.quantity,
            chorizo: action.ingredients.chorizo.quantity,
        },

        INGREDIENT_PRICES: {
            sourcream: action.ingredients.sourcream.price,
            ketchup: action.ingredients.kentuckyketchup.price,
            mustard: action.ingredients.mustard.price,
            bbq: action.ingredients.bbq.price,
            knackwurst: action.ingredients.knackwurst.price,
            bratwurst: action.ingredients.bratwurst.price,
            chorizo: action.ingredients.chorizo.price,
            mayo: action.ingredients.bluecheese.price,
            jalapeno: action.ingredients.thousandislands.price,
            andouille: action.ingredients.andouille.price},

        totalPrice: 0,
        error: false,
        building: false,

        

    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};


const setSausages = (state, action) => {
    return updateObject( state, {
        sausages: {
            knackwurst: action.sausages.knackwurst,
            bratwurst: action.sausages.bratwurst,
            andouille: action.sausages.andouille,
            chorizo: action.sausages.chorizo
        },
        totalSausages: 0
    } );
};

const fetchSausagesFailed = (state, action) => {
    return updateObject( state, { error: true } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        case actionTypes.SET_SAUSAGES: return setSausages(state, action);    
        case actionTypes.FETCH_SAUSAGES_FAILED: return fetchSausagesFailed(state, action);
        default: return state;
    }
};

export default reducer;