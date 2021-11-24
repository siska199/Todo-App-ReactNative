import React from "react";
import styled from "styled-components";

export default function Button(props) {
  return (
    <ButtonComp
      abs={props.abs ? true : false}
      onPress={() => props.onPress(props.name)}
      width={props.width}
      height={props.height}
      radius={props.radius}
    >
      <Text>{props.name}</Text>
    </ButtonComp>
  );
}

const ButtonComp = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #81a9eb;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.radius}px;
  margin-top: 10px;
  ${({ abs }) => {
    if (abs == true) {
      return `
             position : absolute;
             bottom: 20px;
             right: 20px;   
            `;
    }
  }}
`;

const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
`;
