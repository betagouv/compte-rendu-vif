import { Popover as ArkPopover } from "@ark-ui/react/popover";
import type { ComponentProps } from "react";
import { styled } from "#styled-system/jsx";
import { popover } from "#styled-system/recipes";
import { createStyleContext } from "./createStyleContext";

const { withProvider, withContext } = createStyleContext(popover);

const Root = withProvider(ArkPopover.Root);
const Anchor = withContext(styled(ArkPopover.Anchor), "anchor");
const Arrow = withContext(styled(ArkPopover.Arrow), "arrow");
const ArrowTip = withContext(styled(ArkPopover.ArrowTip), "arrowTip");
const CloseTrigger = withContext(styled(ArkPopover.CloseTrigger), "closeTrigger");
const Content = withContext(styled(ArkPopover.Content), "content");
const Description = withContext(styled(ArkPopover.Description), "description");
const Indicator = withContext(styled(ArkPopover.Indicator), "indicator");
const Positioner = withContext(styled(ArkPopover.Positioner), "positioner");
const Title = withContext(styled(ArkPopover.Title), "title");
const Trigger = withContext(styled(ArkPopover.Trigger), "trigger");

export const Popover = {
  Root,
  Anchor,
  Arrow,
  ArrowTip,
  CloseTrigger,
  Content,
  Description,
  Indicator,
  Positioner,
  Title,
  Trigger,
};

export interface RootProps extends ComponentProps<typeof Root> {}
export interface AnchorProps extends ComponentProps<typeof Anchor> {}
export interface ArrowProps extends ComponentProps<typeof Arrow> {}
export interface ArrowTipProps extends ComponentProps<typeof ArrowTip> {}
export interface CloseTriggerProps extends ComponentProps<typeof CloseTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
