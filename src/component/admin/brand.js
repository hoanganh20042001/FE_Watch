import React, { useState } from 'react';
import { Grid, Text, Image, Container, Table, Group, Button, Title } from '@mantine/core';
import { Input, Stack } from '@mantine/core';
import axios from 'axios';
import "../../css/adminMember.css";
import Notification from '../general/notification';
import Modal from "react-modal";
import "../../css/notification.css"
import { getListUser } from '../../api/member';
import { useForm } from '@mantine/form';
import { Search } from "tabler-icons-react";
import { getListType } from '../../api/type';
import { getListBrand } from '../../api/brand';
export default function Brands() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [mems, setMems] = React.useState([]);
    const [render, setRender] = React.useState(false);
    const [message, setMessage] = useState('');
    const [opened,setOpened]=useState(false)
    const handleSearch = (values) => {
        // searchProduct(values.search).then(data => setData(data.list))
        // setOpened(false);
    }
    React.useEffect(() => {
        // axios
        //     .get(`http://localhost:8080/api/customer/`)
        //     .then((response) => {
        //         console.log(response.data);
        //         if (typeof response.data !== "string") {
        //             setMems(response.data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        getListBrand().then(data=>setMems(data.list))
        console.log(mems)
    }, [render]);
    const [isOpen, setIsOpen] = useState(false);
    const handleBan = (id) => {
        //setMessage(`Bạn có muốn block khách hàng ${name} này không`);
        // setType('warning');
        //setShowNotification(true)
        // if (setShowNotification(true)) {
        // const data = {
        //     id: proid,
        // };
        // setRender(!render);
        // console.log(JSON.stringify(data));
        axios.put(`http://localhost:8080/api/customer/block/${id}`)
            .then((response) => {

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        setIsOpen(false);
        // }
    };

    const [type, setType] = useState('');
    const form = useForm({
        initialValues: {
            search: '',
        }
    });

    const handleDelete = (id, name) => {

        if (window.confirm(`Bạn muốn xóa ${name}?`)) {
            // const data = {
            //     id: proid,
            // }
            // setRender(!render);
            // console.log(JSON.stringify(data));

            console.log(id);
            axios.delete(`http://localhost:8080/api/customer/delete/${id}`)
                .then((response) => {
                    const data = mems.filter(mem => mem.id !== id)
                    setMems(data)
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
    console.log(mems)
    const rows = mems.map((element) => (
        <tr key={element.name}>
            <td>
                <Container className='member-image-container'>
                    <Image
                        src="https://bossluxurywatch.vn/uploads/san-pham/rolex/sky-dweller/rolex-sky-dweller-42mm-326938-0005.png"
                        alt="watch"
                        height="45px"
                        width="45px"
                        fit="contain"
                    />
                </Container>
            </td>
            <td> <Text>{element.row_number}</Text></td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>
                <Group>
                <Button variant="filled" color="yellow" onClick={() => handleDelete(element.id, element.username)}>Sửa</Button>
                    <div>
                        <Button variant="filled" color="red" onClick={() => {
                            setIsOpen(true);
                        }}>Xóa</Button>
                        <Modal className={"model"} isOpen={isOpen} >
                            <h2>Bạn muốn xóa {element.username}?</h2>
                            <button onClick={() => setIsOpen(false)}>Hủy</button>
                            <button onClick={() => handleBan(element.id)}>Xóa</button>
                        </Modal>
                    </div>

                    
                </Group>
            </td>
        </tr >
    ));

    // const [activePage, setPage] = React.useState(1);
    // const maxItemPerPage = 6;
    // const total = Math.ceil(arr.length / maxItemPerPage);
    return (
        <Container id="kh" className="detail-section-container" style={{ backgroundColor: "white" }}>
          
            <Grid style={{}}>
                <Grid.Col className="">
                    <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5%", borderBottom: "1px solid #000" }}>
                        <Title order={1} >Quản lý thương hiệu</Title>
                    </Group>
                    <Group position="apart" direction="row" style={{ padding: "5px 5%" }}>
                <Button radius="xl" onClick={() => setOpened(true)}>Thêm mới </Button>
                <form onSubmit={form.onSubmit((values) => handleSearch(values))} style={{ width: 300 }}>
                    <Group direction="row" >
                        <Input
                            placeholder="Tìm kiếm"
                            radius="xl"
                            style={{ marginRight: '3%', width: '30%', minWidth: '200px' }}
                            {...form.getInputProps('search')}
                        />
                        <Button radius="xl" type="submit" ><Search /></Button>
                    </Group>
                </form>
            </Group>
                </Grid.Col>
                <Grid.Col>
                    <Table highlightOnHover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>STT</th>
                                <th>Tên thương hiệu</th>
                                <th>Mô tả</th>
                                {/* <th>Địa chỉ</th> */}
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>

                    {/* <Grid style={{ marginTop: 30 }}>
                        <Grid.Col>
                            <Grid>
                                {arr.slice((activePage - 1) * maxItemPerPage, activePage * maxItemPerPage).map(x => {
                                    return (                                     
                                        <Grid.Col key={x} 
                                            <p>hi</p>
                                        </Grid.Col>
                                    );
                                })}
                            </Grid>
                        </Grid.Col>
                    </Grid> */}
                </Grid.Col>
            </Grid>
        </Container>
    )
}
