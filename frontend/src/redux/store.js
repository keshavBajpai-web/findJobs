import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import jobReducer from "./jobSlice.js"
import companyReducer from "./companySlice.js"
import applicationReducer from "./applicationSlice.js"

import {
    persistReducer,
    persistStore,
    REGISTER,
    REHYDRATE,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE
} from "redux-persist"

import storageModule from "redux-persist/lib/storage"

const storage = storageModule.default

const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    company:companyReducer,
    application:applicationReducer
})

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    REGISTER,
                    REHYDRATE,
                    PAUSE,
                    PURGE,
                    PERSIST,
                    FLUSH
                ]
            }
        })
})

export const persistor = persistStore(store)
export default store