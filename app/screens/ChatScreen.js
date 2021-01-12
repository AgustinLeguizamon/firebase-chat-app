import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Component } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import Fire from "../database/Fire";

class ChatScreen extends Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.route.params.name,
    };
  }

  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.send}
        user={this.user}
      ></GiftedChat>
    );

    return <SafeAreaView style={styles.chat}>{chat}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <ChatScreen {...props} navigation={navigation}></ChatScreen>;
}
