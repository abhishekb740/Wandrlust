import { useState } from 'react';
import { Card, Button, Input } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { caption, description } from "../store/slices/PostSlice";

let formData;
const Post = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const captionValue = useSelector(state => state.posts.caption);
    const descriptionValue = useSelector(state => state.posts.description);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);

            setFile(selectedFile);
        }
    };

    const captionChangeHandler = (e) =>{
        dispatch(caption(e.target.value))
    }

    const descriptionChangehandler = (e) =>{
        dispatch(description(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData = new FormData();
        formData.append("myImage", file, "image.png");
        console.log(captionValue);
        console.log(descriptionValue);
        formData.append("caption", captionValue);
        formData.append("description", descriptionValue);
        const result = await axios.post(
            'http://localhost:5000/uploadPhoto',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        console.log(result);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '800px', gap: '2rem' }}>
                    <div className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ color: 'gray', fontSize: '40px', fontWeight: 'bold' }}>What's in your mind?</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }} >
                        <div style={{ width: '50%', border: '3px solid black' }} >
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                            <Input onChange={captionChangeHandler} type="text" label="Caption" radius="full" />
                            <Input onChange={descriptionChangehandler} type="text" label="Description" radius="full" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div>
                            <div>
                                Choose an Image to Post:
                            </div>
                            <input style={{ border: '1px solid black' }} type="file" name="myImage" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div>
                        <Button
                            style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '3rem', fontSize: '25px', fontWeight: 'bold' }}
                            startContent={<CloudUploadIcon />}
                            variant="shadow"
                            onClick={handleSubmit}
                        >
                            Create Post
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Post;
