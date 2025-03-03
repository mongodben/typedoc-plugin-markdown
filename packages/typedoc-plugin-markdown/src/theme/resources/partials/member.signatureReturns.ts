import { backTicks, heading } from '@plugin/libs/markdown';
import { MarkdownThemeContext } from '@plugin/theme';
import {
  DeclarationReflection,
  ReferenceType,
  ReflectionType,
  SignatureReflection,
} from 'typedoc';

/**
 * @category Member Partials
 */
export function signatureReturns(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options: { headingLevel: number },
): string {
  const md: string[] = [];

  const typeDeclaration = (model.type as any)
    ?.declaration as DeclarationReflection;

  md.push(heading(options.headingLevel, this.getText('label.returns')));

  if (typeDeclaration?.signatures) {
    md.push(backTicks('Function'));
  } else {
    md.push(this.helpers.getReturnType(model.type));
  }

  if (model.comment?.blockTags.length) {
    const tags = model.comment.blockTags
      .filter((tag) => tag.tag === '@returns')
      .map((tag) => this.partials.commentParts(tag.content));
    md.push(tags.join('\n\n'));
  }

  if (model.type instanceof ReferenceType && model.type.typeArguments?.length) {
    if (
      model.type.typeArguments[0] instanceof ReflectionType &&
      model.type.typeArguments[0].declaration.children
    ) {
      md.push(
        this.partials.typeDeclaration(
          model.type.typeArguments[0].declaration.children,
          { headingLevel: options.headingLevel },
        ),
      );
    }
  }

  if (typeDeclaration?.signatures) {
    typeDeclaration.signatures.forEach((signature) => {
      md.push(
        this.partials.signature(signature, {
          headingLevel: options.headingLevel + 1,
          nested: true,
        }),
      );
    });
  }

  if (typeDeclaration?.children) {
    md.push(
      this.partials.typeDeclaration(typeDeclaration.children, {
        headingLevel: options.headingLevel,
      }),
    );
  }

  return md.join('\n\n');
}
