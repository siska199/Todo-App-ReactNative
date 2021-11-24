import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import BoxTodos from "../components/BoxTodos";
import Button from "../components/Button";
import ListTodo from "../components/ListTodo";
import Modal from "../components/Modal";
import baseURL from "../constanta/index";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function DetailTodos(props) {
  const initialValue = {
    name: "",
    date: new Date(),
    isDone: false,
  };
  const [formAdd, setFormAdd] = useState(initialValue);

  const onChangeInput = (inputText, key) => {
    if (key == "name") {
      setFormAdd({ ...formAdd, name: inputText });
    }

    if (key == "date") {
      setFormAdd({ ...formAdd, date: String(inputText) });
    }
  };

  const { id } = props.route.params; //Id category
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [numTodo, setNumTodo] = useState("");
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
    }, 2500);
  }, []);

  const getItems = async () => {
    axios
      .get(baseURL + `/users/${dataUser.id}/category/${id}/todo`)
      .then((res) => {
        setNumTodo(res.data.length);
        setItems(res.data.reverse());
      })
      .catch((error) => alert(error));

    axios
      .get(baseURL + `/users/${dataUser.id}/category/${id}`)
      .then((res) => {
        setCategoryData({
          ...res.data,
        });
      })
      .catch((error) => alert(error));
  };

  const handleModalAddTodo = () => {
    setModal(!modal);
  };

  const handleAddTodo = async () => {
    axios
      .post(baseURL + `/users/${dataUser.id}/category/${id}/todo`, formAdd)
      .then((res) => {
        setModal(false);
        setFormAdd(initialValue);
        setRender(!render);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = (idCat, idTodo) => {
    props.navigation.navigate("EditTodo", {
      idCategory: idCat,
      idTodo: idTodo,
    });
  };
  const handleDelCategory = async () => {
    try {
      await axios.delete(
        baseURL + `/users/${dataUser.id}/category/${categoryData.id}`
      );
      props.navigation.navigate("TabNav");
    } catch (error) {
      alert(error);
    }
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
      <BoxTodos
        handleDelCategory={handleDelCategory}
        numTodo={numTodo}
        details={true}
        item={categoryData}
      />

      <Wrap>
        {items != "" ? (
          <ContainerListTodos
            showsVerticalScrollIndicator={false}
            data={items}
            renderItem={({ item }) => (
              <ListTodo
                handleEdit={handleEdit}
                handleRender={setRender}
                render={render}
                key={item.id}
                item={item}
              />
            )}
          />
        ) : (
          <LottieView
            style={{ width: 300, height: 300 }}
            source={require("./empty.json")}
            autoPlay
            loop
          />
        )}
      </Wrap>

      <Button
        onPress={handleModalAddTodo}
        name="+"
        width="50px"
        height="50px"
        radius={50}
        abs={true}
      />
      <Modal
        addTodo={true}
        onChangeInputModal={onChangeInput}
        value={formAdd}
        modal={modal}
        butName="Add Todo"
        handleModal={handleModalAddTodo}
        handleAdd={handleAddTodo}
      />
    </Container>
  );
}

const Container = styled.View`
  padding-top: 30px;
  background-color: #81a9eb;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;
const Wrap = styled.View`
  background-color: white;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  margin-top: 30px;
  width: 100%;
  height: 70%;
  padding: 0px 40px;
  padding-top: 50px;
  padding-bottom: 70px;
`;

const ContainerListTodos = styled.FlatList``;
