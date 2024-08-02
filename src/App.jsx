import { useReducer, useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ShopContextProvider from "./store/ShopContext";
import UserPorgressProvider from "./store/UserPorgress";
import Checkout from "./components/Checkout";

const reducreFn=(state,action)=>{
  if(action.type=='add'){
      return {count:state.count++};
  }
  else{
    return{count:state.count--}
  }
return state


}

function App() {

 const[state,dispatchAction]= useReducer(reducreFn,{count:0})

 const incree=()=>{
 console.log(state)
 console.log("Added")

  dispatchAction({type:'add'})
 }
 
 const decree=()=>{
 console.log(state)
 console.log("decremenat")

  dispatchAction({type:'dec'})
 }
//  console.log(state)

  return (
    <>
    {/* {state.count}
    <button onClick={incree}>inc</button>
    <button onClick={decree}>decr</button> */}
    <UserPorgressProvider>
      <ShopContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </ShopContextProvider>
      </UserPorgressProvider>
    </>
  );
}

export default App;
