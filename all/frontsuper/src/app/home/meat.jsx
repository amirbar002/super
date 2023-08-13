import React from "react";
import { Navbarweb } from "@/app/home/Navbarweb";
import Image from "next/image";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import bufferToDataUrl from 'buffer-to-data-url';

const AllEvents = ({ data }) => {
  


  data.map((ev) => {
    console.log(typeof ev.img.data, "image");
    const arrayNumbers = ev.img.data;
    if (Array.isArray(arrayNumbers)) {
        const buffer = Buffer.from(arrayNumbers);
        const result = bufferToDataUrl("potho", buffer)
        ev.img = result
        console.log(ev,'sssssssssssssssssssssssss');
        }else{
          console.log("Invalid array of numbers:");
        }
});
 

  return (
    <div>
      <Navbarweb />
      <div className="events_page">
        {data.map((ev) => (
          <Card style={{ width: "18rem" }}>
            <div key={ev.id}>
              <Card.Body>
                <Card.Img variant="top" src={ev.img} />
                <Card.Title>{ev.foodName}</Card.Title>
                <Card.Text>{ev.Ingredients}</Card.Text>
                <Card.Text>{ev.Instructions}</Card.Text>
                <p>{ev.name}</p>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;



