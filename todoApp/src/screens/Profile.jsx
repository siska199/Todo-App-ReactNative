import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import Button from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Profile({ navigation }) {
  const { dataUser, setDataUser } = useContext(UserContext);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("@key_storage");
      setDataUser({
        isLogin: false,
        status: "No user",
      });

      navigation.navigate("Welcome");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container>
      <TextHeader style={{ textAlign: "center" }}>Profile User</TextHeader>

      <ContainerDetails>
        <RowDetail>
          <FontAwesome name="user-o" size={24} color="black" />
          <Text>{dataUser.name}</Text>
        </RowDetail>
        <RowDetail>
          <Ionicons name="phone-portrait-outline" size={24} color="black" />
          <Text>{dataUser.phone}</Text>
        </RowDetail>
        <RowDetail>
          <Fontisto name="email" size={24} color="black" />
          <Text>{dataUser.email}</Text>
        </RowDetail>
        <RowDetail>
          <FontAwesome5 name="address-card" size={24} color="black" />
          <Text>{dataUser.address}</Text>
        </RowDetail>
      </ContainerDetails>

      <Button
        onPress={handleLogOut}
        name="Log Out"
        width="300px"
        height="40px"
        radius={20}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 70px 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const ContainerImage = styled.View``;
const ContainerDetails = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;
const RowDetail = styled.View`
  margin: 10px 0px;
  flex-direction: row;
`;

const Text = styled.Text`
  margin-left: 40px;
  font-size: 15px;
`;

const TextHeader = styled.Text`
  font-size: 25px;
  margin-top: -60px;
  font-weight: 700;
  color: black;
`;
