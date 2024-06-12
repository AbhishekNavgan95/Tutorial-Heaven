import React, {useState, useRef} from 'react'
import Button from '../../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../../../services/operations/userAPI';

const UpdateProfilePic = ({user}) => { 
    
    const [file, setFile] = useState(user?.image?.url)
    const {token} = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
  
    const updateImage = (e) => {
      const file = e.target.files[0];
      setFile(URL.createObjectURL(file));
    };
    
    const submitProfilePic = async (e) => {
        setLoading(true)
        e.preventDefault()
        const file = e.target[0].files[0];
        const res = await updateProfilePicture(file, token, dispatch)
        if (res) {
            setFile(user?.image?.url);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        setLoading(false)
    }

    return (
        <form onSubmit={submitProfilePic} className='flex items-center justify-start gap-10 pt-10'>
            <img src={file} className='max-w-[150px] rounded-full border-4 aspect-square border-blue-300 ' alt="" />
            <span className='flex gap-3 items-end justify-center flex-col'>
                <label
                    htmlFor="userImage"
                    className='border w-full px-10 rounded-lg py-2 border-blue-300 text-blue-300 shadow-sm shadow-night-300 hover:shadow-night-600 hover:shadow-md transition-all duration-300  active:scale-[0.95]'
                >
                    Select
                </label>
                <input
                    type="file"
                    onChange={updateImage}
                    accept="image/*"
                    className='hidden'
                    id='userImage'
                    name="userImage"
                    ref={fileInputRef}
                />
                <Button disabled={loading} styles={"w-max"} active>Update Image</Button>
            </span>
        </form>
    )
}

export default UpdateProfilePic