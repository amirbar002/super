import AllEvents from '../../src/app/home/meat';
import axios from "axios";

const EventsPage = ({ data }) => {
  return <AllEvents data={data} />;
 
  
};

export default EventsPage;

export async function getStaticProps() {
  const res = await axios.get("http://localhost:8080/recipes/5")
  console.log(res.data, 'res.data');
  return {
    props: {
      data: res.data,
    },
  };
}

