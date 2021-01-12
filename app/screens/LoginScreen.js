import React from "react";
import { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

class LoginScreen extends Component {
  state = { name: "" };

  continue = () => {
    this.props.navigation.navigate("Chat", { name: this.state.name });
  };

  render() {
    return (
      <View>
        <Text>Username</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(name) => {
            this.setState({ name });
          }}
          placeholder="username"
        ></TextInput>
        <Button title="Continuar" onPress={this.continue}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default LoginScreen;
