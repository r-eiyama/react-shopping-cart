import Button from '@material-ui/core/Button';

//Types
import { CartItemType } from "../App";

//Styles
import { Wrapper } from "./Item.style";
import React from "react";

// コンポーネントの引数をバリデーションしている
type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}
// Itemコンポーネント
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
)

export default Item;