import React from "react";
import styled, { withTheme } from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function BoxTodos(props) {
  return (
    <BoxTodosCon
      onPress={props.bg ? () => props.handleTodos(props.item.id) : null}
      bg={props.bg ? true : false}
    >
      {props.bg ? (
        <IconContainerTask>
          <FontAwesome5 name="list-alt" size={30} color="#81a9eb" />
        </IconContainerTask>
      ) : (
        <IconContainerTask>
          <IconContainer>
            <FontAwesome5 name="list-alt" size={30} color="#81a9eb" />
          </IconContainer>

          <DeleteContainer onPress={() => props.handleDelCategory()}>
            <Text style={{ color: "white", fontSize: 15 }}>Delete Task</Text>
          </DeleteContainer>
        </IconContainerTask>
      )}
      <TextContainer>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={
            props.bg
              ? { fontSize: 21, color: "black" }
              : { fontSize: 35, fontWeight: "bold", color: "white" }
          }
        >
          {String(props.item.name)}
        </Text>

        {props.details ? (
          <Text
            style={
              props.bg
                ? { color: "grey" }
                : { fontSize: 15, fontWeight: "100", color: "white" }
            }
          >
            {String(props.numTodo)} Tasks
          </Text>
        ) : (
          <Text
            style={
              props.bg
                ? { color: "grey" }
                : { fontSize: 15, fontWeight: "100", color: "white" }
            }
          >
            See list of todos
          </Text>
        )}
      </TextContainer>
    </BoxTodosCon>
  );
}

const BoxTodosCon = styled.TouchableOpacity`
  align-self: flex-start;
  width: ${(props) => (props.bg ? 145 : 300)}px;
  height: ${(props) => (props.bg ? 140 : 150)}px;
  margin: 7px;
  padding: 15px 15px;
  border-radius: 5px;
  background-color: transparent;

  ${({ bg }) => {
    if (bg == true) {
      return `background-color: white;`;
    }
  }}
`;

const IconContainer = styled.View`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const IconContainerTask = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  margin-top: 20px;
`;

const Text = styled.Text`
  font-size: 13px;
  font-weight: 100;
  color: grey;
`;
const DeleteContainer = styled.TouchableOpacity`
  margin-top: 4px;
  margin-right: -48px;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
`;
