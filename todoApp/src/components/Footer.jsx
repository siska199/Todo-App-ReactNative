import React from "react";
import styled from "styled-components";

export default function Footer(props) {
  return (
    <Container>
      <Text paragraph style={{ marginTop: 10 }}>
        {props.text}
      </Text>
      <TextButton onPress={props.onPress}>
        <Text>{props.textButton}</Text>
      </TextButton>
    </Container>
  );
}

const Container = styled.View``;
const TextButton = styled.TouchableOpacity``;

const Text = styled.Text`
  text-align: center;
  ${({ title, paragraph }) => {
    switch (true) {
      case title:
        return `font-size: 35px;
                        font-weight: 500;
                        align-self: flex-start;
                        margin-left : -5px;
                        `;
      case paragraph:
        return `font-size: 15px;
                        font-weight: 100;
                        color: grey;
                       
                        `;
    }
  }}
`;
