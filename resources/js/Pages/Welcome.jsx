import ApplicationLogo from '@/Components/ApplicationLogo';
import { UseAxios } from '@/Context/AxiosContext';
import BookCard from '@/Layouts/BookCard';
import BookModal from '@/Layouts/BookModal';
import SideBar from '@/Layouts/SideBar';
import TopBar from '@/Layouts/TopBar';
import { Head, Link } from '@inertiajs/react';
import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const {appClient} = UseAxios()
    const [state, setState] = useState({
        data: [],
        genre: [],
        editModal: false,
        editData: {}
    })
    
    const handleSearchRessult = (result) => {
        setState((prev) => ({
            ...prev,
            data: result
        }))
    }

    const handleEdit = (bookData) => {
        setState((prev) => ({
            ...prev,
            editModal: !state.editModal,
            editData: bookData,
        }))
    }

    const getBook = async () => {
        try {
            const response = await appClient.get('book')
            setState((prev) => ({
                ...prev,
                data: response.data.data
            }))
        } catch (e) {
            console.error(e)
        }
    }
    const getGenre = async () => {
        try {
            const response = await appClient.get('get-genre')
            setState((prev) => ({
                ...prev,
                genre: response.data.data
            }))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=> {
        getBook()
        getGenre()
    }, [])

    return (
        <>
            {state.editModal && <BookModal onClose={handleEdit} genre={state.genre} item={state.editData}/>}
            <Head title="Technical Assesment" />
            <TopBar/>
            <div className="flex px-5 pt-4 h-screen">
                <SideBar searchResult={handleSearchRessult}/>
                <div className=" flex-1">
                    <div className="font-black text-sm ">BOOKS</div>

                    <div className="bg-black bg-opacity-5 p-2 flex-1 h-full grid grid-cols-4 gap-4">
                        {state?.data?.map((item, index) => (
                            <BookCard key={index} data={item} handleModal={handleEdit}/>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    );
}
