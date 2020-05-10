import * as React from "react";
import PropTypes, { InferProps } from "prop-types";
import {
    StyleProp,
    ViewStyle,
    TextStyle,
    Text,
    ViewPropTypes,
    ColorPropType,
} from "react-native";

export interface ButtonProps {
    accentColor: string;
    baseColor: string;
    onPress: Function;
    shape: "normal" | "circle";
    size: "small" | "normal" | "large";
    state: "default" | "disabled" | "loading";
    style: StyleProp<ViewStyle>;
    text: string;
    textAlign: "left" | "right" | "center";
    textStyle: StyleProp<TextStyle>;
    type: "primary" | "secondary" | "nude";
    iconPosition: "left" | "right" | "center";
    iconStyle: StyleProp<ViewStyle>;
    iconName: string;
    IconSVG: React.ElementType;
    Tag: React.ElementType;
    customProps: object;
}

declare const Button: React.FC<ButtonProps>;

export default Button;
