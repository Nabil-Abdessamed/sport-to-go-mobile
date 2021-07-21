import React, { useState, useCallback, useEffect } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImageZoom from "react-native-image-pan-zoom";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

const MyImage = ({ uri, styles, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={1}>
    <FastImage source={{ uri }} style={styles} resizeMode="contain" />
  </TouchableOpacity>
);

const initialProps = {
  data: null,
  zoom: false,
};

export default function STGImage(props = initialProps) {
  const [imageStyles, setImageStyles] = useState({});
  const [imageZoomVisible, setImageZoomVisible] = useState(false);
  const { zoom, data } = props;

  const renderImageDimensions = (data) => {
    if (data.width === data.height) {
      setImageStyles({
        width,
        height: width,
      });
    } else {
      const percent = (((data.width - width) * 100) / data.width) * 0.01;
      setImageStyles({
        width,
        height: data.height - data.height * percent,
      });
    }
  };

  const handleCloseImageZoom = () => {
    setImageZoomVisible(!imageZoomVisible);
  };

  useEffect(() => {
    renderImageDimensions(data);
    return () => {
      setImageStyles({});
    };
  }, []);

  const zoomJSX = zoom ? { onPress: handleCloseImageZoom } : null;

  return (
    <>
      {data && imageStyles && (
        <MyImage uri={data.uri} styles={imageStyles} {...zoomJSX} />
      )}
      {data && imageStyles && (
        <Modal
          visible={imageZoomVisible}
          transparent={true}
          onRequestClose={handleCloseImageZoom}
          animationType="fade"
          renderToHardwareTextureAndroid={true}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.modalBody}>
              <ImageZoom
                cropHeight={height}
                cropWidth={width}
                enableCenterFocus={true}
                enableDoubleClickZoom={true}
                style={styles.imageZoom}
                imageHeight={imageStyles.height}
                imageWidth={imageStyles.width}
                panToMove={true}
                pinchToZoom={true}
              >
                <MyImage uri={data.uri} styles={imageStyles} />
              </ImageZoom>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={handleCloseImageZoom}
              >
                <FontAwesome name="close" color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width,
    height,
  },
  modalBody: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width,
    height,
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
    position: "absolute",
    top: 10,
    right: 10,
  },
  imageZoom: {
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
