import AllEvents from '../../src/app/home/meat';
import axios from "axios";

const EventsMliky = ({ data }) => {
  return( 
 
  <AllEvents data={data} />

  )
};

export default EventsMliky;

export async function getStaticProps() {
  const res = await axios.get("http://localhost:8080/recipes/2")
  return {
    props: {
      data: res.data,
    },
  };
}
