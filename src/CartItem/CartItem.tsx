import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

// Types
import {CartItemType} from "../App";

// Styles
import {Wrapper} from "./CartItem.style";
import React from "react";

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant='contained'
                    onClick={() => removeFromCart(item.id)}
                    startIcon={<RemoveIcon/>}
                >
                    Remove
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant='contained'
                    onClick={() => addToCart(item)}
                    startIcon={<AddIcon/>}
                >
                    Add
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title}/>
    </Wrapper>
)

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

export default CartItem;
