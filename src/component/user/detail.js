import { Container, Grid } from '@mantine/core';
import "../../css/detail.css";
import React from 'react';
import ProductDetail from '../general/productDetail';
import CommentSection from '../general/commentSection';
import { useParams, useLocation } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import BreadCrumbs from "../general/breadCrumb";
import axios from 'axios';
import { getDetailProduct } from '../../api/product';

export default function Detail() {
    let params = useParams();
    console.log(params.id)
    const [data, setData] = React.useState({});
    let location = useLocation();
    const { height, width } = useViewportSize();

    React.useEffect(() => {
        // axios.get(`http://localhost:8080/api/product/detail/${params.id}`)
        //     .then((response) => {
        //         setData(() => response.data);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        getDetailProduct(params.id).then(data=>setData(data))
    }, [])

    return (
        <Container className="detail-section-container" style={{ marginTop: 60 }}>
            <Grid style={{ marginTop: 60 }}>
                <BreadCrumbs location={location} size={width} name={data.name} />
                <Grid.Col>
                    <ProductDetail
                        id={data.id}
                        name={data.name}
                        img={data.image}
                        brand={data.brand}
                        sex={data.type}
                        category={data.category}
                        price={data.price}
                        description={data.description}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CommentSection id={data.id} />
                </Grid.Col>
            </Grid>
        </Container>
    )
}