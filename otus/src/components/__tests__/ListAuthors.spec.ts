import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ListAuthors from "../../views/ListAuthors.vue";

describe("test list of authors", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ListAuthors, {});
  });
  it("mounts properly", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
