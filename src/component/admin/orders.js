import React from 'react';
import CartPurch from "../general/cartPurch";
import { Grid } from "@mantine/core";
import axios from 'axios';
import { getListOrder } from '../../api/order';
import {Group, Title, Container
} from "@mantine/core";
import CartAdmin from './cartAadmin';
import moment from 'moment';
const paymentItems = [{
    id: 1,
    name: "Rolex-1AB",
    img: "https://cdn3.dhht.vn/wp-content/uploads/2021/01/dong-ho-rolex-nam-nu-chinh-hang-gia-bao-nhieu-danh-gia-chi-tiet.jpg",
    price: "3000000",
    quantity: 1,
    brand: "Rolex"
}]

export default function Orders() {
    const [total, setTotal] = React.useState(0);
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        // axios.get('http://localhost:8080/api/payment/getordered/').then((response) => {
        //     console.log(response);
        //     setOrders(response.data)
        // }).catch((error) => {
        //     console.log(error);
        // })
        getListOrder().then(data=>{setOrders(data)
            console.log(data)
          }
    ) 
    }, [])
    console.log(orders)
    return <div>
         <Container id="kh" className="detail-section-container" style={{ backgroundColor: "white" }}>

<Grid style={{}}>
    <Grid.Col className="">
        <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5%", borderBottom: "1px solid #000" }}>
            <Title order={1} >Quản lý đơn hàng</Title>
        </Group>
    </Grid.Col>
</Grid>
</Container>
        {orders.map((item) => (
            <Grid.Col>
                <CartAdmin id={item.id} order={item.order} username={item.userName} date={moment(item.createdAt).format("HH:mm:ss DD/MM/YYYY ")} cost={item.cost} setTotal={setTotal} />
            </Grid.Col>
        ))}
    </div>
}