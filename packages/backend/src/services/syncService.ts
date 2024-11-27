import { Static, Type } from "@sinclair/typebox";

export class SyncService {
  async applyCrudBatch({ crudBatch }: Static<typeof applyCrudBatchTSchema>) {
    for (const operation of crudBatch) {
      console.log(operation);

      if (operation.op === "DELETE") {
      }
    }
  }
}

const StringEnum = <T extends string[]>(values: [...T]) =>
  Type.Unsafe<T[number]>({
    type: "string",
    enum: values,
  });

export const crudBatchTSchema = Type.Object({
  id: Type.String(),
  clientId: Type.Number(),
  table: Type.String(),
  transactionId: Type.Number(),
  op: Type.String(),
  // op: StringEnum(["PUT", "PATCH", "DELETE"]),
  opData: Type.Optional(Type.Object({})),
});

export const applyCrudBatchTSchema = Type.Object({
  crudBatch: Type.Array(crudBatchTSchema),
});
/* 
clientId: number;
    /**
     * ID of the changed row.
     
    id: string;
    /**
     * Type of change.
    
    op: UpdateType;
    /**
     * Data associated with the change.
     
    opData?: Record<string, any>;
    /**
     * Table that contained the change.
   
    table: string;
    /**
     * Auto-incrementing transaction id. This is the same for all operations within the same transaction.
   
    transactionId?: number;
*/
