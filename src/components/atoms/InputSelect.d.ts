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

export interface InputSelectProps {
    style: StyleProp<ViewStyle>;
    label: string;
    placeholder: string;
    options: Array<{
        label: string;
        value: string;
    }>;
    onSelect: (val: any) => {};
    iconName: string;
    iconStyle: StyleProp<ViewStyle>;
    iconColor: string;
    value: string;
}

declare const InputSelect: React.FC<InputSelectProps>;

export default InputSelect;
