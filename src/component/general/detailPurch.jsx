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

export default function DetailPurch({
    product,
    img,
    brand,
    quantity,
    price
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
            <Grid.Col xl={3} lg={2} md={2} className="cart-card-img-container">
                <Image
                    src={img}
                    className="cart-card-img"
                    height="10vh"
                    width="100%"
                    fit="contain"
                />
            </Grid.Col>
            <Grid.Col xl={3} lg={2} md={2}>
                <Grid className="cart-card-product-container">
                    <Grid.Col>
                        <Badge size="lg" color="red">
                            {brand}
                        </Badge>
                    </Grid.Col>
                    <Grid.Col>
                        <Text weight={600} size="xl">
                            {product}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col xl={3} lg={2} md={2}>
                <Text weight={600} size="lg">
                    Số lượng
                </Text>
                <Group direction="row" className="cart-card-quantity-container">
                    <Text weight={600} size="lg">
                        {quantity}
                    </Text>
                </Group>
            </Grid.Col>
            <Grid.Col xl={3} lg={3} md={3}>
                <Group direction="column">
                    <Text weight={500} color="red" align="right" size="lg">
                        Giá:{" "}
                        <b>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(price)}
                        </b>
                    </Text>
                </Group>
            </Grid.Col>
        </Grid>
    ) : null;
}
