import { Stack } from "#styled-system/jsx";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../../db";

export const ChipList = () => {
  const chips = useLiveQuery(db.chip.liveMany());

  if (!chips.results) return null;

  return <Stack>{/* {chips.results.map(chip => <ChipEditable chip={chip} key={chip.id} />)} */}</Stack>;
};

// const ChipEditable = ({ chip }: { chip: Chip }) => {
//   return (
//     <Flex>
//       <styled.div>{chip.label}</styled.div>
//       <styled.div fontWeight="bold">{chip.value}</styled.div>
//     </Flex>
//   );
// };
