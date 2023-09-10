
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Link from "next/link"

export const Home = ()=>(
  <div>
    <Link href="events/meat" >מאכלים בשרים</Link>
    <br/>
    <Link href="events/mliky" >מאכלים חלבי</Link>
    <br/>
    <Link href="events/furfood" >מאכלים פרווה</Link>
    <br/>
    <Link href="events/vegan" >מאכלים צמחוני</Link>
    <br/>
    <Link href="events/dessert" >מאכלים קיהוחים</Link>
  </div> 
)