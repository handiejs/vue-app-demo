<template>
  <popover
    class-name="ActionWidget"
    content="holyshit"
    trigger="click"
    :visible="popoverVisible"
    @visible-change="popoverVisible = $event"
  >
    <x-button :color="resolvedColor">{{ action.text }}</x-button>
  </popover>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { ActionHeadlessWidget } from '@/components/widget/headless';

import { getComponents } from '../../helper';

@Component({
  components: getComponents(),
})
export default class PopoverButtonActionWidget extends ActionHeadlessWidget {
  private popoverVisible: boolean = false;

  private get resolvedColor(): string {
    if (this.action.primary) {
      return 'primary';
    }

    return 'default';
  }

  protected created(): void {
    this.$$view.on('change', selected => (this.popoverVisible = selected.length > 1));
  }
}
</script>
