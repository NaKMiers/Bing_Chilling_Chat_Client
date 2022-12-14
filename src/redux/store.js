// import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import reducers from './reducer'
import { createStore } from 'redux'

// function saveToLocalStorage(store) {
//    try {
//       const serializedStore = JSON.stringify(store)
//       window.localStorage.setItem('store', serializedStore)
//    } catch (e) {
//       console.log(e)
//    }
// }

// function loadFromLocalStorage() {
//    try {
//       const serializedStore = localStorage.getItem('store')
//       if (serializedStore === null) return undefined
//       return JSON.parse(serializedStore)
//    } catch (e) {
//       console.log(e)
//       return undefined
//    }
// }
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const persistedState = loadFromLocalStorage()

// const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)))

// store.subscribe(() => saveToLocalStorage(store.getState()))

// export default store

const store = createStore(
   reducers,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store