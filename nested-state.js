const redux = require("redux");
const produce = require('immer').produce

const createStore = redux.createStore;

const initialState = {

    name: 'Akshay',
    address: {
        street: 'Golf Club Road',
        city: 'Pune',
        state: 'MH'
    },

}

const UPDATE_STREET = 'UPDATE_STREET';

const updateStreet = (street) => {
    return {
        type: UPDATE_STREET,
        payload: street
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STREET:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log('Initial State: ', store.getState());
const unsubscribe = store.subscribe(() => { console.log('Updated street:', store.getState()) });

store.dispatch(updateStreet('New Area updated...'))
unsubscribe();