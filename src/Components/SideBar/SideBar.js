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
import { sideBarItems } from "../../Utils/Constants";
import styles from "./styles";

class Sidebar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.logo_container}>
            <Image style={styles.background} />
            <Image style={styles.logo_image} />
          </View>

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
