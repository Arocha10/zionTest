import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import {
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Button,
  Container
} from "native-base";
import Unsplash from 'unsplash-js/native';
import { sideBarItems } from "../../Utils/Constants";
import { SearchBar } from 'react-native-elements';

import styles from "./styles";

class Sidebar extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };
  
  render() {
    const { search } = this.state;

    return (
      <Container>
        <Content>
          <View style={styles.logo_container}>
            <Image style={styles.background} />
            <Image style={styles.logo_image} />
          </View>
          <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              onEndEditing={() => console.log("ya edite")}
            />
          <List
            dataArray={sideBarItems}
            renderRow={item => {
              return (
                <ListItem icon button onPress={() => console.log("Hey")}>
                  <Left>
                    <Icon
                      active
                      type="MaterialCommunityIcons"
                      name={item.icon}
                    />
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
          <Button
            style={styles.logout_button}
            onPress={() => {
              console.log("hey");
            }}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
        <View style={styles.version_box}>
          <Text>VERSION</Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
