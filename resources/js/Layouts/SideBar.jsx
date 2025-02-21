import Checkbox from '@/Components/Checkbox';
import { UseAxios } from '@/Context/AxiosContext'
import React, { useEffect, useState } from 'react'
import GenreModal from './GenreModal';
import BookModal from './BookModal';

export default function SideBar({searchResult}) {
    const {appClient} = UseAxios();
    const [checkedValues, setCheckedValues] = useState([]);

    const [state, setState] = useState({
        data : [],
        form : [], 
        genreModal : false,
        bookModal : false,
    });

    const handleGenreModal = () => {
        setState((prev) => ({
            ...prev,
            genreModal: !state.genreModal
        }))
    }

    const handleBookModal = () => {
        setState((prev) => ({
            ...prev,
            bookModal: !state.bookModal
        }))
    }

    const getGenre = async() => {
        try{
            const response = await appClient.get('get-genre')
            setState((prev) => ({
                ...prev,
                data : response.data.data
            }))
        } catch (e){
            console.log("Error Fetching", e)
        }
    }

    const search = async() => {
        try{
            const response = await appClient.post('search', state.form)
            searchResult(response.data.data)
        } catch (e){
            console.log("Error Fetching", e)
        }
    }
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target
        setCheckedValues((prevChecked) => {
            const updatedChecked = checked
                ? [...prevChecked, value]
                : prevChecked.filter((val) => val !== value)
    
            setState((prevState) => ({
                ...prevState,
                form: {
                    ...prevState.form,
                    genres: updatedChecked.join(','),
                },
            }))
    
            return updatedChecked
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev) => ({
            ...prev,
            form : {
                ...prev.form,
                [name]: value
            }
        }))
    }

    const handleSubmit = () => {
        try{
            search()
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getGenre()
    }, [])

    return (
        <>
        {state.genreModal && <GenreModal onClose={handleGenreModal}/>}
        {state.bookModal && <BookModal onClose={handleBookModal} genre={state.data}/>}
        
        <div className="flex flex-col  mr-4 max-[480px]:hidden">
            <div className="font-black text-sm ">ADD NEW DATA</div>
            <button className='bg-green-400 rounded-md py-1  text-white' onClick={handleBookModal}>NEW BOOK</button>
            <button className='bg-green-400 rounded-md py-1 my-1 text-white' onClick={handleGenreModal}>NEW GENRE</button>

            <div className="font-black text-sm ">LOOK UP</div>
            <div className="bg-black py-3 px-3 bg-opacity-5 rounded-md flex-none">
                <input type="text" name="word" placeholder="Look for Author or Title..." onChange={handleChange}
                    className=" bg-black m-0 p-0 bg-opacity-0 text-sm w-full  border-0 border-b-2 focus:outline-none focus:ring-0" />
            </div>
            <div className="font-black text-sm mt-2">GENRE</div>
            {state?.data?.map((item, index) => (
                <div  key={index}>
                    <input type='checkbox' value={item.id} onChange={handleCheckboxChange}/> {item.desc}
                </div>
            ))}
            <button className='bg-green-400 rounded-md py-1 mt-4 text-white' onClick={handleSubmit}>SEARCH</button>
        </div>
        </>
    )
}
