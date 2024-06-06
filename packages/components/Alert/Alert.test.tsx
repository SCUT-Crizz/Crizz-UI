import { describe, it, expect, vi } from 'vitest'
import type { AlertType } from './types'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'
import Icon from '../Icon/Icon.vue'

describe('Alert.vue', () => {
  const title = 'Test Alert' as const
  const desc = 'This is a test description' as const
  it('should render alert with default props', () => {
    const wrapper = mount(Alert, {
      props: {
        title
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['CrIcon']
      }
    })

    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(desc)

    // close icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('xmark')

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ))

    expect(wrapper2.text()).toContain(title)
    expect(wrapper2.text()).toContain(desc)
  })

  it.each([
    ['info', 'circle-info'],
    ['success', 'check-circle'],
    ['warning', 'circle-exclamation'],
    ['danger', 'circle-xmark'],
    ['error', 'circle-xmark'],
    ['non-compliance', 'circle-info'] // 不符合type定义的
  ])('should have the correct icon when props type is %s', (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        type: type as AlertType,
        closable: false,
        showIcon: true
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['CrIcon']
      }
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe(iconName)
  })

  it('should emit close event when close icon is clicked', () => {
    const onClose = vi.fn()

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['CrIcon']
      }
    })

    wrapper.findComponent(Icon).trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should allow custom content via slot', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test title'
      },
      slots: {
        title,
        default: desc
      }
    })

    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(desc)
    expect(wrapper.text()).not.toContain('test title')
  })

  it('should support centering text', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true
      }
    })

    const rootNode = wrapper.find('.cr-alert')
    expect(rootNode.classes()).toContain('text-center')
  })

  it('should not render close icon when closable is false', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false
      },
      slots: {
        default: desc
      },
      global: {
        stubs: ['CrIcon']
      }
    })

    expect(wrapper.findComponent(Icon).exists()).toBeFalsy()
  })

  it('should toggle visibility when open or close is called', async () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false
      }
    })

    await wrapper.vm.close()
    expect(wrapper.find('.cr-alert').attributes().style).toBe('display: none;')
    await wrapper.vm.open()
    expect(wrapper.find('.cr-alert').attributes().style).toBe('')
  })
})
