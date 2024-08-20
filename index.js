const redux = require("redux");
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()

const applyMiddleWare = redux.applyMiddleware


const CAKE_ORDERED = "CAKE_ORDERED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
  };
}
function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
  };
}

const cakeInitialState = {
  numOfCakes: 10,
};
const iceCreamInitialState = {
  numOfIceCreams: 10,
};

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    cake : cakeReducer,
    icecream : iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("Initial State:", store.getState());

const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
});

// console.log("---Cake SOLD---");
store.dispatch(orderCake());
// console.log("---Cake SOLD---");
store.dispatch(orderCake());
// console.log("---Ice-Cream SOLD---");
store.dispatch(orderIceCream());
// console.log("---Cake SOLD---");
store.dispatch(orderCake());
// console.log("---Ice-Cream SOLD---");
store.dispatch(orderIceCream());

unsubscribe();
