import { createContext, useReducer } from "react";

export const shopContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    console.log("action.type is ADD_ITEM");
    const existingItemIndex = state.items.findIndex(
      (prevItems) => prevItems.id == action.item.id
    );
    const prevStateItems = [...state.items];

    if (existingItemIndex > -1) {
      console.log("Addd Entered hERE")
      const updatedItems = { ...prevStateItems[existingItemIndex] };
      updatedItems.quantity = updatedItems.quantity + 1;
      prevStateItems[existingItemIndex] = updatedItems;
    } else {
      prevStateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: prevStateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    console.log("action.type is Removed");
    const existingItemIndex = state.items.findIndex(
      (prevItems) => prevItems.id == action.id
    );
    const prevStateItems = [...state.items];

    if (prevStateItems[existingItemIndex].quantity > 1) {
      console.log("Here")
      // prevStateItems[existingItemIndex].quantity =
      //   prevStateItems[existingItemIndex].quantity - 1;

      //   console.log( prevStateItems[existingItemIndex].quantity);
        
      //   console.log({ ...state, items: prevStateItems});
      const updatedItem = { ...prevStateItems[existingItemIndex] };
      updatedItem.quantity -=1;
      prevStateItems[existingItemIndex]=updatedItem;
      return { ...state, items: prevStateItems };
    } else {
      const updatedCartItems = prevStateItems.filter(
        (item) => item.id !== action.id
      );
      return { ...state, items: updatedCartItems };
    }
  }
}

const ShopContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  console.log(cartContext)
  return (
    <shopContext.Provider value={cartContext}>{children}</shopContext.Provider>
  );
};

export default ShopContextProvider;
