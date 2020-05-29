import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "../CustomModal";

import { EventRegister } from "react-native-event-listeners";

class FlatlistModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.openModalListener = EventRegister.addEventListener(
      "openModal",
      data => {
        this.openBottomSheet();
      }
    );
  }

  componentWillUnmount() {
    openModalListener.removeEventListener(this.listener);
    this.refs.modal4.close();
  }

  openBottomSheet() {
    this.setState({
      modal_title: "item.title",
      modal_desc: "item.description,",
      modal_date: "item.date",
      modal_time: "item.time",
      modal_rating: "item.rating",
      modal_dream_type: "item.type",
      modal_how_was_sleep: "item.first_answer",
      modal_clarity: "item.second_answer",
      modal_mood: "item.fifth_answer",
      modal_tags: "JSON.parse(item.tags)",
      modal_music: "item.voice_record",
      modal_music_time: "item.voice_time"
    });
    this.refs.modal4.open();
  }

  BottomSheet() {
    return (
      <Modal
        style={[styles.modal, styles.modal4, { zIndex: 999 }]}
        position={"bottom"}
        ref={"modal4"}
        backButtonClose={true}
        backdropColor="black"
        backdropOpacity={0.6}
        animationDuration={400}
      >
        {this.ModalView()}
      </Modal>
    );
  }

  ModalView() {
    return (
      <View
        style={{
          backgroundColor: "#6346C4",
          width: "100%",
          height: "100%",
          paddingHorizontal: "5%",
          paddingTop: "5%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <View
          style={{
            height: 6,
            width: 60,
            backgroundColor: "white",
            opacity: 0.2,
            borderRadius: 6 / 2,
            alignSelf: "center",
            marginBottom: "5%"
          }}
        />
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.BottomSheet()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

export default FlatlistModal;
