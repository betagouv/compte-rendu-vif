import { Replicache } from "replicache";

export const rep = new Replicache({
  name: "tasks",
  licenseKey: import.meta.env.VITE_REPLICACHE_LICENCE_KEY!,
  mutators: {
    async createTask(tx, { id, text }) {
      await tx.put(`task/${id}`, { id, text });
    },
    async updateTask(tx, { id, text }) {
      await tx.put(`task/${id}`, { id, text });
    },
    async deleteTask(tx, id) {
      await tx.del(`task/${id}`);
    },
  },
});
