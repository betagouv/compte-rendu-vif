import type { Assign, HTMLArkProps } from "@ark-ui/react";
import { Dialog as ArkDrawer } from "@ark-ui/react/dialog";
import { ark } from "@ark-ui/react/factory";
import { type DrawerVariantProps, drawer } from "#styled-system/recipes";
import type { JsxStyleProps } from "#styled-system/types";
import { createStyleContext } from "./createStyleContext";

const { withRootProvider, withContext } = createStyleContext(drawer);

export interface RootProps extends ArkDrawer.RootProps, DrawerVariantProps {}
export const Root = withRootProvider<RootProps>(ArkDrawer.Root);

export const Backdrop = withContext<HTMLDivElement, Assign<JsxStyleProps, ArkDrawer.BackdropProps>>(
  ArkDrawer.Backdrop,
  "backdrop",
);

export const Body = withContext<HTMLDivElement, Assign<JsxStyleProps, HTMLArkProps<"div">>>(ark.div, "body");

export const CloseTrigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, ArkDrawer.CloseTriggerProps>>(
  ArkDrawer.CloseTrigger,
  "closeTrigger",
);

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, ArkDrawer.ContentProps>>(
  ArkDrawer.Content,
  "content",
);

export const Description = withContext<HTMLParagraphElement, Assign<JsxStyleProps, ArkDrawer.DescriptionProps>>(
  ArkDrawer.Description,
  "description",
);

export const Footer = withContext<HTMLDivElement, Assign<JsxStyleProps, HTMLArkProps<"div">>>(ark.div, "footer");

export const Header = withContext<HTMLDivElement, Assign<JsxStyleProps, HTMLArkProps<"div">>>(ark.div, "header");

export const Positioner = withContext<HTMLDivElement, Assign<JsxStyleProps, ArkDrawer.PositionerProps>>(
  ArkDrawer.Positioner,
  "positioner",
);

export const Title = withContext<HTMLHeadingElement, Assign<JsxStyleProps, ArkDrawer.TitleProps>>(
  ArkDrawer.Title,
  "title",
);

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, ArkDrawer.TriggerProps>>(
  ArkDrawer.Trigger,
  "trigger",
);

export { DialogContext as Context, type DialogContextProps as ContextProps } from "@ark-ui/react/dialog";
