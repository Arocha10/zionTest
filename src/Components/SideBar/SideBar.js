import React, { Component } from "react";
import { View, Image,  Alert,
} from "react-native";
import { connect } from "react-redux";
import {
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Container
} from "native-base";
import { Icon } from 'react-native-elements'

import { update } from "../../Ducks/UsersReducer/UsersReducer";
import { SearchBar } from 'react-native-elements';
import { unsplashSecret, unsplashKey } from "../../Utils/Constants";
import styles from "./styles";
import Unsplash from 'unsplash-js/native';

const unsplash = new Unsplash({
  applicationId: unsplashKey,
  secret: unsplashSecret
});

class Sidebar extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  updateUser = search => {
    const {users } = this.props;
    console.log(search)
    if(search){

      unsplash.users.photos(search, 1, 30, "popular")
      .then(json => {
        let profile = JSON.parse(json._bodyInit);
        if(profile.errors){
          Alert.alert("Error", profile.errors[0]);

        }else{
          console.log("profinle", profile);
          let images = profile;
          this.props.update({users: users, actualUser:search, images: images}),
          this.setState({ search:"" });
        }
      })
    .catch(err => {
      console.log("ERROR", err)
      Alert.alert("The user not exist or doesnt have any photo");
    });
    }

  };

  addUser = search => {
    const {users } = this.props;
    console.log(search)
    if(search){

      unsplash.users.photos(search, 1, 30, "popular")
      .then(json => {
        let profile = JSON.parse(json._bodyInit);
        console.log("profinle", profile);
        if(profile.errors){
          Alert.alert("Error", profile.errors[0]);
        }else{
        let images = profile;
        users.push(this.state.search);
        this.props.update({users: users, actualUser:search, images: images}),
        this.setState({ search:"" });
      }
      })
    .catch(err => {
      console.log("ERROR", err)
      Alert.alert("The user not exist or doesnt have any photo");
    });
    }

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
              onEndEditing={() => this.addUser(search)}
            />
          { users.length > 0 ?   <List
            dataArray={users}
            renderRow={item => {
              return (
                <ListItem icon button onPress={() => this.updateUser(search)}>

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
          <Text style={styles.versionText}>Made by Andres Rocha </Text>
          <Text style={styles.versionText}>github: Arocha10 </Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.Users.users,
  user: state.Users.actualUser

});

const mapDispatchToProps = {
  update,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
