import { cva, cx } from "#styled-system/css";
import { type BoxProps, Flex, type FlexProps } from "#styled-system/jsx";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useState } from "react";

export const ChipGroup = ({
  options,
  isMulti,
  label,
  canBeEmpty = true,
  value,
  onChange,
  className,
  disabled,
  ...props
}: {
  options: ChipGroupOption[];
  isMulti?: boolean;
  value?: string[];
  label?: string;
  canBeEmpty?: boolean;
  disabled?: boolean;
  onChange: (values: string[]) => void;
} & Omit<FlexProps, "onChange">) => {
  const [selectedOptions, setSelectedOptions] = useState(new Set(value ?? []));

  const values = Object.values(options);

  const ChipGroupList = (
    <Flex {...props} gap="8px" mt={label ? "8px" : 0} flexWrap="wrap">
      {values.map((option) => (
        <Chip
          key={option.key}
          isChecked={selectedOptions.has(option.key)}
          onCheckChange={(isChecked) => {
            if (disabled) return;
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

  if (!label) return ChipGroupList;

  return (
    <Flex direction="column" {...props} className={cx(className, "fr-input-group")}>
      <label className="fr-label">{label}</label>
      {ChipGroupList}
    </Flex>
  );
};

export type ChipGroupOption = {
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
  return (
    <Tag
      // className={styles}
      pressed={isChecked}
      nativeButtonProps={{
        onClick: () => onCheckChange(!isChecked),
        type: "button",
      }}
    >
      {children}
    </Tag>
  );
};
