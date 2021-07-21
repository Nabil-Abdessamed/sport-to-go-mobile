import React from "react";
import { STGContainer } from "stg-ui";
import { BASE_URL } from "@config";
import Pdf from "react-native-pdf";

export default function Cgu() {
  return (
    <STGContainer>
      <Pdf
        style={{ flex: 1 }}
        source={{
          uri: `${BASE_URL}/cgucgv/cgu.pdf`,
        }}
      />
    </STGContainer>
  );
}
