import { useContext } from "react";
import Modal from "./UI/Modal";
import { shopContext } from "../store/ShopContext";
import { currencyFromatter } from "../utils/formatting";
import Button from "./UI/Button";
import { userProgressContext } from "../store/UserPorgress";
import CartItem from "./CartItem";

const Cart = () => {
  const shopCtx = useContext(shopContext);

  const userProgressCtx = useContext(userProgressContext);

  const cartTotal = shopCtx.items.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);

  const closeModal = () => {
    userProgressCtx.hideCart();
  };

  const handleGoToCheckout=()=>{
    userProgressCtx.showCheckout();
  }



  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart"?closeModal:null}>
      <h2>Your Cart</h2>
      <ul>
        {shopCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.quantity * item.price} onIncrease={()=>{shopCtx.addItem(item)}}    onDecrease={()=>{shopCtx.removeItem(item.id)}}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFromatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={closeModal}>
          Close
        </Button>
      { shopCtx.items.length>0 && <Button onClick={handleGoToCheckout}>Go To Check-Out</Button>}
      </p>
    </Modal>
  );
};

export default Cart;
