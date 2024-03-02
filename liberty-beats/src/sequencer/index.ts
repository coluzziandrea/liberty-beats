import { RootStore } from "../store";
import { observeStore } from "../store/observers";
import { selectCounter } from "../store/selectors";

export default class Sequencer {
  store: RootStore;

  constructor(store: RootStore) {
    this.store = store;

    observeStore(store, selectCounter, (newState, oldState) => {
      console.log("Counter changed from", oldState, "to", newState);
    });
  }
}
