import { backTicks, strikeThrough } from '@plugin/libs/markdown';
import { escapeChars } from '@plugin/libs/utils';
import { DeclarationReflection, ReflectionKind, ReflectionType } from 'typedoc';
import { MarkdownThemeContext } from '../../..';

/**
 * Renders the main member title.
 *
 * @category Member Partials
 */
export function memberTitle(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
): string {
  const md: string[] = [];
  const name: string[] = [];

  if (
    model?.kind === ReflectionKind.Class &&
    model.flags?.includes('Abstract')
  ) {
    name.push(backTicks('abstract') + ' ');
  }

  name.push(
    `${
      /\\/.test(model.name) ||
      (model.name.startsWith('[') && model.signatures?.length)
        ? backTicks(model.name)
        : escapeChars(model.name)
    }`,
  );

  if (
    model.signatures?.length ||
    (model.type as ReflectionType)?.declaration?.signatures?.length
  ) {
    name.push('()');
  }

  if (model.typeParameters?.length) {
    const typeParameters = model.typeParameters
      .map((typeParameter) => typeParameter.name)
      .join(', ');
    name.push(`${`\\<${typeParameters}\\>`}`);
  }

  if (model.flags.isOptional) {
    name.push('?');
  }

  if (model.isDeprecated && model.isDeprecated()) {
    md.push(strikeThrough(name.join('')));
  } else {
    md.push(name.join(''));
  }

  return md.join(': ');
}
