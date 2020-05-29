import React, { Component } from 'react';
import {
  Text,
  View,FlatList
} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' }); 

export default class Tab3 extends Component {
  constructor(props) {
    super(props);
  this.state = {
    FlatListItems: [],
  };
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM table_reality_check', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      this.setState({
        FlatListItems: temp,
      });
    });
  });
  
}

ListViewItemSeparator = () => {
  return (
    <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
  );
};

  render() {
    return (
      <View style={{flex:1,padding:'5%',backgroundColor:"#413298"}}>
    <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.user_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.frequency}</Text>
              <Text>Name: {item.start_time}</Text>
              <Text>Contact: {item.end_time}</Text>

            </View>
          )}
        />
      </View>
    );
  }
}
