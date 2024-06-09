import React from 'react'
import Button from './Button'

const Modal = ({ modalData, setModalData }) => {

    const {
        title,
        description,
        primaryButtonText,
        primaryButtonHandler,
        secondaryButtonText,
        secondaryButtonHandler
    } = modalData;

    return (
        <div onClick={secondaryButtonHandler} className='w-screen h-screen flex items-center justify-center bg-opec absolute left-0 z-[11]'>
            <div className=''>
                <div onClick={(e) => e.stopPropagation()} className='bg-night-25 py-3 px-5 flex items-center flex-col gap-3 rounded-lg'>
                    <h3 className='text-xl font-semibold'>{title}</h3>
                    <h3 className='text-night-400'>{description}</h3>
                    <span className='flex items-center gap-3'>
                        <Button action={secondaryButtonHandler} >{secondaryButtonText}</Button>
                        <Button active action={() => { primaryButtonHandler(), setModalData() }}  >{primaryButtonText}</Button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Modal