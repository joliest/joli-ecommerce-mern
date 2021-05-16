import { 
    createStore, 
    combineReducers,
    applyMiddleware,
} from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    productListReducer, 
    productDetailsReducer 
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromLocal = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFomLocal = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAddressFromLocal = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}

const paymentMethodFromLocal = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod')) 
    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocal,
        shippingAddress: shippingAddressFromLocal,
        paymentMethod: paymentMethodFromLocal,
    },
    userLogin: {
        userInfo: userInfoFomLocal
    },
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware) // enable dev tools im browser
    )
)

export default store
