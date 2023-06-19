<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useId } from "../composables/use-id";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import { useToggle } from "../composables/use-toggle";

type Option = {
  label: string;
  value: string;
} & Record<string, unknown>;

type Props = {
  options: (Option | string)[];
};

const props = defineProps<Props>();

const value = ref<string | Option | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const { id: listBoxId } = useId();
const { id: optionId } = useId();

const {
  state: isExpanded,
  set: setIsExpanded,
  toggle: toggleIsExpanded,
} = useToggle(false);

const options = computed(() => {
  return props.options.map((option) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }

    return option;
  });
});
</script>

<template>
  <div class="relative">
    <span v-if="value">{{ value }}</span>
    <input
      ref="inputRef"
      type="text"
      role="combobox"
      class="border-0"
      :aria-controls="listBoxId"
      :aria-expanded="isExpanded"
      :aria-activedescendant="`${optionId}-${value}`"
      @focus="setIsExpanded(true)"
      @blur="setIsExpanded(false)"
    />
    <button
      type="button"
      tabindex="-1"
      :aria-controls="listBoxId"
      :aria-expanded="isExpanded"
      @mousedown="toggleIsExpanded"
    >
      <ChevronDownIcon aria-hidden="true" />
    </button>
  </div>

  <ul v-show="isExpanded" role="listbox" :id="listBoxId" class="absolute">
    <li
      v-for="option in options"
      role="option"
      :id="`${optionId}-${option.value}`"
      :key="option.value"
      @mousedown="value = option.value"
    >
      {{ option.label }}
    </li>
  </ul>
</template>
