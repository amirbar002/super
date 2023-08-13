
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Link from "next/link"

export const Navbarweb = ()=>(
  <div>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >ספר המתכונים האיילתי</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">עמוד הבית</Nav.Link>
            <Nav.Link href="abuot">הסבר</Nav.Link>
            <Nav.Link href="http://localhost:3000/addRecipes">הוסיף מתכון</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
  </div> 
)