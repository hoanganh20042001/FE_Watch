import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Text,
    Popover,
    Group,
    TextInput,
    Container,
    Modal 
} from "@mantine/core";
import {
    HiOutlineShoppingBag,
    HiUserCircle,
    HiUser,
    HiOutlineLogout,
    HiOutlineLogin,
    HiOutlineSearch,
} from "react-icons/hi";
import Logo from "../general/logo";
import MenuModal from "../general/menuModal";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import "../../css/nav-bar.css";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { Send } from "tabler-icons-react";


// function sendMessage(){
//     fetch('/api/v1/socket/send-message')
//     .then(res=>{res.text()
//         console.log(2)
//     })
//     .then(message=>console.log(1))
//     .catch(err=>console.log(err))

// }
export default function NavAdmin() {
    const [opened1, setOpened1] = React.useState(false);
    const { height, width } = useViewportSize();
    const [data, setData] = React.useState();
    const [scroll, scrollTo] = useWindowScroll();
    const [opened, setOpened] = React.useState(false);
    const user = sessionStorage.getItem("userName");
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/signin");
    }
    React.useEffect(() => {
        const socket = io('ws://localhost:8080'); // Thay đổi địa chỉ máy chủ và namespace nếu cần

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('message', (Data) => {
            console.log('New message received:', Data);
            setOpened1(true)
            setData(Data.fullName)
            // Xử lý thông báo đến người dùng ở đây
        });

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
         <Modal centered
                opened={opened1}
                onClose={() => setOpened1(false)}
                // title="Có đơn hàng mới từ người dùng ${userName}"
                size="lg"
            >
                 <Text >
                 Có đơn hàng mới từ người dùng {data}
                                    </Text>
            </Modal>
            <div className="nav-bar">
                {width > 1100 ? (
                    <>
                        {!user ? (
                            <Link to="/signin">
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    onClick={() => scrollTo({ y: 0 })}
                                >
                                    <Text className="nav-bar-btn-text">
                                        Đăng nhập/đăng ký
                                    </Text>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    style={{ marginTop: 12 }}
                                    onClick={() => setOpened((o) => !o)}
                                >
                                    <Popover
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                        target={
                                            <Text className="nav-bar-btn-text">
                                                <HiUser size={30} />
                                            </Text>
                                        }
                                        width="auto"
                                        position="bottom"
                                    >
                                        <Group direction="column">
                                            {/* <Text
                                                variant="link"
                                                component="a"
                                                href="/user_info"
                                                onClick={() =>
                                                    scrollTo({ y: 0 })
                                                }
                                            >
                                                Xem thông tin{""}
                                                <HiUserCircle size={25} /> 
                                            </Text>
                                            <Text
                                                variant="link"
                                                component="a"
                                                // href="/purch"
                                                // onClick={() =>
                                                //     scrollTo({ y: 0 })
                                                // }
                                                // onClick={sendMessage}
                                            >
                                                Đơn hàng mua{" "}
                                                <HiUserCircle size={25} />
                                            </Text> */}
                                            <Text
                                                variant="link"
                                                component="a"
                                                onClick={() =>
                                                    sessionStorage.clear()
                                                }
                                                href="/signin"
                                            >
                                                Đăng xuất{" "}
                                                <HiOutlineLogout size={25} />
                                            </Text>
                                            
                                        </Group>
                                    </Popover>
                                </Button>
                            </>
                        )}
                        {/* <Link to="/cart">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-right nav-bar-btn"
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text className="nav-bar-btn-text">
                                    <HiOutlineShoppingBag size={30} />{" "}
                                </Text>
                            </Button>
                        </Link> */}
                        <Link >
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-right nav-bar-btn"
                            >
                                <Text className="nav-bar-btn-text">
                                    <HiOutlineSearch size={30} />
                                </Text>
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <MenuModal />
                        <Logo classname="nav-bar-center" />
                        <div className="nav-mobile-btn-group">
                            <Link to="/cart">
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-btn"
                                    onClick={() => scrollTo({ y: 0 })}
                                >
                                    <Text className="nav-bar-btn-text">
                                        <HiOutlineShoppingBag size={30} />{" "}
                                    </Text>
                                </Button>
                            </Link>
                            {!user ? (
                                <Link to="/signin">
                                    <Button
                                        color="gray"
                                        radius="xs"
                                        uppercase
                                        className="nav-bar-btn"
                                        onClick={() => scrollTo({ y: 0 })}
                                    >
                                        <Text className="nav-bar-btn-text">
                                            <HiOutlineLogin size={30} />
                                        </Text>
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    onClick={() => setOpened((o) => !o)}
                                >
                                    <Popover
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                        target={
                                            <Text className="nav-bar-btn-text">
                                                <HiUserCircle size={30} />
                                            </Text>
                                        }
                                        width="auto"
                                        position="bottom"
                                    >
                                        <Group direction="column">
                                            <Text
                                                variant="link"
                                                component="a"
                                                href="/user_info"
                                                onClick={() =>
                                                    scrollTo({ y: 0 })
                                                }
                                            >
                                                Xem thông tin{" "}
                                                <HiUserCircle size={25} />
                                            </Text>
                                            <Text
                                                variant="link"
                                                component="a"
                                                onClick={() =>
                                                    handleLogout()
                                                }
                                                // href="/"
                                            >
                                                Đăng xuất{" "}
                                                <HiOutlineLogout size={25} />
                                            </Text>
                                        </Group>
                                    </Popover>
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
