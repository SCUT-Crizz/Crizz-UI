import type { Meta, StoryObj } from "@storybook/vue3";
import 'crizz-ui/dist/index.css'

import { CrCollapse, CrCollapseItem } from "crizz-ui";
import 'crizz-ui/dist/theme/Collapse.css'

type Story = StoryObj<typeof CrCollapse>;

const meta: Meta<typeof CrCollapse> = {
  title: "Components/Collapse",
  component: CrCollapse,
  subcomponents: { CrCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args: any) => ({
    components: {
      CrCollapse,
      CrCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <cr-collapse v-bind="args">
      <cr-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </cr-collapse-item>
      <cr-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </cr-collapse-item>
      <cr-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </cr-collapse-item>
    </cr-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
