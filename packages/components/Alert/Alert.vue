<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AlertProps, AlertEmits, AlertInstance } from './types'
import { typeIconMap } from '@crizz-ui/utils'
import CrIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'CrAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true
})
const emits = defineEmits<AlertEmits>()
const slots = defineSlots()

const visible = ref(true)

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const withDescription = computed(() => props.description || slots.default)

const close = () => {
  visible.value = false
  emits('close')
}
const open = () => {
  visible.value = true
}

defineExpose<AlertInstance>({
  close,
  open
})
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="cr-alert"
      role="alert"
      :class="{
        [`cr-alert__${type}`]: type,
        [`cr-alert__${effect}`]: effect,
        'text-center': center
      }"
    >
      <cr-icon
        v-if="showIcon"
        class="cr-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="cr-alert__content">
        <span class="cr-alert__title" :class="{ 'with-desc': withDescription }">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="cr-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="cr-alert__close" v-if="closable">
          <cr-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
</style>
