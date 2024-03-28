import { PropsWithChildren, useEffect, useState } from "react";
import { Electric } from "./generated/client";
import { initElectric } from "./db";
import { makeElectricContext } from "electric-sql/react";

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>();

export const ElectricWrapper = ({ children }: PropsWithChildren) => {
  const [electric, setElectric] = useState<Electric>();

  useEffect(() => {
    const init = async () => {
      const electric = await initElectric();

      setElectric(electric);
    };

    init();
  }, []);

  if (electric === undefined) {
    return null;
  }

  return <ElectricProvider db={electric}>{children}</ElectricProvider>;
};
