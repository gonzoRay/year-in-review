import Timeline from '@/components/Timeline.vue';
import { shallowMount } from '@vue/test-utils';

describe('Timeline.vue', () => {
  it('renders list of 2 when passed', () => {
    const entries = [
      {
        title: 'dummy title 1',
        comment: 'dummy comment',
        datetime: '1980-06-23'
      },
      {
        title: 'dummy title 2',
        comment: 'dummy comment 2',
        datetime: '1986-12-03'
      }
    ];
    const wrapper = shallowMount(Timeline);

    wrapper.setData('allEntries', entries);

    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .findAll('.v-timeline-item')
        .element.childNodes.length.toBe(entries.length)
    );
    // expect(wrapper.contains('.v-timeline').toBe(true));
  });
});
