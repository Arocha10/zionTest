import React, { Component } from "react";
import Unsplash from 'unsplash-js/native';
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity } from "react-native";
import PhotoGrid from 'react-native-image-grid';

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const unsplash = new Unsplash({
  applicationId: "aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5",
  secret: "a5ab4ed2efdc772dca8d5636a26c0d897907df38cd92baa9067e57093d9596b5"
});
class App extends Component {

  constructor() {
    super();
    state = {
      images: null,
      images_test:[],
    };
  }

  componentWillMount() {
    console.log("USER", this.props.user)
      console.log("hay usuario");
      unsplash.users.photos("corneschi", 1, 20, "popular")
      .then(json => {
        let profile = JSON.parse(json._bodyInit);
        console.log("profinle", profile);
        this.setState({
          images: profile,
        });
      })
    .catch(err => {
      console.log("ERROR", err)
      Alert.alert("The user not exist or doesnt have any photo");
    });

      let items = Array.apply(null, Array(60)).map((v, i) => {
        //Using demo placeholder images but you can add your images here
        return { id: i, urls : {small: 'http://placehold.it/200x200?text=' + (i +1)} };
      });
      this.setState({ images_test: items });
}
  renderHeader() {
    //Header of the Screen
    return <Text style={{padding:16, fontSize:20, color:'white', backgroundColor:'green'}}>
               { "Free galery"}
           </Text>;
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    //Single item of Grid
    console.log("ITEM", item);
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
        }}>
        <Image
          resizeMode="cover"
          resizeMethod="resize"
          style={{ flex: 1 }}
          source={{ uri: item.urls.small }}
        />
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View style={styles.container}>

        <PhotoGrid
          data={this.state.images? this.state.images :  this.state.images_test}
          itemsPerRow={3}
          //You can decide the item per row
          itemMargin={1}
          itemPaddingHorizontal={1}
          renderHeader={this.renderHeader}
          renderItem={this.renderItem.bind(this)}
        /> 
      </View>
    );
  }
}

const mS = state => ({
  user: state.Users.actualUser,

});

const mD = {
};

export default connect(
  mS,
  mD
)(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: "10%"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },    
  MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
    containerStyle: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 20,
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
      width: 25,
      height: 25,
      top: 9,
      right: 9,
      position: 'absolute',
    },
});
