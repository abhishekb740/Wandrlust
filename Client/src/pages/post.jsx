import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const Post = () => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '800px' }}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h1 className="font-bold text-large" style={{color: 'gray', fontSize: '40px'}}>What's in your Mind?</h1>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    </CardBody>
                    <CardHeader>
                        <h4 className="font-bold text-large">Caption</h4>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default Post;