import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BasicControl from '../BasicControl.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(BasicControl, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
