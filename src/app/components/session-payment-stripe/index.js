import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import stripe from "tipsi-stripe";
import { createChargeService } from "@services";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import {
  STGContainer,
  STGButton,
  STGBody,
  STGNumberPicker,
  STGScrollViewBody,
  STGScrollView,
} from "stg-ui";
import { Card } from "./dto";
import gStyles from "@components/styles";
import Validate from "./validation";
import {
  useNavigation,
  useRoute,
  StackActions,
} from "@react-navigation/native";
import _ from "lodash";

const PUBLISHABLE_KEY = "pk_test_1A0pORb9JuB1R9mmbdkUeQ4i00BQxyqIk5"; // Compte Test de Majustic (Akram Jabeur)
// const PUBLISHABLE_KEY = "pk_test_tiaoNWXJ70bqS0d2kdG3ch7E"; // Compte Test du client
// const PUBLISHABLE_KEY = "pk_live_0J6rUlNCn82BQwQyEhI3kR5b"; // Compte Live du client

stripe.setOptions({
  publishableKey: PUBLISHABLE_KEY,
});

export default function SessionPaymentStripe() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // Props from redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(new Card());
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

  const getParams = () => {
    return {
      number: card.number.replace(/\s/g, ""),
      expMonth: Number(card.expMonth),
      expYear: Number(card.expYear),
      cvc: card.cvc,
      name: user.fullname,
      currency: "eur",
      addressLine1: user.address,
      addressCity: user.city,
      addressCountry: user.country,
      addressZip: user.postalCode,
    };
  };

  const getChargeParams = (token) => {
    const s = params.session;
    const chargeDto = {
      amount: s.price * 100,
      toUser: s.userId,
      currency: "eur",
      source: token.tokenId,
      // source: "tok_visa",
      description: `Charge for ${s.partnershipName} [${s.userEmail}]`,
      sessionId: s.id,
    };
    return chargeDto;
  };

  const _firePaymentSuccess = () => {
    Alert.alert(
      t("session:payment.success"),
      t("session:payment.successMessage")
    );
    navigation.dispatch(StackActions.replace("Session", null));
  };

  const _firePaymentConflictError = () => {
    Alert.alert(t("session:payment.error"), t("session:payment.errorMessage1"));
  };

  const _firePaymentConflictError2 = () => {
    Alert.alert(t("session:payment.error"), t("session:payment.errorMessage2"));
  };

  const _firePaymentError = () => {
    Alert.alert(t("session:payment.error"), t("session:payment.errorMessage"));
  };

  const _firePaymentMessageError = (message) => {
    Alert.alert(t("session:payment.error"), message);
  };

  const isDisabled = () => {
    const cardNumberError = Validate.cardNumber(card.number);
    const cvcError = Validate.cvc(card.cvc);
    if (cardNumberError || cvcError) {
      return true;
    }
    return false;
  };

  const handlePayment = async () => {
    isDisabled();
    const params = getParams();
    setLoading(true);
    try {
      const token = await stripe.createTokenWithCard(params);
      try {
        const chargeDto = getChargeParams(token);
        const { status } = await createChargeService(chargeDto);
        if (status === 200) {
          _firePaymentSuccess();
        }
      } catch (chargeError) {
        setLoading(false);
        const { data, status } = chargeError;
        if (status === 409) {
          if (data.code === "SESSION_CONFLICT") {
            _firePaymentConflictError();
          }
          if (data.code === "NO_PLACES_AVAILABLE") {
            _firePaymentConflictError2();
          }
        } else {
          _firePaymentError();
        }
      }
    } catch (tokenError) {
      setLoading(false);
      _firePaymentMessageError(tokenError.message);
    }
  };

  useEffect(() => {
    setSession(params.session);
  }, []);

  const _handleCardNumberChange = (value) => {
    const c = _.clone(card);
    c.number = value;
    setCard(c);
  };

  const validateCardNumber = (value) => {
    const error = Validate.cardNumber(value);
    if (cardNumberError !== error) {
      setCardNumberError(error);
    }
  };

  const validateCvc = (value) => {
    const error = Validate.cvc(value);
    if (cvcError !== error) {
      setCvcError(error);
    }
  };

  const _handleCardInputChange = (key, value) => {
    const c = _.clone(card);
    c[key] = value;
    setCard(c);
  };

  const onExpMonthChange = (value) => {
    _handleCardInputChange("expMonth", value);
  };

  const onExpYearChange = (value) => {
    _handleCardInputChange("expYear", value);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading}>
        <STGScrollView>
          <STGContainer>
            <STGBody>
              <STGScrollViewBody>
                <Text style={gStyles.textInputTitle}>
                  {t("session:payment.totalToPay")}
                </Text>
                <TextInput
                  editable={false}
                  defaultValue={`${session.price} €`}
                  value={`${session.price} €`}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: "rgba(0,0,0,0.2)",
                  }}
                />
                <Text style={gStyles.textInputTitle}>
                  {t("session:payment.cardNumber")}
                </Text>
                <TextInput
                  defaultValue={card.number || ""}
                  value={card.number || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: cardNumberError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={"1234 1234 1234 1234"}
                  placeholderTextColor={"rgba(0,0,0,0.2)"}
                  onChangeText={(text) => {
                    const value = text
                      .replace(/\s?/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim();
                    _handleCardNumberChange(value);
                    validateCardNumber(value);
                  }}
                  keyboardType="numeric"
                  maxLength={19}
                  textContentType="creditCardNumber"
                />
                <Text style={gStyles.textInputTitle}>
                  {t("session:payment.cardExpDate")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <STGNumberPicker
                    from={1}
                    to={12}
                    itemText={t("common:month")}
                    onChangeValue={onExpMonthChange}
                    itemValue={card.expMonth}
                  />
                  <STGNumberPicker
                    from={20}
                    to={80}
                    itemText={t("common:year")}
                    onChangeValue={onExpYearChange}
                    itemValue={card.expYear}
                  />
                </View>
                <Text style={gStyles.textInputTitle}>{"CVC"}</Text>
                <TextInput
                  defaultValue={card.cvc || ""}
                  value={card.cvc || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: cvcError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={"•••"}
                  placeholderTextColor={"rgba(0,0,0,0.2)"}
                  onChangeText={(value) => {
                    _handleCardInputChange("cvc", value);
                    validateCvc(value);
                  }}
                  maxLength={3}
                  keyboardType={"decimal-pad"}
                  textContentType="password"
                  secureTextEntry={true}
                />
                {cvcError && <Text style={gStyles.helper}>{cvcError}</Text>}
              </STGScrollViewBody>
              <STGButton
                onPress={handlePayment}
                btnText={t("session:payment.pay")}
                disabled={isDisabled()}
              />
            </STGBody>
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
