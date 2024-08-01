import { useEffect, useState } from 'react'
import React from 'react'
import { dataEndpoints } from '../services/APIs'
import { apiConnector } from '../services/apiConnector'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CategoryPosts from '@/components/core/dashboard/ManagePosts/CategoryPosts'
import Modal from '@/components/common/Modal'
import Spinner from '@/components/common/Spinner'

const ManagePosts = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalData, setModalData] = useState(null)

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", dataEndpoints.GET_ALL_CATEGORIES)
            setCategories(response?.data?.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 pb-3 text-center md:text-start font-semibold text-blue-300'>Manage Posts</h4>
            <div className='mt-5 w-full'>
                <Accordion type="single" collapsible>
                    {
                        !loading && categories.map((category, index) => (
                            <AccordionItem key={category._id} value={`item-${index}`}>
                                <AccordionTrigger>{category.title}</AccordionTrigger>
                                <AccordionContent>
                                    <CategoryPosts setModalData={setModalData} category={category} />
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                    {
                        loading && <div className='flex justify-center items-center py-5 min-h-[50vh]'><Spinner /></div>
                    }
                    {
                        !loading && categories.length === 0 && <div className='text-center'>No categories found</div>
                    }
                </Accordion>

            </div>
            {
                modalData && <Modal modalData={modalData} setModalData={setModalData} />
            }
        </div>
    )
}

export default ManagePosts