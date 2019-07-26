import React, { Component } from "react";
import Unsplash from 'unsplash-js/native';
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity } from "react-native";
import PhotoGrid from 'react-native-image-grid';
import { unsplashKey, unsplashSecret } from "../../Utils/Constants";

const unsplash = new Unsplash({
  applicationId: unsplashKey,
  secret: unsplashSecret
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
    const{user} = this.props

      unsplash.users.photos(user, 1, 25, "popular")
      .then(json => {
        let profile = JSON.parse(json._bodyInit);
        console.log("profinle", profile);
        this.setState({
          images: profile,
        });
      })
    .catch(err => {
      console.log("ERROR", err)
      Alert.alert("Unexpected Error");
    });

      let items = Array.apply(null, Array(60)).map((v, i) => {
        //Using demo placeholder images but you can add your images here
        return { id: i, urls : {small: 'http://placehold.it/200x200?text=' + (i +1)} };
      });
      this.setState({ images_test: items });
}
  renderHeader() {
    //Header of the Screen
    return <Text style={{padding:16, fontSize:20, color:'white', backgroundColor:'#a51313'}}>
               { "Free galery"}
           </Text>;
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    //Single item of Grid
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
          data={this.props.images? this.props.images : this.state.images? this.state.images :  this.state.images_test}
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
  images: state.Users.images,


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
