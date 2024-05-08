import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Member from '../../component/admin/member'
import { Container, Grid, Stack } from '@mantine/core';
// import Navbar from '../../component/general/navbar'
import NavAdmin from '../../component/general/navAdmin';
import Types from '../../component/admin/type';
import Brands from '../../component/admin/brand';

export default function BrandsAdminPage() {
    return <>

            <NavAdmin />
            <Grid columns={12} style={{ marginTop: '20px' }}>
                <Grid.Col style={{ paddingTop: '50px'}} xs={12} sm={3}><Sidebar selected={5} /></Grid.Col>
                <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Brands /></Grid.Col>
            </Grid >



    </>
}