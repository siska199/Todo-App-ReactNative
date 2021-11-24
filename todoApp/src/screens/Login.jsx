import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import baseURL from "./../constanta";
import styled from "styled-components";
import NavbarUp from "../components/NavbarUp";
import Button from "../components/Button";
import Input from "../components/Input";
import Footer from "../components/Footer";
export default function Register(props) {
  const initialValue = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialValue);

  const onChangeInput = (inputText, key) => {
    if (key == "email") {
      setForm({ ...form, email: inputText });
    }

    if (key == "password") {
      setForm({ ...form, password: inputText });
    }
  };

  const { setDataUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (form.email == "" || form.password == "") {
      alert("email, and password form forbidden to empty");
    } else {
      axios
        .get(baseURL + "/users")
        .then((res) => {
          const data = res.data.filter(
            (d) => d.email == form.email && d.password == form.password
          )[0];
          if (data) {
            alert("Login Success");
            AsyncStorage.setItem("@key_storage", data.token);
            setDataUser({
              ...data,
              isLogin: true,
            });
            setForm(initialValue);
            props.navigation.navigate("TabNav");
          } else {
            alert("Email or Password is wrong");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleRegister = () => {
    props.navigation.navigate("Register");
  };
  const handleGoBack = () => {
    props.navigation.navigate("Welcome");
  };
  return (
    <Container>
      <NavbarUp onPress={handleGoBack} />
      <ContainerForm>
        <Text title>Login</Text>
        <Form>
          <Input
            keyName="email"
            name="Email"
            onChange={onChangeInput}
            value={form.email}
          />
          <Input
            keyName="password"
            name="Password"
            onChange={onChangeInput}
            value={form.password}
          />
          <Button
            onPress={handleLogin}
            name="Log In"
            width="300px"
            height="50px"
            radius={10}
          />
        </Form>
        <Footer
          onPress={handleRegister}
          text="Don't have an account?"
          textButton="Sign Up"
        />
      </ContainerForm>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  padding: 50px 30px;
`;
const ContainerForm = styled.View`
  margin-top: 100px;
`;
const Form = styled.View`
  margin-top: 50px;
`;
const Text = styled.Text`
  text-align: center;
  font-size: 35px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: -5px;
`;
