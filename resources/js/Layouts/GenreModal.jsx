import { UseAxios } from '@/Context/AxiosContext'
import React, { useState } from 'react'

export default function GenreModal({onClose}) {
    const {appClient} = UseAxios()
    const [form, setForm] = useState();
    const handleSubmit = async() => {
        try {
            appClient.post('add-genre', form)
            // window.location.reload()
        } catch (e) {
            console.error(e)
        }
    } 
    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name] : value
        }))
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold">Genre Modal</h2>
                <p className="text-sm text-gray-600">Add new Genre.</p>
                <div className='flex flex-col mt-2'>     
                    <label>Description</label>
                    <form className='flex flex-col'>
                        <input type='text' name='desc' onChange={handleChange} required placeholder='Ex. Action, Drama' className='border-0 border-b-2 focus:ring-0'/>
                        <button 
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={handleSubmit}
                            >
                            ADD
                        </button>
                    </form>
                    <button 
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={onClose}
                        >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}
