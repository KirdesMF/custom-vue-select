import { ref } from "vue";

/**
 * use to toggle and set a boolean value
 * @param initialValue the initial value
 */
export function useToggle(initialValue: boolean) {
  const state = ref(initialValue);

  const toggle = () => {
    state.value = !state.value;
  };

  const set = (value: boolean) => {
    state.value = value;
  };

  return { state, toggle, set };
}
