import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import STGStyles from "./STGStyles";
import PropTypes from "prop-types";

class STGDatePicker extends Component {
  static propTypes = {
    attr: PropTypes.string,
    value: PropTypes.any,
    handleChangeInput: PropTypes.func,
    t: PropTypes.func,
    dateFormat: PropTypes.string,
    dateMode: PropTypes.string,
    minimumDate: PropTypes.any,
    maximumDate: PropTypes.any,
    locate: PropTypes.string,
  };
  static defaultProps = {
    attr: "startAt",
    value: new Date(),
    handleChangeInput: () => {},
    t: () => {},
    dateFormat: "DD MMM YYYY",
    dateMode: "date",
    minimumDate: null,
    maximumDate: null,
    locate: "fr",
  };
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      showAndroidDate: false,
      showAndroidTime: false,
      startAtError: null,
    };
  }

  _hideDate = () => {
    this.setState({ showDate: false });
  };

  _setDate = (event, date) => {
    date = date || this.props.value;
    this.props.handleChangeInput(this.props.attr, date);
  };

  _showDate = (value) => {
    if (Platform.OS === "ios") {
      this.setState({ showDate: value });
    } else {
      if (this.props.dateMode === "time") {
        this._showAndroidTime();
      } else {
        this._showAndroidDate();
      }
    }
  };

  _showAndroidTime = () => {
    this.setState({ showAndroidTime: true });
  };

  _hideAndroidTime = () => {
    this.setState({ showAndroidTime: false });
  };

  _showAndroidDate = () => {
    this.setState({ showAndroidDate: true });
  };

  _hideAndroidDate = () => {
    this.setState({ showAndroidDate: false });
  };

  _setAndroidDate = (e, date) => {
    date = date || this.props.value;
    this.setState({ showAndroidDate: false }, () => {
      this.props.handleChangeInput(this.props.attr, date);
    });
  };

  _setAndroidTime = (e, date) => {
    date = date || this.props.value;
    this.setState({ showAndroidTime: false }, () => {
      this.props.handleChangeInput(this.props.attr, date);
    });
  };

  render() {
    const { t, value } = this.props;
    const {
      showAndroidDate,
      showDate,
      showAndroidTime,
      startAtError,
    } = this.state;
    return (
      <>
        <TouchableOpacity
          style={STGStyles.dateContainer}
          onPress={() => this._showDate()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {this.props.dateMode === "time" ? (
              <MaterialCommunityIcons name="clock" size={16} />
            ) : (
              <MaterialCommunityIcons name="calendar-month-outline" size={16} />
            )}
            <Text style={STGStyles.dateEditBtnText}>
              {moment(value)
                .locale(this.props.locate)
                .format(this.props.dateFormat) || ""}
            </Text>
          </View>
          <MaterialIcons name="edit" size={18} color="#000000" />
        </TouchableOpacity>
        {showAndroidDate && (
          <DateTimePicker
            value={value}
            mode={"date"}
            display="spinner"
            onChange={this._setAndroidDate}
            minimumDate={this.props.minimumDate}
            maximumDate={this.props.maximumDate}
            locale="fr-FR"
          />
        )}
        {showAndroidTime && (
          <DateTimePicker
            value={value}
            mode={"time"}
            display="spinner"
            onChange={this._setAndroidTime}
            locale="fr-FR"
          />
        )}
        {startAtError && <Text style={STGStyles.helper}>{startAtError}</Text>}
        <Modal
          visible={showDate}
          transparent
          onRequestClose={() => this._hideDate()}
        >
          <SafeAreaView style={STGStyles.dateModalContainer}>
            <TouchableOpacity
              style={STGStyles.dateModalOut}
              onPressOut={this._hideDate}
            >
              <TouchableWithoutFeedback>
                <>
                  <View style={STGStyles.dateModalBody}>
                    <DateTimePicker
                      value={value}
                      mode={this.props.dateMode}
                      display="spinner"
                      onChange={this._setDate}
                      minimumDate={this.props.minimumDate}
                      maximumDate={this.props.maximumDate}
                      locale="fr-FR"
                    />
                  </View>
                  <TouchableOpacity
                    style={STGStyles.dateModalCancel}
                    onPress={this._hideDate}
                  >
                    <Text style={STGStyles.dateModalCancelText}>
                      {t("common:ok")}
                    </Text>
                  </TouchableOpacity>
                </>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
}

export default STGDatePicker;
