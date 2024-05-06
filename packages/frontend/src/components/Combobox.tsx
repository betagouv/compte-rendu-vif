import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import type { ComponentProps } from "react";
import { styled } from "#styled-system/jsx";
import { combobox } from "#styled-system/recipes";
import { createStyleContext } from "./createStyleContext";

const { withProvider, withContext } = createStyleContext(combobox);

export const Root = withProvider(styled(ArkCombobox.Root), "root");
export const ClearTrigger = withContext(styled(ArkCombobox.ClearTrigger), "clearTrigger");
export const Content = withContext(styled(ArkCombobox.Content), "content");
export const Control = withContext(styled(ArkCombobox.Control), "control");
export const Input = withContext(styled(ArkCombobox.Input), "input");
export const Item = withContext(styled(ArkCombobox.Item), "item");
export const ItemGroup = withContext(styled(ArkCombobox.ItemGroup), "itemGroup");
export const ItemGroupLabel = withContext(styled(ArkCombobox.ItemGroupLabel), "itemGroupLabel");
export const ItemIndicator = withContext(styled(ArkCombobox.ItemIndicator), "itemIndicator");
export const ItemText = withContext(styled(ArkCombobox.ItemText), "itemText");
export const Label = withContext(styled(ArkCombobox.Label), "label");
export const Positioner = withContext(styled(ArkCombobox.Positioner), "positioner");
export const Trigger = withContext(styled(ArkCombobox.Trigger), "trigger");

export const Combobox = {
  Root,
  ClearTrigger,
  Content,
  Control,
  Input,
  Item,
  ItemGroup,
  ItemGroupLabel,
  ItemIndicator,
  ItemText,
  Label,
  Positioner,
  Trigger,
};

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemGroupLabelProps extends ComponentProps<typeof ItemGroupLabel> {}
export interface ItemIndicatorProps extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
