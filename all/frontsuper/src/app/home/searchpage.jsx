import React from "react";
import Image from "next/image";
import '../../app/globals.css'
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from 'react-redux';
import bufferToDataUrl from 'buffer-to-data-url';


const Searchpage = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  
    const modifiedData = data.map((ev) => {
      console.log(typeof ev.img.data, "image");
      const arrayNumbers = ev.img.data;
      if (Array.isArray(arrayNumbers)) {
        const buffer = Buffer.from(arrayNumbers);
        const result = bufferToDataUrl("potho", buffer);
        return { ...ev, img: result }; 
      } else {
        console.log("Invalid array of numbers:");
        return ev
      }
    });
  
    return ( 
      <div>
        <div className="bigdiveventpage">
        <div className="events_page">
          {modifiedData.map((ev) => (
            <Card key={ev.id} className="cardmeat" style={{ width: "18rem" }}>
              <div >
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
      </div>
    );
};

export default Searchpage;



