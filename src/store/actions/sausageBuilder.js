import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://sauce-edge.firebaseio.com/ingredients.json' )
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};



// export const initSausages = () => {
//     return dispatch => {
//         axios.get( 'https://sauce-edge.firebaseio.com/sausages.json' )
//             .then( response => {
//                dispatch(setSausages(response.data));
//             } )
//             .catch( error => {
//                 dispatch(fetchSausagesFailed());
//             } );
//     };
// };

// export const setSausages = ( sausages ) => {
//     return {
//         type: actionTypes.SET_SAUSAGES,
//         sausages: sausages
//     };
// };

// export const fetchSausagesFailed = () => {
//     return {
//         type: actionTypes.FETCH_SAUSAGES_FAILED
//     };
// };