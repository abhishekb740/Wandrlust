import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Input } from "@nextui-org/react";

const Post = () => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '800px', gap: '2rem' }}>
                    <div className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ color: 'gray', fontSize: '40px', fontWeight: 'bold' }}>What's in your mind?</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }} >
                        <div>
                            <canvas style={{ border: '1px solid black', borderRadius: '10px' }}>
                            </canvas>
                        </div>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                            <Input type="text" label="Title" radius="full" />
                            <Input type="text" label="Caption" radius="full" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div>
                            <div>
                                Choose an Image to Post:
                            </div>
                            <Input type="file" radius="full" />
                        </div>
                    </div>
                    <div>
                        <Button style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '3rem', fontSize: '25px', fontWeight: 'bold' }} startContent={<CloudUploadIcon />} variant="shadow" >
                            Create Post
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Post;