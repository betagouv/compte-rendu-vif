import { ColorPicker as ArkColorPicker } from "@ark-ui/react/color-picker";
import type { ComponentProps } from "react";
import { styled } from "#styled-system/jsx";
import { colorPicker } from "#styled-system/recipes";
import { createStyleContext } from "./createStyleContext";

const { withProvider, withContext } = createStyleContext(colorPicker);

const Root = withProvider(styled(ArkColorPicker.Root), "root");
const Area = withContext(styled(ArkColorPicker.Area), "area");
const AreaBackground = withContext(styled(ArkColorPicker.AreaBackground), "areaBackground");
const AreaThumb = withContext(styled(ArkColorPicker.AreaThumb), "areaThumb");
const ChannelInput = withContext(styled(ArkColorPicker.ChannelInput), "channelInput");
const ChannelSlider = withContext(styled(ArkColorPicker.ChannelSlider), "channelSlider");
const ChannelSliderThumb = withContext(styled(ArkColorPicker.ChannelSliderThumb), "channelSliderThumb");
const ChannelSliderTrack = withContext(styled(ArkColorPicker.ChannelSliderTrack), "channelSliderTrack");
const Content = withContext(styled(ArkColorPicker.Content), "content");
const Control = withContext(styled(ArkColorPicker.Control), "control");
const EyeDropperTrigger = withContext(styled(ArkColorPicker.EyeDropperTrigger), "eyeDropperTrigger");
const FormatSelect = withContext(styled(ArkColorPicker.FormatSelect), "formatSelect");
const FormatTrigger = withContext(styled(ArkColorPicker.FormatTrigger), "formatTrigger");
const Label = withContext(styled(ArkColorPicker.Label), "label");
const Positioner = withContext(styled(ArkColorPicker.Positioner), "positioner");
const Swatch = withContext(styled(ArkColorPicker.Swatch), "swatch");
const SwatchGroup = withContext(styled(ArkColorPicker.SwatchGroup), "swatchGroup");
const SwatchIndicator = withContext(styled(ArkColorPicker.SwatchIndicator), "swatchIndicator");
const SwatchTrigger = withContext(styled(ArkColorPicker.SwatchTrigger), "swatchTrigger");
const TransparencyGrid = withContext(styled(ArkColorPicker.TransparencyGrid), "transparencyGrid");
const Trigger = withContext(styled(ArkColorPicker.Trigger), "trigger");
const ValueText = withContext(styled(ArkColorPicker.ValueText), "valueText");
const View = withContext(styled(ArkColorPicker.View), "view");

export const ColorPicker = {
  Root,
  Area,
  AreaBackground,
  AreaThumb,
  ChannelInput,
  ChannelSlider,
  ChannelSliderThumb,
  ChannelSliderTrack,
  Content,
  Control,
  EyeDropperTrigger,
  FormatSelect,
  FormatTrigger,
  Label,
  Positioner,
  Swatch,
  SwatchGroup,
  SwatchIndicator,
  SwatchTrigger,
  TransparencyGrid,
  Trigger,
  ValueText,
  View,
};

export interface RootProps extends ComponentProps<typeof Root> {}
export interface AreaProps extends ComponentProps<typeof Area> {}
export interface AreaBackgroundProps extends ComponentProps<typeof AreaBackground> {}
export interface AreaThumbProps extends ComponentProps<typeof AreaThumb> {}
export interface ChannelInputProps extends ComponentProps<typeof ChannelInput> {}
export interface ChannelSliderProps extends ComponentProps<typeof ChannelSlider> {}
export interface ChannelSliderThumbProps extends ComponentProps<typeof ChannelSliderThumb> {}
export interface ChannelSliderTrackProps extends ComponentProps<typeof ChannelSliderTrack> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface EyeDropperTriggerProps extends ComponentProps<typeof EyeDropperTrigger> {}
export interface FormatSelectProps extends ComponentProps<typeof FormatSelect> {}
export interface FormatTriggerProps extends ComponentProps<typeof FormatTrigger> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface SwatchProps extends ComponentProps<typeof Swatch> {}
export interface SwatchGroupProps extends ComponentProps<typeof SwatchGroup> {}
export interface SwatchIndicatorProps extends ComponentProps<typeof SwatchIndicator> {}
export interface SwatchTriggerProps extends ComponentProps<typeof SwatchTrigger> {}
export interface TransparencyGridProps extends ComponentProps<typeof TransparencyGrid> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ValueTextProps extends ComponentProps<typeof ValueText> {}
export interface ViewProps extends ComponentProps<typeof View> {}
