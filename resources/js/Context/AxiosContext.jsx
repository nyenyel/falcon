import axios from 'axios'
import React from 'react'
import { createContext, useContext } from 'react'

export const AxiosContext = createContext()

export default function AxiosProvider({children}) {
    const appClient = axios.create({
        baseURL: `http://127.0.0.1:8000/api/`,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    return(
        <AxiosContext.Provider value={{ appClient }}>
            {children}
        </AxiosContext.Provider>
    )
}

export const UseAxios = () => useContext(AxiosContext);