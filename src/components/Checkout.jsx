import { useContext } from "react";
import Modal from "./UI/Modal";
import { shopContext } from "../store/ShopContext";
import { currencyFromatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { userProgressContext } from "../store/UserPorgress";

const Checkout = () => {
  const cartCtx = useContext(shopContext);

  const userProgrees = useContext(userProgressContext);

  const cartTotal = cartCtx.items.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);

  const handleClose = () => {
    userProgrees.hideCheckout();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData=Object.fromEntries(formData.entries());
    fetch('http://localhost:3000/orders',{method:'POST',
        headers:{
           'Content-Type':'application/json'
        },
        body:JSON.stringify({order:{
            items:cartCtx.items,
            customer:customerData
        }})
    })

  };

  return (
    <Modal open={userProgrees.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount {currencyFromatter.format(cartTotal)}</p>
        <Input label="full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
