
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Link from "next/link"

export const Home = ()=>(
  <div>
    <Link href="events/meat" >מאכלים בשרים</Link>
    <br/>
    <Link href="events/milk" >מאכלים חלבי</Link>
    <br/>
    <Link href="meat" >מאכלים פרווה</Link>
    <br/>
    <Link href="meat" >מאכלים צמחוני</Link>
    <br/>
    <Link href="meat" >מאכלים קיהוחים</Link>
  </div> 
)