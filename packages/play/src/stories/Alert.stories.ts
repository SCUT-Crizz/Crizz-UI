import type { StoryObj, Meta, ArgTypes } from '@storybook/vue3'
import { ref, watch } from 'vue'
import { fn } from '@storybook/test'
import { CrAlert, type AlertInstance } from 'crizz-ui'
import 'crizz-ui/dist/theme/Alert.css'

type Story = StoryObj<typeof CrAlert> & { argTypes?: ArgTypes }

const meta: Meta<typeof CrAlert> = {
  title: 'Example/Alert',
  component: CrAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger']
    },
    effect: {
      control: 'select',
      options: ['light', 'dark']
    },
    center: {
      control: 'boolean'
    }
  },
  args: {
    onClose: fn()
  }
}

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: '标题',
    description: '这是一段描述',
    type: 'success',
    effect: 'light',
    closable: true,
    showIcon: true,
    visible: true
  },
  render: (args) => ({
    components: { CrAlert },
    setup() {
      const alertRef = ref<AlertInstance>()
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open()
          } else {
            alertRef.value?.close()
          }
        }
      )
      return { args, alertRef }
    },
    template: `
     <cr-alert ref="alertRef" v-bind="args"></cr-alert>
    `
  })
}

export default meta
