import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ShanksImage from "../assets/images/IMG-20231006-WA0007.jpg"


export default function Cards(props) {

  const createdAtIST =  new Date(props.feed.createdAt).toLocaleString("en-US", {timeZone: 'Asia/Kolkata' ,
  weekday: "long" , year: "numeric" , month: "long" , day: "numeric" ,
  hour: "numeric" , minute: "numeric" , second: "numeric" });
  const url = `http://localhost:5000${props.feed.image}`;
  console.log(url);

  return (
    <Card className="py-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '550px' }}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <p className="text-tiny uppercase font-bold">{props.feed.name}</p>
        <small className="text-default-500">{createdAtIST}</small>
        </div>
        <h4 className="font-bold text-large">{props.feed.caption}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`http://localhost:5000${props.feed.image}`}
          width={400}
          style={{border: '3px solid black'}}
        />
      </CardBody>
      <CardHeader>
      <h4 className="font-bold text-large">{props.feed.description}</h4>
      </CardHeader>
    </Card>
  );
}
