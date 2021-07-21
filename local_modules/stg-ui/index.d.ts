declare module "stg-ui" {
  import React, { ReactChild, ReactElement } from "react";
  import {
    ViewStyle,
    TextStyle,
    TextInputProps,
    TouchableOpacityProps,
    TextProps,
    StyleProp,
    ModalProps,
    ImageProps,
    ScrollViewProps,
    ScrollViewProps,
    ViewProps,
  } from "react-native";
  import { FastImageProperties } from "react-native-fast-image";
  import { ModalProps } from "react-native-modal";

  interface Error {
    condition: boolean;
    message: string;
  }

  interface SelectOptionData {
    label: string;
    value: string | number;
  }

  interface InputStyleProperties {
    containterStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<ViewStyle>;
    textErrorColor?: string;
    textErrorStyle?: StyleProp<ViewStyle>;
    textError?: string;
    hasError?: boolean;
    alignError?: "flex-start" | "center" | "flex-end";
    showTextErrorTimer?: number;
    errors?: Array<Error>;
  }

  type TextInputProps = TextInputPropTypes;
  export interface TextInputPropTypes
    extends TextInputProps,
      InputStyleProperties {
    onChangeText?: (text: string) => void;
    textInputProps: TextInputProps;
  }

  export interface SelectPropTypes extends ViewProps, InputStyleProperties {
    data: Array<SelectOptionData>;
    defaultText: string;
    selected: object;
    onSelect: (value: object) => void;
  }

  export interface ButtonPropTypes extends TouchableOpacityProps {
    btnText: string;
    btnTextStyle?: StyleProp<ViewStyle>;
    btnIcon?: any;
    containerStyle?: StyleProp<ViewStyle>;
    isRequesting?: boolean;
    requestingText?: string;
  }

  export interface CardPropTypes extends ViewProps {
    containerStyle?: StyleProp<ViewStyle>;
  }

  export interface ContainerPropTypes extends ViewProps {
    containerStyle?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    loadingText?: string;
  }

  export interface TextPropTypes extends TextProps {
    containerStyle?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<ViewStyle>;
    color: string;
    text: string;
    size: number;
    weight:
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
  }

  export interface InfoPropTypes extends CardPropTypes {
    text1: string;
    text2: string;
    text1Style: object;
    text2Style: object;
  }

  export interface ModalPropTypes extends ModalProps {
    title: string;
    message: string;
    close: () => void;
    type: "default" | "info" | "success" | "error" | "warning";
  }
  export interface MessageItemPropTypes extends TouchableOpacityProps {
    containerStyle: object;
    avatar: any;
    data: object;
    onSelect: () => void;
    t: () => void;
  }

  export interface ConversationItemPropTypes extends TouchableOpacityProps {
    containerStyle: object;
    data: object;
    onSelect: () => void;
  }

  export interface MessageProperties extends ImageProps {
    avatar: string;
    width: number;
    height: number;
    isLeft: boolean;
    text: string;
  }

  export interface SendMessageProperties extends ViewProps {
    textInputPlaceholder: string;
    textInputStyle: object;
    onSendClick: () => void;
    onMessageTextChange: () => {};
    defaultValue: string;
  }

  export interface MessageFlashProperties extends ViewProps {
    messages: Array;
    showMessage: boolean;
    handleShowMessage: () => void;
    avatar: string;
    duration: number;
  }

  export interface BadgeProperties extends ViewProps {
    containerStyle: object;
    backgroundColor: string;
  }

  export interface STGAvatarMessageProperties extends FastImageProperties {
    avatar: any;
    width: number;
    height: number;
  }

  export interface VideoProperties extends ViewProps {
    source: object;
    style: object;
    fullscreen: boolean;
    fullscreenShowButton: boolean;
    disableBack: boolean;
    disableFullscreen: boolean;
    onVideoBackPress: () => void;
    onVideoFullscreenEnter: () => void;
    onVideoFullscreenExit: () => void;
  }

  export interface ListUsersProperties extends ViewProps {
    data: Array;
    visible: string;
    hide: () => void;
    navigation: any;
    title?: string;
  }

  export interface NumberPickerProperties {
    itemValue: number | string;
    onChangeValue: () => void;
    from: number | string;
    to: number | string;
    itemText: string;
    containerStyles: StyleProp<ViewStyle>;
    itemContainerStyles: StyleProp<ViewStyle>;
    itemTitleStyle: StyleProp<TextStyle>;
  }

  type DateMode = "date" | "time";

  export interface DatePickerProperties extends ViewProps {
    attr: string;
    value: Date | string;
    handleChangeInput: () => void;
    t: () => void;
    dateMode?: DateMode;
    dateFormat?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    locate: string;
  }

  export interface ImageZoomProperties extends ViewProps {
    uri: string;
    withZoom: boolean;
  }

  export interface AvatarProperties extends FastImageProperties {
    uri: string;
    size?: number;
  }

  type STGMarkerProps = {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  };

  export interface PictoMapProperties extends ViewProps {
    latitude: number;
    longitude: number;
    regionLatitude?: number;
    regionLongitude?: number;
    onPressFullscreen?: () => void;
    onPressCloseButton?: () => void;
  }

  export interface FullMapProperties extends ViewProps {
    show: boolean;
    regionLatitude: number;
    regionLongitude: number;
    hideMap: () => void;
    markers?: Array<STGMarkerProps>;
    onMapPress?: () => void;
    latitude?: number;
    longitude?: number;
  }

  export interface DurationPickerProperties extends ViewProps {
    hoursValue: number | string;
    minutesValue: number | string;
    onHoursChangeValue: () => void;
    onMinutesChangeValue: () => void;
    hoursFrom?: number;
    hoursTo?: number;
    minutesFrom?: number;
    minutesTo?: number;
    hoursText?: string;
    minutesText?: string;
    containerStyles?: object;
    hoursContainer?: object;
    minutesContainer?: object;
  }

  export interface BodyProperties extends ViewProps {
    loading?: boolean;
    loadingText?: string;
  }

  type ModalActionsType = {
    title: string;
    onPress: () => void;
    icon?: any;
    actionsTitle?: string;
    cancelButtonText?: string;
  };

  export interface RNCModalProps extends ModalProps {
    items: Array<ModalActionsType>;
  }

  export interface CommentEditProperties extends ModalProps {
    comment: string;
    onChangeText: () => void;
    onPressSaveButton: () => void;
    title?: string;
    saveButtonTitle?: string;
    placeholder?: string;
  }

  export interface HeaderBackProperties extends ViewProps {
    onPressShowOptions: () => void;
    hasOptions: boolean;
    action: () => void;
  }

  export interface STGScrollViewProps extends ScrollViewProps {}
  export interface STGScrollViewBodyProperties extends ViewProps {
    style?: object;
  }

  export interface STGImageProps {
    data?: object | null;
    zoom?: boolean;
  }

  export class STGTextInput extends React.Component<TextInputPropTypes> {}
  export class STGSelect extends React.Component<SelectPropTypes> {}
  export class STGButton extends React.Component<ButtonPropTypes> {}
  export class STGContainer extends React.Component<ContainerPropTypes> {}
  export class STGCard extends React.Component<CardPropTypes> {}
  export class STGText extends React.Component<TextPropTypes> {}
  export class STGBadge extends React.Component<BadgeProperties> {}
  export class STGInfo extends React.Component<InfoPropTypes> {}
  export class STGModalInfo extends React.Component<ModalPropTypes> {}
  export class STGMessageItem extends React.Component<MessageItemPropTypes> {}
  export class STGConversationItem extends React.Component<
    ConversationItemPropTypes
  > {}
  export class STGChatMessage extends React.Component<MessageProperties> {}
  export class STGSendMessage extends React.Component<SendMessageProperties> {}
  export class STGMessageFlash extends React.Component<
    MessageFlashProperties
  > {}
  export class STGAvatarMessage extends React.Component<
    STGAvatarMessageProperties
  > {}
  export class STGHeaderBack extends React.Component<HeaderBackProperties> {}
  export class STGHeaderSearch extends React.Component<ViewProps> {}
  export class STGVideo extends React.Component<VideoProperties> {}
  export { default as STGStyles } from "./STGStyles";
  export { default as STGColors } from "./STGColors";
  export { default as STGFonts } from "./STGFonts";
  export class STGListUsers extends React.Component<ListUsersProperties> {}
  export class STGNumberPicker extends React.Component<
    NumberPickerProperties
  > {}
  export class STGDatePicker extends React.Component<DatePickerProperties> {}
  export class STGImage extends React.Component<STGImageProps> {}
  export class STGImageZoom extends React.Component<ImageZoomProperties> {}
  export class STGAvatar extends React.Component<AvatarProperties> {}
  export class STGPictoMap extends React.Component<PictoMapProperties> {}
  export class STGFullMap extends React.Component<FullMapProperties> {}
  export class STGDurationPicker extends React.Component<
    DurationPickerProperties
  > {}
  export class STGBody extends React.Component<BodyProperties> {}
  export class STGActionSheet extends React.Component<RNCModalProps> {}
  export class STGCommentEdit extends React.Component<CommentEditProperties> {}
  export class STGScrollView extends React.Component<STGScrollViewProps> {}
  export class STGScrollViewBody extends React.Component<
    STGScrollViewBodyProperties
  > {}
}
