import { Navbarweb } from "@/app/home/Navbarweb"
import { Home } from "@/app/home/home"
import axios from "axios";
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.css";


function index() {
  return (
    <div>
      <Navbarweb/>
       <Home/>
    </div>
   
  )
}

export default index


