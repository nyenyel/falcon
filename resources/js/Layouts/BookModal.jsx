import { UseAxios } from '@/Context/AxiosContext'
import React, { useEffect, useState } from 'react'

export default function BookModal({onClose, item = null, genre}) {
    const {appClient} = UseAxios()
    const [state, setState] = useState({
        form: item,
        data : item,
        genre: genre
    });
    console.log(item)
    const handleSubmit = async () => {
        try {
            appClient.post('book', state.form)
            window.location.reload()
            console.log(state.form)
        } catch (e) {
            console.error(e)
        }
    } 
    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev) => ({
            ...prev,
            form: {
                ...prev.form,
                [name] : value
            }
        }))
    }

    useEffect(()=> {
        // getGenre()
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold">Book Modal</h2>
                <p className="text-sm text-gray-600">Add new Book.</p>
                <div className='flex flex-col mt-2'>     
                        <label>Title</label>
                        <input type='text' name='title' value={state?.form?.title ?? ""} onChange={handleChange} required placeholder='Ex. Title' className='border-0 border-b-2 focus:ring-0'/>
                        <label>Author</label>
                        <input type='text' name='author' value={state?.form?.author ?? ""} onChange={handleChange} required placeholder='Ex. John Doe' className='border-0 border-b-2 focus:ring-0'/>
                        <label>ISBN</label>
                        <input type='text' name='isbn' value={state?.form?.isbn ?? ""} onChange={handleChange} required placeholder='Ex. ABS23' className='border-0 border-b-2 focus:ring-0'/>
                        <label>Select Genre</label>
                        <select 
                            id="dropdown" 
                            onChange={handleChange} 
                            name='genre_id'
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select...</option>
                            {state.genre.map((item, index) => (
                                <option key={index} value={`${item.id}`}>{item.desc}</option>
                            ))}
                        </select>
                        <label>Date Publish</label>
                        <input type='date' name='date_publish' value={state?.form?.date_publish ?? ""} onChange={handleChange} required placeholder='Ex. Action, Drama' className='border-0 border-b-2 focus:ring-0'/>
                        <button 
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={handleSubmit}
                            >
                            {item === null ? "ADD" : "UPDATE"}
                        </button>
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
