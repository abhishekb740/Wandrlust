import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ShanksImage from "../../public/IMG-20231006-WA0007.jpg"

export default function Cards(props) {
  return (
    <Card className="py-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <p className="text-tiny uppercase font-bold">Author Name</p>
        <small className="text-default-500">Date and time</small>
        </div>
        <h4 className="font-bold text-large">Title</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2" style={{display: 'flex', justifyContent: 'center'}}>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={ShanksImage}
          width={500}
        />
      </CardBody>
      <CardHeader>
      <h4 className="font-bold text-large">Caption</h4>
      </CardHeader>
    </Card>
  );
}
