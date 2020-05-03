import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchasesausageSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_sausage_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchasesausageFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_sausage_FAIL,
        error: error
    };
}

export const purchasesausageStart = () => {
    return {
        type: actionTypes.PURCHASE_sausage_START
    };
};

export const purchasesausage = ( orderData, token ) => {
    return dispatch => {
        dispatch( purchasesausageStart() );
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch( purchasesausageSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchasesausageFail( error ) );
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};