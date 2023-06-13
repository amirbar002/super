import { Home } from "@/app/home/home"
import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.css'

function homepage() {
  return (
    <div>home
       <Home/>
       <Link href="abuot">abuot</Link>
       <br/>
       <Link href="addRecipes">הוסיף מתכון</Link>
       <br/>
       <Link href="shop">shop</Link>
       <button className="btn btn-primary">Primary Button</button>
    </div>
   
  )
}

export default homepage