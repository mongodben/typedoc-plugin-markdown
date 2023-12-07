import * as fs from 'fs';
import { Application, Options, OptionsReader } from 'typedoc';
import { MarkdownRendererEvent, NavigationItem } from 'typedoc-plugin-markdown';
import presets from './options/presets';
import { GitlabWikiTheme } from './theme';

export function load(app: Application) {
  app.renderer.defineTheme('gitlab-wiki', GitlabWikiTheme);

  app.options.addReader(
    new (class implements OptionsReader {
      name = 'gitlab-wiki-options';
      readonly order = 0;
      readonly supportsPackages = false;
      read(container: Options) {
        Object.entries(presets).forEach(([key, value]) => {
          container.setValue('theme', 'gitlab-wiki');
          container.setValue(key, value);
        });
      }
    })(),
  );

  app.renderer.postRenderAsyncJobs.push(
    async (output: MarkdownRendererEvent) => {
      fs.writeFileSync(
        `${output.outputDirectory}/_sidebar.md`,
        navigation(output.navigation),
      );
    },
  );
}

export function navigation(navigationItems: NavigationItem[]): string {
  const md: string[] = [];
  navigationItems.forEach((navigationItem) => {
    if (navigationItem.url) {
      md.push(`- [${navigationItem.title}](${navigationItem.url})`);
    }
    if (navigationItem.children?.length) {
      md.push(`## ${navigationItem.title} \n`);
      navigationItem.children?.forEach((navItem) => {
        md.push(`- [${navItem.title}](${navItem.url})`);
      });
      md.push('\n');
    }
  });
  return md.join('\n');
}
