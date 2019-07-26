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
import { update } from "../../Ducks/UsersReducer/UsersReducer";
import { SearchBar } from 'react-native-elements';

import styles from "./styles";

class Sidebar extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  addUser = search => {
    const {users } = this.props;
    users.push(this.state.search);
    this.props.update({users: users}),
    this.setState({ search:"" });
  };
  
  render() {
    const { search } = this.state;
    const {users } = this.props;
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
              onEndEditing={() => this.addUser()}
            />
          { users.length > 0 ?   <List
            dataArray={users}
            renderRow={item => {
              return (
                <ListItem icon button onPress={() => this.props.update({actualUser: item})}>
                  <Left>
                    <Icon
                      active
                      type="MaterialCommunityIcons"
                      name={"person"}
                    />
                  </Left>
                  <Body>
                    <Text>{item}</Text>
                  </Body>
                </ListItem>
              );
            }}
          /> : 
          <View style={styles.notUsersContainer}>
            <Text>{"Not users searched yet..."}</Text>
          </View>
          }
        </Content>
        <View style={styles.version_box}>
          <Text>VERSION</Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.Users.users,
  user: state.Users.users.actualUser

});

const mapDispatchToProps = {
  update,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
