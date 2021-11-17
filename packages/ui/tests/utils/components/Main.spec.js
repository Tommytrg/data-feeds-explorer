import { createLocalVue, mount } from '@vue/test-utils'

import Main from '../../../components/Main.vue'

const $t = jest.fn()
const $apollo = {
  $apollo: {
    mutate: jest.fn(),
    query: jest.fn(),
  },
}
// create an extended `Vue` constructor
const localVue = createLocalVue()

test('displayed heroes correctly with query data', () => {
  const wrapper = mount(Main, { localVue, mocks: { $t, $apollo } })
  console.log('wrapper', wrapper)
  expect(wrapper.element).toMatchSnapshot()
})
