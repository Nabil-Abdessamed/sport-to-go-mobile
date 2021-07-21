import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import gStyles from "@components/styles";
import {
  STGContainer,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { StructureDto } from "@components/structure/structure.dto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";
import { payRegisterProService } from "@services";
import stripe from "tipsi-stripe";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";

// const PUBLISHABLE_KEY = "pk_test_1A0pORb9JuB1R9mmbdkUeQ4i00BQxyqIk5"; // Compte Test de Majustic (Akram Jabeur)
// const PUBLISHABLE_KEY = "pk_test_tiaoNWXJ70bqS0d2kdG3ch7E"; // Compte Test du client
const PUBLISHABLE_KEY = "pk_live_0J6rUlNCn82BQwQyEhI3kR5b"; // Compte Live du client

stripe.setOptions({
  publishableKey: PUBLISHABLE_KEY,
});

export default function RegisterThree() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [structure, setStructure] = useState({});
  const [loading, setLoading] = useState(false);

  const setContractName = (type) => {
    switch (type) {
      case "partnership1":
        return `Local ${Math.abs(540 * 1.2)} € HT par an`;
      case "partnership2":
        return `Régional (à partir de 3 structures) -5 % ${Math.abs(
          510 * 1.2
        )} € HT club par an`;
      case "partnership3":
        return `National (à partir de 10 clubs) -10 % ${Math.abs(
          485 * 1.2
        )} € HT club par an`;
      case "partnership4":
        return `Association (${Math.abs(60 * 1.2)} € HT) par an`;
      default:
        return "";
    }
  };

  const _handleTextInputChange = (property, value) => {
    const s = { ...structure };
    s[property] = value;
    if (property === "partnership") {
      s["contractName"] = setContractName(value);
    }
    setStructure(s);
  };

  const pay = async () => {
    try {
      setLoading(true);
      const cardResponse = await stripe.paymentRequestWithCardForm();
      if (cardResponse && cardResponse.card) {
        const data = {
          amount: preparePaymentPriceData() * 100,
          currency: "eur",
          source: cardResponse.tokenId,
          // source: "tok_visa",
          description: `Charge for ${structure.email}`,
          email: structure.email,
          fullname: structure.fullname,
        };
        const payRegisterProResponse = await payRegisterProService(data);
        setLoading(false);
        if (payRegisterProResponse.status === 200) {
          _handleTextInputChange("chargeId", data.chargeId);
          navigation.navigate("RegisterFour", {
            data: structure,
          });
        } else {
          throw `Une erreur s'est produite lors de paiement.`;
        }
      } else {
        throw `Une erreur s'est produite lors de paiement.`;
      }
    } catch (e) {
      setLoading(false);
      Alert.alert(
        "Paiement échoué",
        `Une erreur s'est produite lors de paiement.`
      );
    }
  };

  const preparePaymentPriceData = () => {
    let price = 0;
    switch (structure.partnership) {
      case "partnership1":
        price = Math.abs(540 * 1.2);
        break;
      case "partnership2":
        price = Math.abs(510 * 1.2);
        break;
      case "partnership3":
        price += Math.abs(485 * 1.2);
        break;
      case "partnership4":
        price = Math.abs(60 * 1.2);
        break;
      default:
        price = 0;
    }
    if (structure.partnership5) {
      price += 20;
    }
    if (structure.partnership6) {
    }
    return Math.floor(price);
  };

  useEffect(() => {
    const s = new StructureDto({ ...params.data });
    s.partnership = "partnership1";
    s.contractName = setContractName("partnership1");
    setStructure(s);
  }, []);

  return (
    <STGContainer loading={loading}>
      <STGScrollView>
        <STGContainer>
          <STGScrollViewBody>
            <Text style={gStyles.textInputTitle}>
              {t("register:partnership")}
            </Text>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership", "partnership1")
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership === "partnership1"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership1"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  Local
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership1"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {Math.abs(540 * 1.2)} € HT par an
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership", "partnership2")
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership === "partnership2"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership2"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  Régional (à partir de 3 structures) -5 %
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership2"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {Math.abs(510 * 1.2)} € HT club par an
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership", "partnership3")
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership === "partnership3"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership3"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  National (à partir de 10 clubs) -10 %
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership3"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {Math.abs(485 * 1.2)} € HT club par an
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership", "partnership4")
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership === "partnership4"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership4"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  Association
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership === "partnership4"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {Math.abs(60 * 1.2)} € HT par an
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership5", !structure.partnership5)
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership5
                    ? "checkbox-marked"
                    : "checkbox-blank-outline"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership5
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  Option community management
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership5
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  20 € HT par mois
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() =>
                _handleTextInputChange("partnership6", !structure.partnership6)
              }
            >
              <MaterialCommunityIcons
                name={
                  structure.partnership6
                    ? "checkbox-marked"
                    : "checkbox-blank-outline"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership6
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  Option crédit pub
                </Text>
                <Text
                  style={[
                    styles.partnershipText,
                    structure.partnership6
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  sur devis
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={gStyles.textInputTitle}>
              {t("register:totalToPay")}
            </Text>
            <Text style={styles.totalToPay}>
              {`${preparePaymentPriceData()} €`}
            </Text>
          </STGScrollViewBody>
        </STGContainer>
      </STGScrollView>
      <STGButton btnText={t("register:pay")} onPress={pay} />
      <Text style={styles.or}>{`- ${t("common:or")} -`}</Text>
      <STGButton
        btnText={t("register:freeRegistrationCodeTitle")}
        onPress={() => {
          navigation.navigate("RegisterSeven", {
            structure,
          });
        }}
      />
    </STGContainer>
  );
}
