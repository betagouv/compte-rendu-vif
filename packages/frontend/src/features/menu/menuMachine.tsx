import { createActor, setup, StateValueFrom } from "xstate";

export const menuMachine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "TOGGLE" }
      | { type: "OPEN" }
      | { type: "CLOSE" }
      | { type: "GO_TO_HELP" }
      | { type: "GO_TO_CLAUSES_DEPT" }
      | { type: "GO_TO_CLAUSES_NAT" }
      | { type: "GO_TO_SHARE" }
      | { type: "GO_TO_SERVICES" }
      | { type: "BACK" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOkwBsB7WSAYgHkAFAUQDkBtABgF1FQAHargAuuSvj4gAHogCsAJgAsJeQDZZqgMyaAnLMXzZnWQBoQAT0QHNJHXZ2KA7I4CMj46tUBfL2bRY8QlIMAloAFXoAcUiAGWYuXiQQQVgRMQkkmQRVQxIADhdDTjzFYsNnM0sEI2VHe0089UVNRTzHWR8-DBwCYhIQ-FoAYRj6AGV4nkkUtPFJLK1HEhbNR3VVVx06zUq5WVkVe3l5ZzU87U6Qfx6g-vRQyPoAfQingAlmGMYE6aFROcych08hIqjaCk0Ci2nFUil2CFWNkU9i0sh0bWOLm8viu3UCfQGtEeL2eIwAggBVCZjJ4AEWYjDCPySM3+GVAWQUyjUGm0egMRlMFkQBVUtjseRKLh0nF0rUu13xwXug2Jr3JVOYNNYZKZUxZf3S8zkmhcJE4ijBjkanFcLhcQqqLmMeRIyPRYM0xUc8gcCrxvWVD2erzGbzJACVJokBIaARy5AUVC42p4dFa3PJ4Un3XZZJocsZNPIXP6AoGSNgwOR+MNRhNmbHUmzjQh5HkDtbCqosS5LXklPD9LV3bpnDklGWbn0qzXaAAhMlDADSjeScfZ0kQ7c7BTUvf7g+FbYUJEc7tc+b0+h0U6VZHI6AArjRYLSwPx0AAnYRgVBgfBhHQcg4DrcZo1+ZsjUBNsOzPPcex7Q84WPNEDiUOx5AaBx9g7O8KwoZ9X3fT8fz-ACgJA2AFyXVd9SbWZNyyHd4O7A8wSPKpVHTFRkTyYEXFNY52nw25CJfOBWHQNlgNAkZwLXVloITWDdzYpCOJQrjFE7d1ik4Qp+M0US+nE18pJkqiaJXRSN1bFiu33DSBy0xAdFWM8+LWDCNBLEzSFgbBvzAMCG3o9coPjLdVNYpy+00+FkW5d19nUa1+MUfySEC4LrLomMIsY+y4McxD4pc+F5E4EEMPRc8S2OC0OkufBKAgOBJEVQNIKKmCAFpVHhAasooahIB6lsYMUQoVHWFo2lKThikdORbTPew0WME4aiygYJuU6LzhsAcCmwoStjyeFnU4EhCj4-NFGRWR+OxLpy1uWd+H2qKsgdGxSsMFpmhOS7j0RcU7Gq0pITcUscS6sTHwkt8P2-X9-0A2T4ANSKmKsLNj24nReLqtxiwHZ6RqR8zpPSLHvrxhASqMaqTiSjQU3hBwbvPdF01hOotFveGA1uHKvzABnWz+2Kcge4HrUqpaSeBCdVAM-Q8h8HwgA */
  context: {},
  initial: "closed",
  states: {
    closed: {
      on: {
        OPEN: "main",
      },
    },
    main: {
      on: {
        TOGGLE: "closed",
        CLOSE: "closed",
        GO_TO_HELP: "help",
        GO_TO_CLAUSES_DEPT: "clausesDepartementales",
        GO_TO_CLAUSES_NAT: "clausesNationales",
        GO_TO_SHARE: "share",
        GO_TO_SERVICES: "services",
      },
    },
    help: {
      on: {
        CLOSE: "closed",
        BACK: "main",
      },
    },
    clausesDepartementales: {
      on: {
        CLOSE: "closed",
        BACK: "main",
      },
    },
    clausesNationales: {
      on: {
        CLOSE: "closed",
        BACK: "main",
      },
    },
    share: {
      on: {
        CLOSE: "closed",
        BACK: "main",
      },
    },
    services: {
      on: {
        CLOSE: "closed",
        BACK: "main",
      },
    },
  },
});

export const menuActor = createActor(menuMachine);
menuActor.start();

export type MenuStates = StateValueFrom<typeof menuMachine>;
