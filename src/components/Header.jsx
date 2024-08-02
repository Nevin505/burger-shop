import { useContext } from "react";
import brandLogo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { shopContext } from "../store/ShopContext";
import { userProgressContext } from "../store/UserPorgress";

const Header = () => {
  const shopCtx=useContext(shopContext);
  const userProgressCtx=useContext(userProgressContext);

  const cartItem=shopCtx.items.reduce((a,b)=>{
    return a+b.quantity
  },0)
  
  const handleShowCart=()=>{
    console.log("clciked");
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={brandLogo} alt="Restuarent Brand-Logo" width={60} />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly="true" onClick={handleShowCart}>Cart({cartItem})</Button>
      </nav>
    </header>
  );
};

export default Header;
