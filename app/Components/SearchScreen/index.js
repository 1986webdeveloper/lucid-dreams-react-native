import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import { Static_Images } from "../../Constants";
import theme from "../../Theme";
import CustomFlatlist from "../CustomFlatlist";

import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "UserDatabase.db" });

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [] //Sqlite flatlist data
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp
        });
        this.arrayholder = temp;
      });
    });
  }

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title} ${item.tags}`;

      const textData = text;

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ FlatListItems: newData });
  };

  clearSearch() {
    this.textInput.clear();
    this.componentDidMount();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={Static_Images.image_bg}
          style={{ height: "100%", width: "100%" }}
          resizeMode="stretch"
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: "5%",
                paddingTop: Platform.OS === "ios" ? "5%" : "10%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1.5,
                    borderRadius: 10,
                    borderColor: "#bab5d9"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 5
                    }}
                  >
                    <Image
                      source={Static_Images.image_search}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: "#a17df7"
                      }}
                    />
                    <TextInput
                      style={{
                        height: 40,
                        width: "85%",
                        color: "white",
                        fontSize: 16,
                        fontFamily: theme.FONT_MEDIUM,
                        textDecorationLine: "none"
                      }}
                      selectionColor={theme.PRIMARY_COLOR}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.searchFilterFunction(text)}
                      autoCorrect={false}
                      ref={input => {
                        this.textInput = input;
                      }}
                      // placeholder='Search'
                    />
                    <TouchableOpacity onPress={() => this.clearSearch()}>
                      <Image
                        source={Static_Images.image_close}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: "#a17df7"
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ paddingStart: 10 }}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Text
                    style={{
                      color: "#a37ef9",
                      fontSize: 18,
                      fontFamily: theme.FONT_SEMI_BOLD
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <CustomFlatlist
                data={this.state.FlatListItems}
                keyExtractor={item => item.title}
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
