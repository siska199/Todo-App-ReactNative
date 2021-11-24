import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { Feather } from "@expo/vector-icons";
import baseURL from "../constanta/index";
import axios from "axios";
const ListTodo = (props) => {
  const [check, setCheck] = useState(props.item.isDone);
  const { dataUser } = useContext(UserContext);

  const handleCheck = async () => {
    try {
      await axios.put(
        baseURL +
          `/users/${dataUser.id}/category/${props.item.categoryId}/todo/${props.item.id}`,
        { isDone: !check }
      );
      setCheck(!check);
      props.handleRender(!props.render);
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(
        baseURL +
          `/users/${dataUser.id}/category/${props.item.categoryId}/todo/${props.item.id}`,
        { isDone: !check }
      );
      props.handleRender(!props.render);
    } catch (error) {
      alert(error);
    }
  };

  let edDate = [];
  props.item.date
    .split(" ")
    .map((d, i) => {
      if (i < 5) {
        return edDate.push(d);
      }
    })
    .join(" ");

  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth()
    );
  }

  const handelDate = () => {
    const d1 = new Date();
    const d2 = new Date(props.item.date);

    if (props.item.isDone == true) {
      return <Text style={{ color: "green", marginBottom: 13 }}>Done</Text>;
    }

    if (isSameDay(d1, d2)) {
      return <Text style={{ color: "blue", marginBottom: 13 }}>Today</Text>;
    }
    if (d1.setHours(0, 0, 0, 0).valueOf() < d2.setHours(0, 0, 0, 0).valueOf()) {
      return (
        <Text style={{ color: "orange", marginBottom: 13 }}>On Going</Text>
      );
    } else {
      return <Text style={{ color: "red", marginBottom: 13 }}>Late</Text>;
    }
  };

  return (
    <ListTodoCon>
      <DetailTodo>
        <CheckBox onPress={() => handleCheck()}>
          {handelDate()}

          <Text
            style={check ? { textDecorationLine: "line-through" } : {}}
            titleTodo
          >
            {props.item.name}
          </Text>

          <Text timeTodo>{edDate.join(" ")}</Text>
        </CheckBox>
      </DetailTodo>

      <IconTodo>
        <EditContainer
          onPress={() => props.handleEdit(props.item.categoryId, props.item.id)}
        >
          <Feather name="edit" size={24} color="green" />
        </EditContainer>
        <DeleteContainer onPress={() => handleDeleteTodo()}>
          <Feather name="delete" size={24} color="red" />
        </DeleteContainer>
      </IconTodo>
    </ListTodoCon>
  );
};

export default ListTodo;

const ListTodoCon = styled.View`
  margin-bottom: 40px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const DetailTodo = styled.View`
  flex: 0.9;
`;

const IconTodo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const EditContainer = styled.TouchableOpacity`
  margin-right: 10px;
`;

const DeleteContainer = styled.TouchableOpacity``;

const CheckBox = styled.TouchableOpacity``;

const Text = styled.Text`
  color: ${(props) => (props.todoList ? `black` : `white`)};
  ${({ title, paragraph, button, titleTodo, timeTodo }) => {
    switch (true) {
      case title:
        return `font-size: 30px;
                        font-weight: 700;`;
      case paragraph:
        return `font-size: 17px
                        font-weight: 100;`;
      case button:
        return `font-size: 20px
                        font-weight: 700;
                        color: white;
                        `;
      case titleTodo:
        return `font-size: 20px
                        font-weight: 700;
                        color: black;
                        `;
      case timeTodo:
        return `font-size: 13px
                        color: grey;
                        `;
    }
  }}
`;
