import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { STGContainer, STGBody } from "stg-ui";
import Item from "./Item";
import ContractService from "@services/ContractService";
import { useNavigation } from "@react-navigation/native";

export default function Contracts() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getContracts = async () => {
    setLoading(true);
    const { data, status } = await ContractService.getContracts();
    setLoading(false);
    if (status === 200) {
      setData(data);
    } else {
      setData([]);
    }
  };

  const showContract = (item) => {
    navigation.navigate("ContractShow", { contract: item });
  };

  useEffect(() => {
    getContracts();
  }, []);

  return (
    <STGContainer>
      <STGBody loading={loading}>
        <FlatList
          data={data}
          keyExtractor={(_, key) => `contract-item-${key}`}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              name={`Contract-${index + 1}`}
              showContract={() => showContract(item)}
            />
          )}
        />
      </STGBody>
    </STGContainer>
  );
}
