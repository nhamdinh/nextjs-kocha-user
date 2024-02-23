import { getAllProducts } from "@/apis/apisProduct";
import Home from "./componentsUtil/Home";
const HomePage = async (props: any) => {
  const res = await getAllProducts({});
  const data = await res.json();

  return <Home products={data ?? []}></Home>;
};
export default HomePage;
