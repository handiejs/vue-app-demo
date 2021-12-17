import { createView } from 'handie-vue';

import {
  ComponentCtor,
  ModuleContext,
  ComponentRenderer,
  ViewCategory,
  ListViewContextDescriptor,
  ObjectViewContextDescriptor,
  ListViewContext,
  ObjectViewContext,
} from '../types';

type ViewGetter = () => ComponentCtor;

type UncertainContext<CTT> = ModuleContext | CTT;

type UnionViewContextDescriptor<VT, CT> =
  | ListViewContextDescriptor<VT, CT>
  | ObjectViewContextDescriptor<VT, CT>;

type PartialOptions<OT> = Omit<OT, 'type' | 'widget'> & {
  widget?: ComponentRenderer;
};

function resolveView<VT, CT>(
  context: UncertainContext<ListViewContext<VT, CT> | ObjectViewContext<VT, CT>>,
  category: ViewCategory,
  defaultRenderer: string,
  options?: PartialOptions<UnionViewContextDescriptor<VT, CT>>,
): ComponentCtor {
  let resolved: UnionViewContextDescriptor<VT, CT> | undefined;

  if (options) {
    resolved = { widget: defaultRenderer, ...options, category };
  } else {
    resolved = undefined;
  }

  return createView<VT, CT>(context, resolved) as ComponentCtor;
}

function createTableView<VT, CT>(
  context: UncertainContext<ListViewContext<VT, CT>>,
  options?: PartialOptions<ListViewContextDescriptor<VT, CT>>,
): ComponentCtor {
  return resolveView<VT, CT>(context, 'list', 'TableViewWidget', options);
}

function createTableViewGetter<VT, CT>(
  context: UncertainContext<ListViewContext<VT, CT>>,
  options?: PartialOptions<ListViewContextDescriptor<VT, CT>>,
): ViewGetter {
  return () => createTableView(context, options);
}

function createDetailView<VT, CT>(
  context: UncertainContext<ObjectViewContext<VT, CT>>,
  options?: PartialOptions<ObjectViewContextDescriptor<VT, CT>>,
): ComponentCtor {
  return resolveView<VT, CT>(context, 'object', 'DetailViewWidget', options);
}

function createDetailViewGetter<VT, CT>(
  context: UncertainContext<ObjectViewContext<VT, CT>>,
  options?: PartialOptions<ObjectViewContextDescriptor<VT, CT>>,
): ViewGetter {
  return () => createDetailView(context, options);
}

function createFormView<VT, CT>(
  context: UncertainContext<ObjectViewContext<VT, CT>>,
  options?: PartialOptions<ObjectViewContextDescriptor<VT, CT>>,
): ComponentCtor {
  return resolveView<VT, CT>(context, 'object', 'FormViewWidget', options);
}

function createFormViewGetter<VT, CT>(
  context: UncertainContext<ObjectViewContext<VT, CT>>,
  options?: PartialOptions<ObjectViewContextDescriptor<VT, CT>>,
): ViewGetter {
  return () => createFormView(context, options);
}

export {
  createTableView,
  createTableViewGetter,
  createDetailView,
  createDetailViewGetter,
  createFormView,
  createFormViewGetter,
};
