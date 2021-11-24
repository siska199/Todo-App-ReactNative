import React from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

export default function NavbarUp(props) {
  return (
    <Container>
      <IconContainer onPress={props.onPress}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </IconContainer>
    </Container>
  );
}

const Container = styled.View`
  align-self: flex-start;
  height: 50px;
`;
const IconContainer = styled.TouchableOpacity`
  margin-left: -10px;
  background-color: #81a9eb;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
