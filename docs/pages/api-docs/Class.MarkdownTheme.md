# MarkdownTheme

The main theme class for the plugin.

The class controls how TypeDoc models are mapped to files and templates and extends TypeDoc's base Theme class.

You would typically only be interested in overriding the the theme's render context instance.

The API follows the implementation of [TypeDoc's custom theming](https://github.com/TypeStrong/typedoc/blob/master/internal-docs/custom-themes.md) with some minor adjustments.

## Usage

```ts
export function load(app) {
  app.renderer.defineTheme('customTheme', MyMarkdownTheme);
}

class MyMarkdownTheme extends MarkdownTheme {
 ...
}
```

## Extends

- [`Theme ↗️`]( https://typedoc.org/api/classes/Theme.html )

## Methods

### getRenderContext()

> **getRenderContext**(`page`): [`MarkdownThemeContext`](/api-docs/Class.MarkdownThemeContext.md)

Creates a new instance of the current theme context.

This method can be overridden to provide an alternative theme context.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `page` | [`MarkdownPageEvent`](/api-docs/Class.MarkdownPageEvent.md)\<[`Reflection ↗️`]( https://typedoc.org/api/classes/Models.Reflection.html )\> |

#### Returns

[`MarkdownThemeContext`](/api-docs/Class.MarkdownThemeContext.md)

***

### getUrls()

> **getUrls**(`project`): [`UrlMapping`](/api-docs/Interface.UrlMapping.md)\<[`Reflection ↗️`]( https://typedoc.org/api/classes/Models.Reflection.html )\>[]

Maps the models of the given project to the desired output files.

This method can be overriden to provide an alternative url structure.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `project` | [`ProjectReflection ↗️`]( https://typedoc.org/api/classes/Models.ProjectReflection.html ) |

#### Returns

[`UrlMapping`](/api-docs/Interface.UrlMapping.md)\<[`Reflection ↗️`]( https://typedoc.org/api/classes/Models.Reflection.html )\>[]

#### Overrides

`Theme.getUrls`

***

### getNavigation()

> **getNavigation**(`project`): [`NavigationItem`](/api-docs/Interface.NavigationItem.md)[]

Map the models of the given project to a navigation structure.

This method can be overriden to provide an alternative navigation structure.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `project` | [`ProjectReflection ↗️`]( https://typedoc.org/api/classes/Models.ProjectReflection.html ) |

#### Returns

[`NavigationItem`](/api-docs/Interface.NavigationItem.md)[]
