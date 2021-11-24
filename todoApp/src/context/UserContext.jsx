import React from 'react'

import {createContext, useState} from 'react'

export const UserContext = createContext()

export function UserContextProvider(props){
    
    const [dataUser, setDataUser] = useState({
        name : '',
        email : '',
        phone: '',
        address:'',
        isLogin:false,
    })
    return(
        <UserContext.Provider value={{dataUser, setDataUser}}>
            {props.children}
        </UserContext.Provider>
    )
}
