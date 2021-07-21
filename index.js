/**
 * @format
 */

import { AppRegistry } from "react-native";
import i18n from "./src/app/i18next";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
