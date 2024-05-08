import {
    Badge,
    Button,
    Grid,
    Group,
    Image,
    Text,
    Tooltip,
    Checkbox,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import React from "react";
import { PaymentItemsContext } from "../general/paymentItemsContext";
import "../../css/cart.css";
import axios from "axios";
import DetailPurch from "./detailPurch";

export default function CartPurch({
    id,
    order,
    setTotal,
    payment,
    cartList,
    setCartList,
    username,
    date,
    orderId,
    ordCusId,
}) {
    const [paymentItems, setPaymentItems] =
        React.useContext(PaymentItemsContext);
    // const [count, setCount] = React.useState(parseInt(quantity));
    const [totalLocal, setTotalLocal] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    const [tooltip1, setTooltip1] = React.useState(false);
    const [tooltip2, setTooltip2] = React.useState(false);
    const [tooltip3, setTooltip3] = React.useState(false);
    const [exist, setExist] = React.useState(true);
console.log(order)
    // const handleIncrement = () => {
    //     setCount(count + 1);
    //     for (let i = 0; i < cartList.length; i++) {
    //         if (cartList[i].id === id) {
    //             let carts = [...cartList];
    //             let newCart = cartList[i];
    //             newCart.quantity = (parseInt(newCart.quantity) + 1).toString();
    //             cartList[i] = newCart;
    //             setCartList(carts);
    //         }
    //     }
    // };

    // const handleDecrement = () => {
    //     count > 0 ? setCount(count - 1) : setCount(0);
    //     for (let i = 0; i < cartList.length; i++) {
    //         if (cartList[i].id === id) {
    //             let carts = [...cartList];
    //             let newCart = cartList[i];
    //             newCart.quantity = (
    //                 parseInt(newCart.quantity) > 0
    //                     ? parseInt(newCart.quantity) - 1
    //                     : 0
    //             ).toString();
    //             cartList[i] = newCart;
    //             setCartList(carts);
    //         }
    //     }
    // };

    // const handleDelete = async () => {
    //     const data = {          
    //         "customid": parseInt(sessionStorage.getItem("id")),
    //         "productid": id
    //     };
    //     console.log(data);
    //     await axios.post(`http://localhost:8080/api/cart/delete`,data)
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     setTotalLocal((money) => count * price);
    //     setTotal((money) => money - totalLocal);
    //     const newCart = cartList.filter((item) => item.id !== id);
    //     setCartList(newCart);
    //     if (localStorage.getItem("cart")) {
    //         localStorage.setItem("cart", JSON.stringify(newCart));
    //     }
    // };

    // const handleDeleteOrder = () => {
    //     const body = {
    //         ordItemId: orderId,
    //         ordCusId: ordCusId,
    //         productId: id,
            
    //     };
    //     console.log(JSON.stringify(body));
    //     axios
    //         .post(
    //             `http://localhost:8080/api/payment/delete`,
    //             body
    //         )
    //         .then((response) => {
    //             console.log(response);
    //             setExist(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // React.useEffect(() => {
    //     for (var i = 0; i < paymentItems.length; i++) {
    //         if (paymentItems[i].name == name) {
    //             setChecked(true);
    //             break;
    //         }
    //     }
    // }, []);

    // React.useEffect(() => {
    //     setTotalLocal(parseInt(quantity) * parseInt(price));
    //     setTotal(
    //         (money) => money + parseInt(quantity) * parseInt(price) - totalLocal
    //     );
    // }, [cartList]);

    return exist ? (
        <Grid className="cart-card-container" align="center">
            <Grid.Col xl={9} lg={4} md={3} className="cart-card-img-container">
            {order.map(item => <Grid.Col>
                    <DetailPurch product={item.product} img={item.image} price={item.price} quantity={item.quantity} brand={item.brand}  />
                </Grid.Col>)}
            </Grid.Col>      
            <Grid.Col xl={3} lg={3} md={3}>
                {!payment ? (
                    <Group direction="column">
                        {/* {!checked ? (
                            <Tooltip label="Xác nhận đã nhận hàng" opened={tooltip1}>
                                <Button
                                    color="green"
                                    variant="outline"
                                    className="cart-card-btn-check"
                                    onMouseEnter={() => setTooltip1(true)}
                                    onMouseLeave={() => setTooltip1(false)}
                                    onClick={() => {
                                        setChecked(true);
                                        setPaymentItems((o) => [
                                            ...o,
                                            {
                                                id,
                                                img,
                                                name,
                                                price,
                                                count,
                                                brand,
                                            },
                                        ]);
                                    }}
                                >
                                    <Text size="lg">Đã nhận hàng  </Text>
                                </Button>
                            </Tooltip>
                        ) : (
                            <Checkbox
                                checked={true}
                                className="cart-card-checkbox"
                                color="green"
                            />
                        )} */}
                        {!checked2 ? (
                            <Tooltip label="Chưa nhận được hàng" opened={tooltip2}>
                                <Button
                                    color="red"
                                    variant="outline"
                                    className="cart-card-btn-check"
                                    onMouseEnter={() => setTooltip2(true)}
                                    onMouseLeave={() => setTooltip2(false)}
                                    onClick={() => {
                                        setChecked2(true);
                                        
                                    }}
                                >
                                    <Text size="lg">Chưa nhận được hàng </Text>
                                </Button>
                            </Tooltip>
                        ) : (
                            <Checkbox
                                checked2={true}
                                className="cart-card-checkbox"
                                color="red"
                            />
                        )}
                        {/* <Tooltip label="Chưa nhận được sản phẩm" opened={tooltip2}>
                            <Button
                                color="red"
                                variant="outline"
                                className="cart-card-btn-delete"
                                onMouseEnter={() => setTooltip2(true)}
                                onMouseLeave={() => setTooltip2(false)}
                               onClick={() => {setChecked(true);
                               // handleDelete()
                            }
                            }
                            >
                                <Text size="lg">Chưa nhận hàng</Text>
                            </Button>
                        </Tooltip> */}
                        <Link to={`/detail/${id}`}  label="mua lại sản phẩm" opened={tooltip3}>
                        {/* <Image src={img} height="50vh" alt="watch" className='product-img-zoom' 
                         /> */}
                         <Button
                               variant="outline"
                               className="cart-card-btn-delete"
                               onMouseEnter={() => setTooltip3(true)}
                               onMouseLeave={() => setTooltip3(false)}
                                // onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text size="lg">    Mua lại   </Text>
                            </Button>
                    </Link>
                        {/* <Link to="/products" label="mua lại sản phẩm" opened={tooltip3}>
                            <Button
                               variant="outline"
                               className="cart-card-btn-delete"
                               onMouseEnter={() => setTooltip3(true)}
                               onMouseLeave={() => setTooltip3(false)}
                                // onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text size="lg">    Mua lại   </Text>
                            </Button>
                        </Link> */}
                        {/* <Tooltip label="mua lại sản phẩm" opened={tooltip3}>
                            <Button
                                // color="red"
                                variant="outline"
                                className="cart-card-btn-delete"
                                onMouseEnter={() => setTooltip3(true)}
                                onMouseLeave={() => setTooltip3(false)}
                                
                                onClick={() => handleDelete()}
                            >
                                <Text size="lg">    Mua lại   </Text>
                            </Button>
                        </Tooltip> */}
                    </Group>
                ) : order ? (
                    <Group direction="column">
                        <Text>Người mua: {username}</Text>
                        <Text>Ngày mua: {date}</Text>
                        <Button
                            variant="outline"
                            color="red"
                            // onClick={() => handleDeleteOrder()}
                        >
                            
                        </Button>
                    </Group>
                ) : null}
            </Grid.Col>
        </Grid>
    ) : null;
}
