import React from "react";
import styled from "styled-components";

export default function Input(props) {
  return (
    <InputCon>
      <Text paragraph style={{ alignSelf: "flex-start" }}>
        {props.name}
      </Text>
      {props.keyName == "date" ? (
        <InputFill style={{ color: "red" }} value={props.value} />
      ) : (
        <InputFill
          value={props.value}
          onChangeText={(value) => props.onChange(value, props.keyName)}
          secureTextEntry={props.name == "Password" ? true : false}
        />
      )}
    </InputCon>
  );
}
const InputCon = styled.View`
  margin-bottom: 30px;
`;

const InputFill = styled.TextInput`
  margin-top: -10px;
  width: 300px;
  height: 50px;
  border-bottom-color: grey;
  border-bottom-width: 2px;
`;

const Text = styled.Text`
  align-self: flex-start;
  text-align: center;
  font-size: 15px;
  font-weight: 100;
  color: grey;
`;
