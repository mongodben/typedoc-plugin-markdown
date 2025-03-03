import { heading } from '@plugin/libs/markdown';
import { MarkdownThemeContext } from '@plugin/theme';
import { ReflectionKind, SignatureReflection } from 'typedoc';

/**
 * Renders a signature member.
 *
 * @category Member Partials
 */
export function signature(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options: {
    headingLevel: number;
    nested?: boolean;
    accessor?: string;
  },
): string {
  const md: string[] = [];

  md.push(this.partials.reflectionFlags(model));

  if (!options.nested) {
    md.push(
      this.partials.signatureTitle(model, {
        accessor: options.accessor,
      }),
    );
  }

  if (model.comment) {
    md.push(
      this.partials.comment(model.comment, {
        headingLevel: options.headingLevel,
        showTags: false,
      }),
    );
  }

  if (
    model.typeParameters?.length &&
    model.kind !== ReflectionKind.ConstructorSignature
  ) {
    md.push(
      heading(options.headingLevel, this.getText('kind.typeParameter.plural')),
    );
    if (this.options.getValue('parametersFormat') === 'table') {
      md.push(this.partials.typeParametersTable(model.typeParameters));
    } else {
      md.push(this.partials.typeParametersList(model.typeParameters));
    }
  }

  if (model.parameters?.length) {
    md.push(
      heading(options.headingLevel, this.getText('kind.parameter.plural')),
    );
    if (this.options.getValue('parametersFormat') === 'table') {
      md.push(this.partials.parametersTable(model.parameters));
    } else {
      md.push(this.partials.parametersList(model.parameters));
    }
  }

  if (model.type) {
    md.push(
      this.partials.signatureReturns(model, {
        headingLevel: options.headingLevel,
      }),
    );
  }

  md.push(
    this.partials.inheritance(model, { headingLevel: options.headingLevel }),
  );

  if (model.comment) {
    md.push(
      this.partials.comment(model.comment, {
        headingLevel: options.headingLevel,
        showSummary: false,
      }),
    );
  }

  if (
    !options.nested &&
    model.sources &&
    !this.options.getValue('disableSources')
  ) {
    md.push(
      this.partials.sources(model, { headingLevel: options.headingLevel }),
    );
  }

  return md.join('\n\n');
}
