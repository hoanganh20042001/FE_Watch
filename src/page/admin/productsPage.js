import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Products from '../../component/admin/products'
import { Container, Grid } from '@mantine/core';
import NavAdmin from '../../component/general/navAdmin';
export default function ProductsAdminPage() {
    return <>
    <NavAdmin />
    <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={1} /></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Products /></Grid.Col>
    </Grid >
    </>
}