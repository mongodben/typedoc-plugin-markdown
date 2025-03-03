import { heading } from '@plugin/libs/markdown';
import { PLURAL_KIND_KEY_MAP } from '@plugin/options/text-mappings';
import { TextContentMappings } from 'public-api';
import { ReflectionGroup, ReflectionKind } from 'typedoc';
import { MarkdownThemeContext } from '../../markdown-themecontext';

/**
 * Renders a collection of reflection groups.
 *
 * @category Container Partials
 */
export function groups(
  this: MarkdownThemeContext,
  model: ReflectionGroup[],
  options: { headingLevel: number },
) {
  const groupsWithChildren = model?.filter(
    (group) => !group.allChildrenHaveOwnDocument(),
  );

  const md: string[] = [];

  const getGroupTitle = (groupTitle: string) => {
    const key = PLURAL_KIND_KEY_MAP[groupTitle] as keyof TextContentMappings;
    return this.getText(key) || groupTitle;
  };

  groupsWithChildren?.forEach((group, index: number) => {
    if (group.categories) {
      md.push(heading(options.headingLevel, getGroupTitle(group.title)));
      if (group.description) {
        md.push(this.partials.commentParts(group.description));
      }
      md.push(
        this.partials.categories(group.categories, {
          headingLevel: options.headingLevel + 1,
        }),
      );
    } else {
      const isPropertiesGroup = group.children.every(
        (child) => child.kind === ReflectionKind.Property,
      );

      const isEnumGroup = group.children.every(
        (child) => child.kind === ReflectionKind.EnumMember,
      );

      md.push(heading(options.headingLevel, getGroupTitle(group.title)));
      if (group.description) {
        md.push(this.partials.commentParts(group.description));
      }
      if (
        isPropertiesGroup &&
        this.options.getValue('propertiesFormat') === 'table'
      ) {
        md.push(
          this.partials.declarationsTable(group.children, {
            isEventProps:
              getGroupTitle(group.title) === this.getText('kind.event.plural'),
          }),
        );
      } else if (
        isEnumGroup &&
        this.options.getValue('enumMembersFormat') === 'table'
      ) {
        md.push(this.partials.enumMembersTable(group.children));
      } else {
        if (group.children) {
          md.push(
            this.partials.members(group.children, {
              headingLevel: options.headingLevel + 1,
            }),
          );
        }
      }
    }
  });
  return md.join('\n\n');
}
