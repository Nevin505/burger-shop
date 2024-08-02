import { useContext } from "react"
import { currencyFromatter } from "../utils/formatting"
import Button from "./UI/Button"
import { shopContext } from "../store/ShopContext"

const MealItem = ({meal}) => {

    const cartCtx=useContext(shopContext)

    const handleMealToCart=(meal)=>{
        cartCtx.addItem(meal)
    }
  return (
    <li className="meal-item">
       <article>
              <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                <h3>{meal.name}</h3>
              <p className="meal-item-price">{currencyFromatter.format(meal.price)}</p>
              <p className="meal-item-description ">{meal.description}</p>
                </div>
                <p  className="meal-item-actions">
                    <Button onClick={()=>handleMealToCart(meal)}>Add To Cart</Button>
                </p>
            </article>
    </li>
  )
}

export default MealItem
