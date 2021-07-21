import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Style from "./Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/es";
import "moment/locale/it";
import "moment/locale/en-ca";
import { useTranslation } from "react-i18next";

export default function Item({ item, showContract }) {
  const { i18n } = useTranslation();

  const renderDate = (date) => {
    return moment(date)
      .locale(i18n.language)
      .format("dddd, DD MMMM YYYY");
  };

  return (
    <TouchableOpacity style={Style.itemContainer} onPress={showContract}>
      <View style={Style.itemContent}>
        <Text style={Style.title1}>{item.name}</Text>
        <Text style={Style.title2}>{renderDate(item.startedAt)}</Text>
        <Text style={Style.title2}>{renderDate(item.expiredAt)}</Text>
      </View>
      <MaterialIcons name={"navigate-next"} size={22} />
    </TouchableOpacity>
  );
}
