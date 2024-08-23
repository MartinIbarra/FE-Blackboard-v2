import { hookstate } from "@hookstate/core";

export const globalState = hookstate({
  user: null,
});
