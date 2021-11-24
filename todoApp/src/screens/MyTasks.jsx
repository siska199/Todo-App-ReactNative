import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import BoxTodos from "../components/BoxTodos";
import Button from "../components/Button";
import Modal from "../components/Modal";
import baseURL from "../constanta/index";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function MyTasks(props) {
  const [formAdd, setFormAdd] = useState({ name: "" });

  const onChangeCategory = (inputText) => {
    setFormAdd({ name: inputText });
  };

  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [modal, setModal] = useState(false);

  const { dataUser } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      getItems();
    }, [render])
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getItems();
      setLoading(false);
    }, 2000);
  }, []);

  const getItems = async () => {
    axios
      .get(baseURL + `/users/${dataUser.id}/category`)
      .then((res) => {
        setItems(res.data.reverse());
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getNumTasks = async (idUser, idCategory) => {
    axios
      .get(baseURL + `/users/${idUser}/category/${idCategory}/todo`)
      .then((res) => {
        return resTodos.data.length;
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleTodos = (id) => {
    props.navigation.navigate("DetailTodos", { id: id });
  };

  const handleModalAddTask = () => {
    setModal(!modal);
  };

  const handleAddTask = async () => {
    axios
      .post(baseURL + `/users/${dataUser.id}/category`, formAdd)
      .then((res) => {
        setModal(false);
        setFormAdd({ name: "" });
        setRender(!render);
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          style={{ width: 150, height: 150 }}
          source={require("./loading.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Container>
      <Text title style={{ marginBottom: 20 }}>
        My Task
      </Text>

      {items != "" ? (
        <ContainerTodos
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={items}
          renderItem={({ item }) => (
            <BoxTodos
              getNumb={getNumTasks}
              bg={true}
              handleTodos={handleTodos}
              key={item.id}
              item={item}
            />
          )}
        />
      ) : (
        <ConEmpty>
          <LottieView
            style={{ width: 300, height: 300 }}
            source={require("./empty.json")}
            autoPlay
            loop
          />
        </ConEmpty>
      )}

      <Button
        onPress={handleModalAddTask}
        name="+"
        width="50px"
        height="50px"
        radius={50}
      />
      <Modal
        onChangeInputModal={onChangeCategory}
        value={formAdd.name}
        modal={modal}
        butName="Add Task"
        handleModal={handleModalAddTask}
        handleAdd={handleAddTask}
        title={"Category Name"}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 30px 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ContainerTodos = styled.FlatList`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const ConEmpty = styled.View`
  height: 70%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: #81a9eb;
  font-size: 35px;
  align-self: flex-start;
  font-weight: 700;
`;
