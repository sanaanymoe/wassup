import React, { createContext, useContext, useReducer,useState, useEffect } from "react";
import firebase from 'firebase'
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children}) => {

    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
        
    )
};

export const useStateValue = () => useContext(StateContext);