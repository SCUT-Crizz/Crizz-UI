<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import type { ButtonEmits, ButtonInstance, ButtonProps } from './types'
import { throttle } from 'lodash-es'
import CrIcon from '../Icon/Icon.vue'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({
  name: 'CrButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})
const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const _ref = ref<HTMLButtonElement>()

const size = computed(() => ctx?.size ?? props.size ?? '')
const type = computed(() => ctx?.type ?? props.type ?? '')
const disabled = computed(() => ctx?.disabled || props.disabled || false)
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px'
}))

const handleClick = (e: MouseEvent) => emits('click', e)

const handleClickThrottle = throttle(handleClick, props.throttleDuration, {
  trailing: false
})

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type
})
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    class="cr-button"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`cr-button--${type}`]: type,
      [`cr-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    @click="useThrottle ? handleClickThrottle($event) : handleClick($event)"
  >
    <template v-if="loading">
      <slot name="loading">
        <cr-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        ></cr-icon>
      </slot>
    </template>
    <cr-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    ></cr-icon>
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
