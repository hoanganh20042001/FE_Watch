import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { TextInput, Button, Container, PasswordInput, Grid, Image, Space, Text, Popover } from '@mantine/core';
import { useForm } from '@mantine/form';
import Logo from "../general/logo";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/signin.css";

export default function Signin() {
  const { height, width } = useViewportSize();
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      passWord: '',
    },

    validate: {
      email: (value) => value.length === 0 ? "Vui lòng nhập email đăng nhập" : null,
      passWord: (value) => value.length === 0 ? "Vui lòng nhập mật khẩu" : null,
    }
  });

  const handleLogin = (values) => {
    
    console.log(values)
    axios.post(`http://192.168.8.107:6060/api/v1/auth/login-client`, values).then((response) => {
      console.log(response)
      if (response.data) {
        console.log("login successfull");
        localStorage.setItem('token',response.data.accessToken)
        sessionStorage.setItem('userName', response.data.user.fullName);
        sessionStorage.setItem('password', response.data.user.passWord);
        sessionStorage.setItem('bDate', response.data.bdate);
        sessionStorage.setItem('phoneNum', response.data.phoneNumber);
        sessionStorage.setItem('address', response.data.user.address);
        sessionStorage.setItem('fullName', response.data.fullname);
        sessionStorage.setItem('id', response.data.user.id);
        localStorage.removeItem('cart');
        if (response.data.user.roleId === 1) {
          navigate("/admin");
        }
        else {
          navigate("/");
        }

      } else {
        console.log("login failed");
        setFailed(true);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Grid>
      {width > 768 ? <Grid.Col xl={8} lg={8} md={7} sm={6}>
        <Image src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
          height="100vh"
          style={{ marginBottom: "-10px" }}
          fit="cover"
        />
      </Grid.Col> : null}
      <Grid.Col xl={4} lg={4} md={5} sm={6} xs={12} style={{ display: "flex" }}>
        <Container mx="auto" className="form-signin-container">
          <Logo classname="form-company-logo" />
          <Text style={width > 768 ? { fontSize: 34 } : { fontSize: 24 }} weight={500}>Đăng nhập</Text>
          <Space h="md" />
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
              className="form-username-input"
            />
            <Space h="md" />
            <PasswordInput
              label="Mật khẩu"
              placeholder="passWord"
              {...form.getInputProps('passWord')}
              className="form-password-input"
            />
            <Space h="md" />
            <Popover
              opened={failed}
              onClose={() => setFailed(false)}
              target={<Button type="submit" color="dark" className="form-signin-submit-btn" onClick={() => setFailed(false)} fullWidth>ĐĂNG NHẬP</Button>}
              width={260}
              position="bottom"
              withArrow
            >
              <Text color="gray">Vui lòng kiểm tra lại tài khoản và mật khẩu</Text>
            </Popover>

            <Space h="sm" />
            <Text color="gray">Chưa có tài khoản ? Đăng kí ngay <Link to="/signup">tại đây</Link></Text>
          </form>
        </Container>
      </Grid.Col>

    </Grid >
  );
}