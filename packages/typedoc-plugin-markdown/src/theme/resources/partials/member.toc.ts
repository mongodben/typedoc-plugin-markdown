import {
  DeclarationReflection,
  ProjectReflection,
  ReflectionGroup,
  ReflectionKind,
} from 'typedoc';
import { MarkdownThemeRenderContext } from '../..';
import { heading, link, table } from '../../../support/elements';
import { escapeChars, tableComments } from '../../../support/utils';

export function memberTOC(
  context: MarkdownThemeRenderContext,
  reflection: ProjectReflection | DeclarationReflection,
  headingLevel: number,
): string {
  const md: string[] = [];

  const hideInPageTOC = context.getOption('hideInPageTOC');

  const isVisible = reflection.groups?.some((group) =>
    group.allChildrenHaveOwnDocument(),
  );

  if (
    (!hideInPageTOC && reflection.groups) ||
    (isVisible && reflection.groups)
  ) {
    const subHeadingLevel = headingLevel + 1;

    md.push(heading(headingLevel, 'Index\n'));

    if (reflection.categories?.length) {
      reflection.categories.forEach((item) => {
        md.push(heading(subHeadingLevel, item.title) + '\n');
        md.push(getGroup(context, item) + '\n');
      });
    } else {
      if (context.getOption('excludeGroups') && reflection.children) {
        const group = { title: 'Members', children: reflection.children };
        md.push(getGroup(context, group as ReflectionGroup) + '\n');
      } else {
        reflection.groups?.forEach((reflectionGroup) => {
          if (reflectionGroup.categories) {
            md.push(heading(subHeadingLevel, reflectionGroup.title) + '\n');
            reflectionGroup.categories.forEach((item2) => {
              md.push(heading(subHeadingLevel + 1, item2.title) + '\n');
              md.push(getGroup(context, reflectionGroup) + '\n');
            });
          } else {
            if (
              !hideInPageTOC ||
              reflectionGroup.allChildrenHaveOwnDocument()
            ) {
              md.push(heading(subHeadingLevel, reflectionGroup.title) + '\n');
              md.push(getGroup(context, reflectionGroup) + '\n');
            }
          }
        });
      }
    }
  }
  return md.length > 0 ? md.join('\n') : '';
}

function getGroup(context: MarkdownThemeRenderContext, group: ReflectionGroup) {
  if (context.getOption('tocFormat') === 'table') {
    return getTable(context, group);
  }
  return getList(context, group);
}

function getTable(context: MarkdownThemeRenderContext, group: ReflectionGroup) {
  const reflectionKind = group.children[0].kind;
  const headers = [
    ReflectionKind.singularString(reflectionKind),
    'Description',
  ];
  const rows: string[][] = [];

  group.children.forEach((child) => {
    const row: string[] = [];

    row.push(link(escapeChars(child.name), context.relativeURL(child.url)));

    if (child.comment?.summary) {
      row.push(
        tableComments(context.commentParts(child.comment.summary)).split(
          '\n',
        )[0],
      );
    } else {
      row.push('-');
    }
    rows.push(row);
  });
  return table(headers, rows);
}

function getList(context: MarkdownThemeRenderContext, group: ReflectionGroup) {
  const children = group.children.map(
    (child) =>
      `- [${escapeChars(child.name)}](${context.relativeURL(child.url)})`,
  );
  return children.join('\n');
}
