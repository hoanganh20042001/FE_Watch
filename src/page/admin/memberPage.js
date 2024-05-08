import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Member from '../../component/admin/member'
import { Container, Grid, Stack } from '@mantine/core';
// import Navbar from '../../component/general/navbar'
import NavAdmin from '../../component/general/navAdmin';

export default function MemberAdminPage() {
    return <>

            <NavAdmin />
            <Grid columns={12} style={{ marginTop: '20px' }}>
                <Grid.Col style={{ paddingTop: '50px'}} xs={12} sm={3}><Sidebar selected={3} /></Grid.Col>
                <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Member /></Grid.Col>
            </Grid >



    </>
}