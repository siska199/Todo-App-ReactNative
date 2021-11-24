import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import baseURL from "../constanta/index";
import axios from "axios";
import { Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function EditTodo(props) {
  const [form, setForm] = useState({ name: "", date: "" });
  const { idCategory, idTodo } = props.route.params; //Id category
  const { dataUser } = useContext(UserContext);
  const onChangeInput = (inputText, key) => {
    if (key == "name") {
      setForm({ ...form, name: inputText });
    }

    if (key == "date") {
      setForm({ ...form, date: String(inputText) });
    }
  };
  const [date, setDate] = useState("");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onChangeInput(currentDate, "date");
  };
  useEffect(() => {
    getItem();
  }, []);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const getItem = async () => {
    axios
      .get(
        baseURL + `/users/${dataUser.id}/category/${idCategory}/todo/${idTodo}`
      )
      .then((res) => {
        setForm(res.data);
        setDate(new Date(res.data.date));
      })
      .catch((error) => alert(error));
  };

  const handleGoBack = () => {
    props.navigation.navigate("DetailTodos", { id: idCategory });
  };

  const handleEditTodo = async () => {
    axios
      .put(
        baseURL + `/users/${dataUser.id}/category/${idCategory}/todo/${idTodo}`,
        form
      )
      .then((res) => {
        props.navigation.navigate("DetailTodos", { id: idCategory });
      })
      .catch((error) => alert(error));
  };

  return (
    <MainContainer>
      <Container>
        <Button
          onPress={handleGoBack}
          name="close"
          width="70px"
          height="30px"
          radius={50}
        />

        <ContainerEditTodo>
          <Input
            keyName="name"
            onChange={onChangeInput}
            value={form.name}
            name="Name"
          />
          <Input
            keyName="date"
            onChange={onChangeInput}
            value={String(form.date)}
            name="Date"
          />

          <ButtonDate onPress={showDatepicker}>
            <Text style={{ color: "grey", fontWeight: "600" }}>
              Change Date Here
            </Text>
          </ButtonDate>
          <ButtonDate onPress={showTimepicker}>
            <Text style={{ color: "grey", fontWeight: "600" }}>
              Change Time Here
            </Text>
          </ButtonDate>

          {show && (
            <DateTimePicker
              mode={mode}
              value={date}
              testID="dateTimePicker"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Button
            onPress={handleEditTodo}
            name="EditTodo"
            width="300px"
            height="40px"
            radius={50}
          />
        </ContainerEditTodo>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.Modal`
  height: 100px;
  background-color: black;
`;

const Container = styled.View`
  padding: 20px 20px;
`;

const ContainerEditTodo = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  padding: 10px;
  padding-top: 30px;
`;
const ButtonDate = styled.TouchableOpacity`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin: 0px 50px;
  margin-bottom: 40px;
  margin-top: -10px;
  border: 2px solid grey;
`;
