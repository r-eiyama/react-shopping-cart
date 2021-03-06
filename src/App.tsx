import {useState} from "react";
import {useQuery} from "react-query";

//Components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//Styles
import {Wrapper, StyledButton} from "./App.styles";

import Item from "./item/Item";
import Cart from "./Cart/Cart";

//Types
//Itemの型を定義
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}
// APIデータ取得メソッド
const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    // 非同期処理対応
    // React Hooksを利用,
    const {data, isLoading, error} = useQuery<CartItemType[]>(
        'products', //クエリを特定するkeyを定義
        getProducts //実際に呼び出すfunction
    );

    /**
     * 商品の合計個数を返却
     *
     * @param items
     */
    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);


    /**
     * 商品をカートに入れる
     *
     * @param clickedItem
     */
    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            // 選択されたItemがすでにカートに入っているか否か確認
            const isItemInCart = prev.find(item => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map(item =>
                item.id === clickedItem.id
                ? {...item, amount: item.amount + 1} : item
                );
            }

            // 初回
            return [...prev, {...clickedItem, amount: 1}];
        })
    };

    /**
     * 商品をカートから削除
     *
     * @param id
     */
    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    // 状態による表示設定
    if (isLoading) return <LinearProgress/>;
    if (error) return <div>Something went wrong ...</div>;

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='primary'>
                    <AddShoppingCartIcon/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default App;
