import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttps";

const depenObject={};

const Meals = () => {

  // const [meals, setMeals] = useState([]);

  // const[isLoading,setIsLoading]=useState(true);
  const{sendRequest,isLoading,result,error} =useHttp("http://localhost:3000/meals",depenObject,[])
  

  // useEffect(() => {
  //   // const fetchMealsMenu = async () => {
  //   //   try {
  //   //     const fetchedResult = await fetch("http://localhost:3000/meals");
  //   //     if(!fetchedResult.ok){
  //   //         throw new Error("SomeThing Went Wrong")
  //   //     }
  //   //     const fetchedMeals= await fetchedResult.json();
  //   //     setIsLoading(false)
  //   //     setMeals(fetchedMeals);
  //   //   } catch (error) {
  //   //     setIsLoading(false)
  //   //     console.log(error);
  //   //   }
  //   // };
  //   // fetchMealsMenu();
  //   sendRequest()
  // },[sendRequest]);
  // console.log(meals);
  return (

  <>
  {isLoading && <p>Data is Being Fetched</p>}
    <ul id="meals">
      {result.map((meal) => {
        return (     
           <MealItem key={meal.id} meal={meal}/>   
        );
      })}
    </ul>
  </>
  );
};

export default Meals;
