import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const initialProps = {
  user: null,
};

export default function SessionRandom(props = initialProps) {
  const { user } = props;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [sessions, setSessions] = useState([]);

  useFocusEffect(useCallback(() => {}, []));

  return (
    <View>
      <Text>I'm a Session Random</Text>
    </View>
  );
}
