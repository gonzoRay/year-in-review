import Storyline from "@/components/Storyline.vue";
import { shallowMount } from "@vue/test-utils";

describe("Storyline.vue", () => {
  it("renders list of 2 when passed", () => {
    const events = [
      {
        title: "dummy title 1",
        comment: "dummy comment",
        datetime: "1980-06-23"
      },
      {
        title: "dummy title 2",
        comment: "dummy comment 2",
        datetime: "1986-12-03"
      }
    ];
    const wrapper = shallowMount(Storyline);

    wrapper.setData("allevents", events);

    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .findAll(".v-Storyline-item")
        .element.childNodes.length.toBe(events.length)
    );
    // expect(wrapper.contains('.v-Storyline').toBe(true));
  });
});
