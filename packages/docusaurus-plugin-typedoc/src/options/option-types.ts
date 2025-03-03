// THIS FILE IS AUTO GENERATED FROM THE OPTIONS CONFIG. DO NOT EDIT DIRECTLY.

import { ManuallyValidatedOption } from 'typedoc';

declare module 'typedoc' {
  export interface TypeDocOptionMap {
    sidebar: ManuallyValidatedOption<Sidebar>;
  }
}

/**
 * Describes the options declared by the plugin.
 *
 * @category Options
 */
export interface PluginOptions {
  /**
   * Configures the autogenerated Docusaurus sidebar.
   */
  sidebar: Sidebar;
}

/**
 *
 *
 * @category Options
 */
export interface Sidebar {
  autoConfiguration: boolean;
  pretty: boolean;
}
