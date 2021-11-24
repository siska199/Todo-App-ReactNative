import React, { useState, useEffect } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.navigation.navigate("MyTasks");
    }, 500);
  }, []);

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
