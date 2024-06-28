import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";

const TagInput = ({ name, errors, setValue, getValues, trigger, clearErrors, setError }) => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        const initialTags = getValues(name) || [];
        setTags(initialTags);
    }, [getValues("tags"), name]);

    const addTag = () => {
        if (tagInput.trim() !== '') {
            const newTags = [...tags, tagInput.trim()];
            setTags(newTags);
            setValue(name, newTags);
            setTagInput('');
            clearErrors("tags");
            trigger(name);
        }
    };

    const handleKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
            setValue(name, newTags);
            if (tags.length === 1) {
                setError("tags", { type: "required" });
            }
            trigger(name);
        }
    };

    const handleChange = (e) => {
        setTagInput(e.target.value);
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setValue(name, newTags);
        trigger(name);
    };

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="flex flex-wrap items-center gap-2 border-b border-blue-300 w-full md:py-1">
                {tags?.map((tag, index) => (
                    <div key={index} className=" text-sm sm:text-base bg-blue-300 text-night-25 rounded-full h-max px-3 py-1 flex items-center justify-center">
                        {tag}
                        <button type="button" className="ml-2" onClick={() => removeTag(index)}>
                            &#x2715;
                        </button>
                    </div>
                ))}
                <span className='flex items-center justify-between'>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Press Enter to add tags"
                        className="w-max md:min-w-[300px] bg-night-25 outline-none flex-1 placeholder:text-blue-300 text-sm sm:text-lg lg:text-xl py-2 rounded"
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        className=" text-blue-300 px-2 py-3 text-sm sm:text-lg lg:text-xl md:hidden block"
                    >
                        <IoMdAdd />
                    </button>
                </span>
            </div>
            {errors.tags && <span className='font-semibold underline text-danger'>Tags are required</span>}
        </div>
    );
};

export default TagInput;
