import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import Video from "react-native-video";
import PropTypes from "prop-types";
import VideoPlayer from "react-native-video-controls";

const { width, height } = Dimensions.get("screen");
const defaultVideoHeight = width * 0.5625;

export class STGVideo extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    style: PropTypes.object,
    disableBack: PropTypes.bool,
    onVideoBackPress: PropTypes.func,
    disableFullscreen: PropTypes.bool,
    fullscreen: PropTypes.bool,
    fullscreenShowButton: PropTypes.bool,
    onVideoFullscreenEnter: PropTypes.func,
    onVideoFullscreenExit: PropTypes.func,
  };
  static defaultProps = {
    source: null,
    style: {},
    disableBack: false,
    disableFullscreen: false,
    onVideoBackPress: () => {},
    fullscreen: false,
    fullscreenShowButton: false,
    onVideoFullscreenEnter: () => {},
    onVideoFullscreenExit: () => {},
  };

  state = {
    paused: true,
    progress: 0,
    duration: 0,
    videoHeight: null,
    fullscreen: false,
    fullscreenStyle: {},
  };

  handleLoad = (meta) => {
    const { naturalSize } = meta;
    const naturalSizeWidth = naturalSize.width;
    const naturalSizeHeight = naturalSize.height;
    if (naturalSizeWidth > width) {
      const widthDiff = naturalSizeWidth - width;
      const percent = (widthDiff * 100) / naturalSizeWidth;
      const newHeight = naturalSizeHeight * ((100 - percent) * 0.01);
      this.setState({ videoHeight: newHeight > height ? height : newHeight });
    } else {
      this.setState({ videoHeight: defaultVideoHeight });
    }
  };

  bufferConfig = {
    minBufferMs: 5000,
    maxBufferMs: 10000,
    bufferForPlaybackMs: 1000,
    bufferForPlaybackAfterRebufferMs: 2000,
  };

  render() {
    return Platform.OS === "ios" ? (
      <Video
        bufferConfig={this.bufferConfig}
        source={this.props.source}
        style={{
          width,
          minHeight: defaultVideoHeight,
          height: this.state.videoHeight,
          maxHeight: height,
        }}
        onLoad={this.handleLoad}
        ref={(ref) => {
          this.player = ref;
        }}
        controls={true}
        resizeMode={"contain"}
        paused={true}
        fullscreenAutorotate={true}
        disableFocus
      />
    ) : (
      <VideoPlayer
        style={{
          width,
          minHeight: defaultVideoHeight,
          height: this.props.fullscreen ? height : this.state.videoHeight,
          maxHeight: height,
          ...this.props.style,
        }}
        bufferConfig={this.bufferConfig}
        source={this.props.source}
        paused={true}
        onLoad={this.handleLoad}
        fullscreenAutorotate={true}
        disableBack={this.props.disableBack}
        disableFullscreen={this.props.disableFullscreen}
        fullscreen={this.props.fullscreen}
        onEnterFullscreen={this.props.onVideoFullscreenEnter}
        onExitFullscreen={this.props.onVideoFullscreenExit}
        onBack={this.props.onVideoBackPress}
      />
    );
  }
}

export default STGVideo;
