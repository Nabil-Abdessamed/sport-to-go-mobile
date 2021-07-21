import React, { useState, useEffect } from "react";
import Pdf from "react-native-pdf";
import { STGBody, STGContainer } from "stg-ui";
import { BASE_URL } from "@config";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function ContractShow() {
  const [item, setItem] = useState(null);
  const { params } = useRoute();

  useEffect(() => {
    setItem(params.contract);
    return () => setItem(null);
  }, []);

  return (
    <STGContainer>
      <STGBody>
        {item && (
          <Pdf
            style={{ flex: 1, width }}
            source={{
              uri:
                (item && item.file && `${BASE_URL}/upload/contracts/${item.file}`) ||
                "",
            }}
          />
        )}
      </STGBody>
    </STGContainer>
  );
}
