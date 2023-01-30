import React, { createContext, useReducer, useEffect } from 'react'

export const NavContext = createContext()
export const NavContextUpdate = createContext()

const initialState = { roomType: "CHAT", chat: {}, voice: {} }


const navReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ROOM_TYPE":
            return { ...state, roomType: action.payload }
        case "CHAT_ID":
            return { ...state, chat: { ...action.payload } }
        case "CHAT_SETTINGS":
            return { ...state, chatSettings: action.payload }
        case "VOICE_ID":
            return { ...state, voice: { ...action.payload } }
        case "VOICE_SETTINGS":
            return { ...state, voiceSettings: action.payload }
        case "VOICE_REFETCH":
            return { ...state, voiceRefetch: action.payload }
        case "VOICE_TOKEN":
            return { ...state, voiceToken: action.payload }
        case "POST_LIST_REFETCH":
            return { ...state, postListRefetch: action.payload }

        default:
            return state;
    }
}

export const NavContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(navReducer, initialState, () => {
        const localData = localStorage.getItem("nav")
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(() => {
        localStorage.setItem("nav", JSON.stringify(state))
        console.log(state)
        // console.log(document)
    }, [state])


    return (
        <NavContext.Provider value={state}>
            <NavContextUpdate.Provider value={dispatch}>
                {children}
            </NavContextUpdate.Provider>
        </NavContext.Provider>
    )
}