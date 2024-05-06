import { Tabs as T } from "@ark-ui/react/tabs";
import type { ComponentProps } from "react";
import { styled } from "#styled-system/jsx";
import { createStyleContext } from "./createStyleContext";
import { tabs } from "#styled-system/recipes";

const { withProvider, withContext } = createStyleContext(tabs);

export const Root = withProvider(styled(T.Root), "root");
export const Content = withContext(styled(T.Content), "content");
export const Indicator = withContext(styled(T.Indicator), "indicator");
export const List = withContext(styled(T.List), "list");
export const Trigger = withContext(styled(T.Trigger), "trigger");

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ListProps extends ComponentProps<typeof List> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}

export const Tabs = {
  Root,
  Content,
  Indicator,
  List,
  Trigger,
};
