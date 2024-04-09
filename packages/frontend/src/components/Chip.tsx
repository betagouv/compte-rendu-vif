import { cva } from "#styled-system/css";
import { type BoxProps, Flex, type FlexProps } from "#styled-system/jsx";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useState } from "react";

export const ChipGroup = ({
  options,
  isMulti,
  label,
  canBeEmpty,
  onChange,
  ...props
}: {
  options: ChipGroupOption[];
  isMulti?: boolean;
  label?: string;
  canBeEmpty?: boolean;
  onChange: (values: string[]) => void;
} & Omit<FlexProps, "onChange">) => {
  const [selectedOptions, setSelectedOptions] = useState(
    new Set(options.filter((o) => o.initialIsChecked).map((o) => o.key)),
  );

  const values = Object.values(options);

  return (
    <Flex {...props} gap="8px" flexWrap="wrap">
      {values.map((option) => (
        <Chip
          key={option.key}
          isChecked={selectedOptions.has(option.key)}
          onCheckChange={(isChecked) => {
            const newSelectedOptions = new Set(selectedOptions);
            if (isChecked) {
              if (!isMulti) {
                newSelectedOptions.clear();
              }
              newSelectedOptions.add(option.key);
            } else if (selectedOptions.size > 1 || canBeEmpty) {
              newSelectedOptions.delete(option.key);
            }
            setSelectedOptions(newSelectedOptions);
            onChange?.(Array.from(newSelectedOptions));
          }}
        >
          {option.label}
        </Chip>
      ))}
    </Flex>
  );
};

type ChipGroupOption = {
  initialIsChecked?: boolean;
  label: string;
  key: string;
};

export const Chip = ({
  children,
  onCheckChange,
  isChecked,
}: BoxProps & {
  isChecked?: boolean;
  onCheckChange: (value: boolean) => void;
}) => {
  const styles = chip({ isChecked });

  return (
    <Tag
      className={styles}
      nativeButtonProps={{
        onClick: () => onCheckChange(!isChecked),
        type: "button",
      }}
    >
      {children}
    </Tag>
  );
};

const chip = cva({
  base: {
    color: "background-action-high-blue-france",
    bgColor: "background-action-low-blue-france",
  },
  variants: {
    isChecked: {
      true: {
        color: "background-action-low-blue-france",
        bgColor: "background-action-high-blue-france",
      },
    },
  },
});
