import { describe, it, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Icon from '../Icon/Icon.vue'
import type { ButtonSize, ButtonType } from './types'

describe('Button.vue', () => {
  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any }
      })
      expect(wrapper.classes()).toContain(`cr-button--${type}`)
    })
  })

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any }
      })
      expect(wrapper.classes()).toContain(`cr-button--${size}`)
    })
  })

  // Props: plain, round, circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading']
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ['CrIcon']
        }
      })
      expect(wrapper.classes()).toContain(className)
    }
  )

  // Props: nativeType
  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })

  // Test the click event with and without throttle
  it.each([
    ['useThrottle', true],
    ['useThrottle', false]
  ])('emit click event %s', async (_, useThrottle) => {
    const clickSpy = vi.fn()
    const wrapper = mount(() => (
      <Button
        onClick={clickSpy}
        {...{
          useThrottle,
          throttleDuration: 400
        }}
      />
    ))

    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(clickSpy).toHaveBeenCalledTimes(useThrottle ? 1 : 3)
  })

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  // Events: click
  it('should emits a click event when the button is clicked', async () => {
    const wrapper = mount(Button, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  // Props: loading
  it('should display loading icon and not emit click event when button is loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      global: {
        stubs: ['CrIcon']
      }
    })
    const iconElement = wrapper.findComponent(Icon)

    expect(wrapper.find('.loading-icon').exists()).toBe(true)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeUndefined()
  })

  test('loading button', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading buttton'
      },
      global: {
        stubs: ['CrIcon']
      }
    })

    // class
    expect(wrapper.classes()).toContain('is-loading')

    // attr
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // event
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

    // icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
  })

  test('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'search'
      },
      slots: {
        default: 'icon button'
      },
      global: {
        stubs: ['CrIcon']
      }
    })
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('search')
  })
})

describe('ButtonGroup.vue', () => {
  test('basic button group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    expect(wrapper.classes()).toContain('cr-button-group')
  })

  test('button group size', () => {
    const sizes: ButtonSize[] = ['large', 'default', 'small']
    sizes.forEach((size: ButtonSize) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size}>
          <Button>butotn 1</Button>
          <Button>butotn 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`cr-button--${size}`)
    })
  })

  test('button group type', () => {
    const types: ButtonType[] = [
      'primary',
      'success',
      'warning',
      'danger',
      'info'
    ]
    types.forEach((type: ButtonType) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`cr-button--${type}`)
    })
  })

  test('button group disabled', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain('is-disabled')
  })
})
