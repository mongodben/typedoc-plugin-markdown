import { MarkdownThemeContext } from '@plugin/theme';
import { ContainerReflection, ReflectionKind } from 'typedoc';

/**
 * @category Container Partials
 */
export function body(
  this: MarkdownThemeContext,
  model: ContainerReflection,
  options: { headingLevel: number },
): string {
  const md: string[] = [];

  if (model.categories?.length) {
    md.push(
      this.partials.categories(model.categories, {
        headingLevel: options.headingLevel,
      }),
    );
  } else {
    const containerKinds = [
      ReflectionKind.Project,
      ReflectionKind.Module,
      ReflectionKind.Namespace,
    ];
    if (
      this.options.getValue('excludeGroups') &&
      containerKinds.includes(model.kind)
    ) {
      if (model.categories?.length) {
        md.push(
          this.partials.categories(model.categories, {
            headingLevel: options.headingLevel,
          }),
        );
      } else {
        if (model.children) {
          md.push(
            this.partials.members(model.children, {
              headingLevel: options.headingLevel,
            }),
          );
        }
      }
    } else {
      if (model.groups) {
        md.push(
          this.partials.groups(model.groups, {
            headingLevel: options.headingLevel,
          }),
        );
      }
    }
  }

  return md.join('\n\n');
}
