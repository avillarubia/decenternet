import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from '../reducers'

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)))

export const ContextProvider = (props) => {
    return <Provider store={store}>
        {props.children}
    </Provider>
}