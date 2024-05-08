import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Orders from '../../component/admin/orders'
import { Container, Grid } from '@mantine/core';
import NavAdmin from '../../component/general/navAdmin';

export default function OrdersAdminPage() {
    return<>
    <NavAdmin />
    <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={4} /></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Orders /></Grid.Col>
    </Grid >
    </>
}