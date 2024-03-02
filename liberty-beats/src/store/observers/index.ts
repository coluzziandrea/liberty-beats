import { RootState, RootStore } from "..";

export function observeStore<T>(
  store: RootStore,
  selectFn: (rootState: RootState) => T,
  onChange: (newState: T, oldState: T) => void,
) {
  let currentState: T;

  const handleChange = () => {
    let newState;
    try {
      newState = selectFn(store.getState());
    } catch (e) {
      // when listeners unsubscribe, handleChange will still run one more time, which will
      // sometimes throw an error, which we can ignore
      return;
    }
    if (newState !== currentState) {
      onChange(newState, currentState);
      currentState = newState;
    }
  };

  handleChange();
  return store.subscribe(handleChange);
}
