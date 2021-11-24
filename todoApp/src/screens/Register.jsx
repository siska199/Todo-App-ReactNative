import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import baseURL from "./../constanta/index";
import styled from "styled-components";
import NavbarUp from "../components/NavbarUp";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

export default function Register({ navigation }) {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialValue);

  const onChangeInput = (inputText, key) => {
    if (key == "name") {
      setForm({ ...form, name: inputText });
    }

    if (key == "email") {
      setForm({ ...form, email: inputText });
    }

    if (key == "password") {
      setForm({ ...form, password: inputText });
    }
  };

  const { setDataUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (form.email == "" || form.password == "" || form.name == "") {
      alert("name, email, and password form forbidden to empty");
    } else {
      axios
        .post(baseURL + "/users", form)
        .then(function (response) {
          alert("Register Success");
          AsyncStorage.setItem("@key_storage", response.data.token);
          setDataUser({
            ...response.data,
            isLogin: true,
          });
          setForm(initialValue);
          navigation.navigate("TabNav");
        })
        .catch(function (error) {
          alert(error);
        });
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleGoBack = () => {
    navigation.navigate("Welcome");
  };
  return (
    <Container>
      <NavbarUp onPress={handleGoBack} />

      <ContainerForm>
        <Text title>Register</Text>
        <Form>
          <Input
            keyName="name"
            name="Name"
            onChange={onChangeInput}
            value={form.name}
          />
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
            onPress={handleRegister}
            name="Register"
            width="300px"
            height="50px"
            radius={10}
          />
        </Form>
        <Footer
          onPress={handleLogin}
          text="Do you have an account?"
          textButton="Sign In"
        />
      </ContainerForm>
    </Container>
  );
}

const Container = styled.View`
  margin-top: 10px;
  width: 100%;
  flex: 1;
  align-items: center;
  padding: 50px 30px;
`;
const ContainerForm = styled.View`
  margin-top: 40px;
`;

const Text = styled.Text`
  font-size: 35px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: -5px;
  text-align: center;
`;
const Form = styled.View`
  margin-top: 50px;
`;
