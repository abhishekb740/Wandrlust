import { Card, CardBody, Button } from "@nextui-org/react";

export default function UserComponent() {
    return (
        <Card className="w-3/4 h-20">
            <CardBody className="flex-row justify-between items-center px-10">
                <span>
                    User1
                </span>
                <Button variant="flat" color="danger">
                    Block
                </Button>
            </CardBody>
        </Card>
    );
}