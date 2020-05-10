import * as React from "react";
import PropTypes, { InferProps } from "prop-types";
import {
    StyleProp,
    ViewStyle,
    TextStyle,
    Text,
    ViewPropTypes,
    ColorPropType,
    KeyboardType,
} from "react-native";

export interface InputProps {
    placeholder: string;
    label: string;
    onChangeText: (text: string) => {};
    onFocus: Function;
    onBlur: Function;
    style: StyleProp<ViewStyle>;
    fieldStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    secureTextEntry: boolean;
    keyboardType: KeyboardType;
    defaultValue: string;
    status: "normal" | "warning" | "error";
    editable: boolean;
    value: string;
    warning: string;
    IconLeft: string;
    IconLeftStyle: StyleProp<ViewStyle>;
    IconLeftColor: string;
    IconLeftClickable: boolean;
    IconLeftOnclick: Function;
    stylePreset: "normal" | "boxed";
    pointerEvents: string;
    onTouchStart: Function;
}

declare const Input: React.FC<InputProps>;

export default Input;
