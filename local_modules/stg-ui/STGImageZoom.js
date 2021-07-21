import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import ImageZoom from "react-native-image-pan-zoom";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
const imageHeight = width * 0.5625;

class STGImageZoom extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    withZoom: PropTypes.bool,
  };
  static defaultProps = {
    uri: "",
    withZoom: true,
  };
  state = {
    height: null,
    width: null,
    zoom: false,
  };

  resizeImage = (nativeEvent) => {
    // const widthDiff = nativeEvent.width - width;
    // const percent = (widthDiff * 100) / nativeEvent.width;
    // const newHeigh = nativeEvent.height - nativeEvent.height * (percent * 0.01);
    // this.setState({ width, height: newHeigh });

    if (nativeEvent.width === nativeEvent.height) {
      this.setState({
        width,
        height: width,
      });
    } else {
      const isVertical = nativeEvent.height > nativeEvent.width ? true : false;
      if (isVertical) {
        if (nativeEvent.width > width) {
          const percent =
            (((nativeEvent.width - width) * 100) / nativeEvent.width) * 0.01;
          this.setState({ width, height: nativeEvent.height * (1 - percent) });
        }
      } else {
        this.setState({
          width,
          height: imageHeight,
        });
      }
    }
  };

  renderImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          height: this.state.height,
          width: this.state.width,
        }}
        onPress={() => {
          this.setState({ zoom: true });
        }}
      >
        <FastImage
          source={{
            uri: this.props.uri,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{
            height: this.state.height,
            width: this.state.width,
          }}
          resizeMode="cover"
          onLoad={({ nativeEvent }) => {
            this.resizeImage(nativeEvent);
          }}
        />
      </TouchableOpacity>
    );
  };

  renderClickableImage = () => (
    <TouchableOpacity
      onPress={() => {
        this.setState({ zoom: true });
      }}
      activeOpacity={1}
      style={{
        height: this.state.height,
        width: this.state.width,
      }}
    >
      {this.renderImage()}
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        {this.props.withZoom ? this.renderClickableImage() : this.renderImage()}
        <Modal
          visible={this.state.zoom}
          animated
          animationType="fade"
          onRequestClose={() => this.setState({ zoom: false })}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.modalBody}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => this.setState({ zoom: false })}
              >
                <FontAwesome name="close" color="#fff" size={20} />
              </TouchableOpacity>
              <ImageZoom
                ref={(ref) => (this.imageZoom = ref)}
                cropHeight={height}
                cropWidth={width}
                enableCenterFocus={true}
                enableDoubleClickZoom={true}
                style={styles.imageZoom}
                imageHeight={this.state.height}
                imageWidth={this.state.width}
                panToMove={true}
                pinchToZoom={true}
              >
                <FastImage
                  source={{ uri: this.props.uri }}
                  style={{
                    height: this.state.height,
                    width: this.state.width,
                    minHeight: this.state.height,
                    minWidth: this.state.width,
                  }}
                  resizeMode="contain"
                  onLoad={({ nativeEvent }) => {
                    this.resizeImage(nativeEvent);
                  }}
                />
              </ImageZoom>
            </View>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    height: 32,
    width,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  modalBody: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  btnClose: {
    width: 32,
    height: 32,
    borderColor: "#FFF",
    borderWidth: 0.5,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    alignSelf: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 9999,
  },
  imageZoom: {
    backgroundColor: "#000",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default STGImageZoom;
