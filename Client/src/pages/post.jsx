import { useState } from 'react';
import { Card, Button, Input } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../reducers/slice'

const Post = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = () => {

    // }

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
                            <Input type="text" label="Title" radius="full" />
                            <Input type="text" label="Caption" radius="full" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div>
                            <div>
                                Choose an Image to Post:
                            </div>
                            <input style={{ border: '1px solid black' }} type="file" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div>
                        <Button
                            style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '3rem', fontSize: '25px', fontWeight: 'bold' }}
                            startContent={<CloudUploadIcon />}
                            variant="shadow"
                            // onClick={handleSubmit}
                            onClick={() => {
                                dispatch(increment())
                            }}
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
