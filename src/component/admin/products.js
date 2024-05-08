import React from 'react';
import Product from '../../component/admin/product';
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { Container, MediaQuery, Image, Modal, Select, Textarea, Notification } from '@mantine/core';
import { Grid, Pagination, Group, Input, Button, Title, Stack } from '@mantine/core';
import { TextInput, NumberInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useViewportSize } from "@mantine/hooks";
import { useNavigate, useLocation } from 'react-router-dom';
import { useWindowScroll } from '@mantine/hooks';
import { Search } from "tabler-icons-react";
import axios from 'axios';
import { getListCategory } from '../../api/category'
import { getListType } from '../../api/type';
import { getListBrand } from '../../api/brand';
import { addProduct, getListProduct, searchProduct } from '../../api/product';

export default function Products() {
    let location = useLocation();
    const [showNotification, setShowNotification] = useState(false);
    const [data, setData] = React.useState([]);
    const [scroll, scrollTo] = useWindowScroll();
    const [size, setSize] = React.useState([0, 0]);
    const [render, setRender] = React.useState(true);
    const [opened, setOpened] = React.useState(false);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [activePage, setPage] = React.useState(1);
    const maxItemPerPage = 6;
    const total = Math.ceil(arr.length / maxItemPerPage);
    //     useEffect(() => {
    //         getListCategory().then(data=>console.log(data))
    //         console.log(getListCategory())
    //         console.log(localStorage.getItem("token"))
    //      }
    //      // , [render]
    //  )

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    React.useEffect(() => {
        getListProduct().then(data => setData(data.list))
        setOpened(false);
    }, [render])
    const form = useForm({
        initialValues: {
            search: '',
        }
    });

    const handleSearch = (values) => {
        // axios.get(`http://localhost:8080/api/product/search/${values.search}`)
        //     .then((response) => {
        //         console.log(response);
        //         setData(response.data);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        searchProduct(values.search).then(data => setData(data.list))
        setOpened(false);
    }

    //
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const { height, width } = useViewportSize()
    const [category, setCategory] = useState([])
    const [type, setType] = useState([])
    const [brand, setBrand] = useState([])
    const forms = useForm({
        initialValues: {
            name: '',
            brand: 0,
            type: 0,
            category: 0,
            price: 0,
            descript: '',
            discount: 0,
            quantity: 0,
        }
    });
    useEffect(() => {
        getListCategory().then(data =>
            data.list.map(item => {
                const newCategoryItem = {
                    value: item.id,
                    label: item.name,
                };
                setCategory(prevCategory => [...prevCategory, newCategoryItem])
            })
        )
        getListType().then(data =>
            data.list.map(item => {
                const newTypeItem = {
                    value: item.id,
                    label: item.name,
                };
                setType(prevType => [...prevType, newTypeItem])
            })
        )
        getListBrand().then(data =>
            data.list.map(item => {
                const newBrandItem = {
                    value: item.id,
                    label: item.name,
                };
                setBrand(prevBrand => [...prevBrand, newBrandItem])
            })
        )

    }, [])
    const handleFileChange = (e) => {
        // Access the selected file from the input element
        setFile(e.target.files[0])

        // Update the state with the selected file
        setSelectedFile(e.target.files[0])
    }
    function Add(values) {
        const data = {
            name: values.name,
            // image: values.image,
            brand: values.brand,
            type: values.type,
            category: values.category,
            price: values.price,
            descript: values.descript,
            discount: values.discount,
            quantity: values.quantity
        }
        console.log(JSON.stringify(data))

        addProduct(data, file).then(() => {
            setOpened(false)
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 1000);
            // window.location.href = window.location.href;

        })
        console.log(1)
        setRender(!render);
        setCategory(prevCategory => [...prevCategory, ''])

    }

    return <>
    <Container id="kh" className="detail-section-container" style={{ backgroundColor: "white" }}>

                <Grid style={{}}>
                    <Grid.Col className="">
                        {/* <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5%", borderBottom: "1px solid #000" }}>
                            <Title order={1} ></Title>
                        </Group> */}
                    </Grid.Col>
                </Grid>
            </Container>
        {showNotification && (
            <Notification color="teal" title="Success" mt="md">
                Product added successfully!
            </Notification>
        )}
        <Stack justify="space-around">
            <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5% 0", borderBottom: "1px solid #000" }}>
                <Title order={1} >Quản lý Sản Phẩm </Title>
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
        </Stack>
        <Grid style={{ marginTop: 30 }}>
            <Grid.Col>
                <Grid>
                    {data.slice((activePage - 1) * maxItemPerPage, activePage * maxItemPerPage).map(product => {
                        return (
                            <Grid.Col xl={4} lg={4} md={6} sm={6} xs={12} key={product.id}>
                                <Product id={product.id} img={product.image} brand={product.brand} name={product.name} price={product.price} quantity={product.quantity} setRender={setRender} render={render} />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Grid.Col>
            <Grid.Col>
                <Modal centered
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Thêm sản phẩm mới"
                    size="lg"
                >
                    {/* <Grid>
                        <Grid.Col> */}
                    {/* <ProductAdd render={render} setRender={setRender} /> */}
                    <Grid>
                        <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
                            <MediaQuery
                                query="(max-width: 1800px) and (min-width: 900px)"
                                styles={{
                                    border: "1px solid #f1f1f1",
                                }}
                            >
                                <Container className="detail-image-container">
                                    {selectedFile ? (
                                        <Image
                                            src={URL.createObjectURL(selectedFile)} // Use URL.createObjectURL to display the selected file
                                            alt="watch"
                                            height="320px"
                                            fit="contain"
                                        />
                                    ) : (
                                        <p>No image selected</p>
                                    )}
                                </Container>
                            </MediaQuery>
                            <Group position="left" mt="md">

                                {/* <Button variant="outline" color="dark"> */}
                                <Input type='file' onChange={handleFileChange}
                                ></Input>
                                {/* </Button> */}
                            </Group>
                        </Grid.Col>
                        <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>

                            <Box >
                                <form onSubmit={forms.onSubmit((values) => Add(values))}>
                                    <TextInput
                                        required
                                        label="Tên"
                                        placeholder="Input Name"
                                        {...forms.getInputProps('name')}
                                    />

                                    {/* <TextInput
                            required
                            label="Link ảnh"
                            placeholder="Input Link"
                            {...form.getInputProps('image')}
                        /> */}

                                    <Select
                                        label="Thương hiệu"
                                        // data={[
                                        //     { value: 'Rolex', label: 'Rolex' },
                                        //     { value: 'Seiko', label: 'Seiko' },
                                        //     { value: 'Casio', label: 'Casio' },
                                        //     { value: 'Citizen', label: 'Citizen' },
                                        //     { value: 'Fossil', label: 'Fossil' },

                                        // ]}
                                        data={brand}
                                        {...forms.getInputProps('brand')}
                                    />

                                    <Select
                                        label="Loại"
                                        // data={[
                                        //     { value: 'Đồng hồ nam', label: 'Đồng hồ nam' },
                                        //     { value: 'Đồng hồ nữ', label: 'Đồng hồ nữ' },
                                        //     { value: 'Đồng hồ trẻ em', label: 'Đồng hồ trẻ em' },

                                        // ]}
                                        data={type}
                                        {...forms.getInputProps('type')}
                                    />

                                    <Select
                                        label="Động cơ"
                                        // data={[
                                        //     { value: 'Cơ - automatic', label: 'Cơ-automatic' },
                                        //     { value: 'Điện tử', label: 'Điện tử' },
                                        //     { value: 'Treo tường', label: 'Treo tường' },
                                        //     { value: 'Năng lượng mặt trời', label: 'Năng lượng mặt trời' },

                                        // ]}
                                        data={category}
                                        {...forms.getInputProps('category')}
                                    />

                                    <NumberInput
                                        required
                                        label="Discount"
                                        placeholder="Input Discount"
                                        {...forms.getInputProps('discount')}
                                    />
                                    <NumberInput
                                        required
                                        label="Quantity"
                                        placeholder="Input Quantity"
                                        {...forms.getInputProps('quantity')}
                                    />
                                    <NumberInput
                                        required
                                        label="Price"
                                        placeholder="Input Price"
                                        {...forms.getInputProps('price')}
                                    />
                                    <Textarea
                                        label="Mô tả"
                                        placeholder="Input content"
                                        autosize
                                        minRows={3}
                                        maxRows={6}
                                        {...forms.getInputProps('descript')}
                                    />


                                    <Group position="right" mt="md">
                                        <Button color="green" type="submit">Thêm sản phẩm</Button>
                                    </Group>
                                </form>
                            </Box>
                        </Grid.Col>
                        {/* </Grid>
                        </Grid.Col> */}
                    </Grid>
                </Modal>

            </Grid.Col>
        </Grid>

        <Pagination onChange={(page) => {
            setPage(page);
            scrollTo({ y: 0 })
        }} total={total} position="right" withEdges className='product-pagination'
        />;
    </>

}

// function ProductAdd(param) {
//     // response.data.list.slice(0, 100).map((product) => {
//     //     setFeaturedProd((o) => [
//     //         ...o,
//     //         <ProductCard
//     //             img={product.image}
//     //             brand={product.brand}
//     //             name={product.name}
//     //             price={product.price}
//     //             key={product.id}
//     //             id={product.id}
//     //         />,
//     //     ]);
//     // });
//     const navigate = useNavigate()
//     const [file, setFile] = useState()
//     const [selectedFile, setSelectedFile] = useState(null);
//     const { height, width } = useViewportSize();
//     const [category, setCategory] = useState([])
//     const [type, setType] = useState([])
//     const [brand, setBrand] = useState([])
//     const form = useForm({
//         initialValues: {
//             name: '',
//             brand: 0,
//             type: 0,
//             category: 0,
//             price: 0,
//             descript: '',
//             discount: 0,
//             quantity: 0,
//         }
//     });
//     useEffect(() => {
//         getListCategory().then(data =>
//             data.list.map(item => {
//                 const newCategoryItem = {
//                     value: item.id,
//                     label: item.name,
//                 };
//                 setCategory(prevCategory => [...prevCategory, newCategoryItem]);
//             })
//         )
//         getListType().then(data =>
//             data.list.map(item => {
//                 const newTypeItem = {
//                     value: item.id,
//                     label: item.name,
//                 };
//                 setType(prevType => [...prevType, newTypeItem])
//             })
//         )
//         getListBrand().then(data =>
//             data.list.map(item => {
//                 const newBrandItem = {
//                     value: item.id,
//                     label: item.name,
//                 };
//                 setBrand(prevBrand => [...prevBrand, newBrandItem]);
//             })
//         )

//     }, [])
//     const handleFileChange = (e) => {
//         // Access the selected file from the input element
//         setFile(e.target.files[0])

//         // Update the state with the selected file
//         setSelectedFile(e.target.files[0]);
//     };
//     function Add(values) {
//         const data = {
//             name: values.name,
//             // image: values.image,
//             brand: values.brand,
//             type: values.type,
//             category: values.category,
//             price: values.price,
//             descript: values.descript,
//             discount: values.discount,
//             quantity: values.quantity
//         }
//         console.log(JSON.stringify(data))

//         addProduct(data, file)
//         // window.location.reload()
//         return (
//             <Notification color="teal" title="Success" mt="md">
//                 Product deleted successfully!
//             </Notification>
//         );
//         navigate(`/admin`)
//         // window.location.href = window.location.href;

//     }

//     return (
//         <Grid>
//             <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
//                 <MediaQuery
//                     query="(max-width: 1800px) and (min-width: 900px)"
//                     styles={{
//                         border: "1px solid #f1f1f1",
//                     }}
//                 >
//                     <Container className="detail-image-container">
//                         {selectedFile ? (
//                             <Image
//                                 src={URL.createObjectURL(selectedFile)} // Use URL.createObjectURL to display the selected file
//                                 alt="watch"
//                                 height="320px"
//                                 fit="contain"
//                             />
//                         ) : (
//                             <p>No image selected</p>
//                         )}
//                     </Container>
//                 </MediaQuery>
//                 <Group position="left" mt="md">

//                     {/* <Button variant="outline" color="dark"> */}
//                     <Input type='file' onChange={handleFileChange}
//                     ></Input>
//                     {/* </Button> */}
//                 </Group>
//             </Grid.Col>
//             <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>

//                 <Box >
//                     <form onSubmit={form.onSubmit((values) => Add(values))}>
//                         <TextInput
//                             required
//                             label="Tên"
//                             placeholder="Input Name"
//                             {...form.getInputProps('name')}
//                         />

//                         {/* <TextInput
//                             required
//                             label="Link ảnh"
//                             placeholder="Input Link"
//                             {...form.getInputProps('image')}
//                         /> */}

//                         <Select
//                             label="Thương hiệu"
//                             // data={[
//                             //     { value: 'Rolex', label: 'Rolex' },
//                             //     { value: 'Seiko', label: 'Seiko' },
//                             //     { value: 'Casio', label: 'Casio' },
//                             //     { value: 'Citizen', label: 'Citizen' },
//                             //     { value: 'Fossil', label: 'Fossil' },

//                             // ]}
//                             data={brand}
//                             {...form.getInputProps('brand')}
//                         />

//                         <Select
//                             label="Loại"
//                             // data={[
//                             //     { value: 'Đồng hồ nam', label: 'Đồng hồ nam' },
//                             //     { value: 'Đồng hồ nữ', label: 'Đồng hồ nữ' },
//                             //     { value: 'Đồng hồ trẻ em', label: 'Đồng hồ trẻ em' },

//                             // ]}
//                             data={type}
//                             {...form.getInputProps('type')}
//                         />

//                         <Select
//                             label="Động cơ"
//                             // data={[
//                             //     { value: 'Cơ - automatic', label: 'Cơ-automatic' },
//                             //     { value: 'Điện tử', label: 'Điện tử' },
//                             //     { value: 'Treo tường', label: 'Treo tường' },
//                             //     { value: 'Năng lượng mặt trời', label: 'Năng lượng mặt trời' },

//                             // ]}
//                             data={category}
//                             {...form.getInputProps('category')}
//                         />

//                         <NumberInput
//                             required
//                             label="Discount"
//                             placeholder="Input Discount"
//                             {...form.getInputProps('discount')}
//                         />
//                         <NumberInput
//                             required
//                             label="Quantity"
//                             placeholder="Input Quantity"
//                             {...form.getInputProps('quantity')}
//                         />
//                         <NumberInput
//                             required
//                             label="Price"
//                             placeholder="Input Price"
//                             {...form.getInputProps('price')}
//                         />
//                         <Textarea
//                             label="Mô tả"
//                             placeholder="Input content"
//                             autosize
//                             minRows={3}
//                             maxRows={6}
//                             {...form.getInputProps('descript')}
//                         />


//                         <Group position="right" mt="md">
//                             <Button color="green" type="submit">Thêm sản phẩm</Button>
//                         </Group>
//                     </form>
//                 </Box>
//             </Grid.Col>
//         </Grid>
//     );
// }