import ApplicationLogo from '@/Components/ApplicationLogo'
import React from 'react'

export default function TopBar() {

    return (
        <>
        <div className="bg-white p-4 px-5 flex select-none">
            <div className="flex-1 content-center font-light text-green-400">
                MyBooks
                <div className="w-1/4 h-0.5 bg-green-400"></div>
            </div>
            <div className="flex-none bg-green-300 p-3 text-white rounded-lg ">
                MB
            </div>
            <div className="flex-1">
                
            </div>
        </div>
        </>
    )
}
