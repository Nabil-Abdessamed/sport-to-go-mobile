import React, { Component } from "react";
import { ScrollView } from "react-native";
import PropsType from "prop-types";

export class STGScrollView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"always"}
        contentContainerStyle={{
          paddingBottom: 48,
          ...this.props.contentContainerStyle,
        }}
        removeClippedSubviews={true}
        {...this.props}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}

STGScrollView.propTypes = {
  contentContainerStyle: PropsType.object,
};
STGScrollView.defaultProps = {
  contentContainerStyle: {},
};

export default STGScrollView;
