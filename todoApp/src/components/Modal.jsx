import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import Input from "./Input";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Modal(props) {
  const [date, setDate] = useState(props.value.date);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    props.onChangeInputModal(currentDate, "date");
  };

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

  return (
    <ModalCon visible={props.modal} animationType="slide">
      <ModalContainer>
        <Button
          onPress={props.handleModal}
          name="close"
          width="70px"
          height="30px"
          radius={50}
        />

        <ContainerAddTodo>
          {props.addTodo ? (
            <View>
              <Input
                keyName="name"
                onChange={props.onChangeInputModal}
                value={props.value.name}
                name="Name"
              />
              <Input
                keyName="date"
                onChange={props.onChangeInputModal}
                value={String(date)}
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
            </View>
          ) : (
            <Input
              onChange={props.onChangeInputModal}
              value={props.value}
              name={props.title}
            />
          )}

          <Button
            onPress={props.handleAdd}
            name={props.butName}
            width="300px"
            height="40px"
            radius={50}
          />
        </ContainerAddTodo>
      </ModalContainer>
    </ModalCon>
  );
}

const ModalCon = styled.Modal`
  height: 100px;
  background-color: black;
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
const ModalContainer = styled.View`
  padding: 20px 20px;
`;

const ContainerAddTodo = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  padding: 10px;
  padding-top: 30px;
`;
