import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
export default function Welcome(props) {
  const handleNavigation = (screen) => {
    if (screen == "Log In") {
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("Register");
    }
  };
  return (
    <Container>
      <Header>
        <Text title>Welcome To Todo App199</Text>
        <Text style={{ marginTop: 10 }} paragraph>
          Organize all your to-do's in lists and projects. Color tag them to
          track your todo's
        </Text>
      </Header>

      <WelcomeImage source={require("../../assets/welcomeBG.png")} />

      <ButtonContainer>
        <Button
          onPress={handleNavigation}
          name="Log In"
          width="170px"
          height="45px"
          radius={20}
        />
        <Button
          onPress={handleNavigation}
          name="Rgister"
          width="170px"
          height="45px"
          radius={20}
        />
      </ButtonContainer>
    </Container>
  );
}

const Text = styled.Text`
  text-align: center;
  ${({ title, paragraph }) => {
    switch (true) {
      case title:
        return `font-size: 35px;
                        font-weight: 700;`;
      case paragraph:
        return `font-size: 13px
                        font-weight: 100;`;
    }
  }}
`;

const Container = styled.View`
  flex: 1;
  padding: 70px 40px;
  align-items: center;
  justify-content: center;
`;
const Header = styled.View``;

const WelcomeImage = styled.Image`
  width: 300px;
  height: 300px;
`;
const ButtonContainer = styled.View``;
