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
// import DetailPurch from "./detailPurch";
import DetailPurch from "../general/detailPurch";

export default function CartAdmin({
    id,
    order,
    setTotal,
    payment,
    cartList,
    setCartList,
    username,
    date,
    cost,
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
  

    return exist ? (
        <Grid className="cart-card-container" align="center">
            <Grid.Col xl={7} lg={4} md={3} className="cart-card-img-container">
            {order.map(item => <Grid.Col>
                    <DetailPurch product={item.product} img={item.image} price={item.price} quantity={item.quantity} brand={item.brand}  />
                </Grid.Col>)}
            </Grid.Col>      
            <Grid.Col xl={3} lg={3} md={3}>
              
                    <Group direction="column">
                        <Text>Người mua: {username}</Text>
                
                        
                        <Text>Ngày mua: {date}</Text>
                        <Text>Tổng tiền: {cost}</Text>
                    </Group>
             
            </Grid.Col>
            <Grid.Col xl={2} lg={3} md={3}>
              
              <Group direction="column">
              
                  <Button
                      variant="outline"
                      color="blue"
                      // onClick={() => handleDeleteOrder()}
                  >
                      <Text>Đã thanh toán</Text>
                  </Button>
              </Group>
       
      </Grid.Col>
        </Grid>
    ) : null;
}
