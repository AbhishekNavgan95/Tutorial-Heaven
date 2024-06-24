import React, { useState, useEffect } from 'react';

const TagInput = ({ name, control, setValue, getValues, trigger }) => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    // Load initial tags if any (useful for editing existing data)
    useEffect(() => {
        const initialTags = getValues(name) || [];
        setTags(initialTags);
    }, [getValues("tags"), name]);

    const handleKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            if (tagInput.trim() !== '') {
                const newTags = [...tags, tagInput.trim()];
                setTags(newTags);
                setValue(name, newTags); // Update form value
                setTagInput('');
                trigger(name); // Trigger validation
            }
        } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
            // Remove the last tag when backspace is pressed and input is empty
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
            setValue(name, newTags); // Update form value
            trigger(name); // Trigger validation
        }
    };

    const handleChange = (e) => {
        setTagInput(e.target.value);
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setValue(name, newTags); // Update form value
        trigger(name); // Trigger validation
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-blue-300 w-full py-1">
            {tags?.map((tag, index) => (
                <div key={index} className="bg-blue-300 text-night-25 rounded-full h-max px-3 py-1 flex items-center justify-center">
                    {tag}
                    <button type="button" className="ml-2" onClick={() => removeTag(index)}>
                        &#x2715;
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={tagInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Press Enter to add tags"
                className="bg-night-25 outline-none flex-1 placeholder:text-blue-300 text-xl w-max py-2 rounded"
            />
        </div>
    );
};

export default TagInput;
