import { UseAxios } from '@/Context/AxiosContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function BookCard({data, handleModal}) {
    const {appClient} = UseAxios()

    const handleDelete = async () => {
        try{
            const response = await appClient.delete(`book/${data?.id}`)
            window.location.reload()
        } catch (e){
            console.error(e)
        }
    }
    const handleSelect = () => {
        handleModal(data)
    }
    return (
        <>
        <div className='bg-white rounded-md p-4 h-auto '>
            <div className='font-bold'>{data.title}</div>
            <div className='text-sm'>Author: {data.author}</div>
            <div className='text-sm'>Genre: {data.genre.desc}</div>
            <div className='text-sm'>ISBN: {data.isbn}</div>
            <div className='text-sm'>Date Publish: {data.date_publish}</div>
            <div className='bg-green-300 text-center mt-4 text-white rounded-md cursor-pointer hover:bg-green-200' onClick={handleSelect}>EDIT</div>
            <div className='bg-red-600 text-center mt-2 text-white rounded-md cursor-pointer hover:bg-red-500' onClick={handleDelete}>DELETE</div>
        </div>
        </>
    )
}
