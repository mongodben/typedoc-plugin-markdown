# Changelog

## 1.0.0 (2024-05-03)

> v1 is a major release that includes a number of improvements.

### Architectural Changes

- typedoc-plugin-markdown must be updated to V4.
- `category.yml` files are no longer written.
- Frontmatter is no longer included by default.

### Breaking Changes

#### Sidebar Configuration

- A manual sidebar file should be referenced in `sidebars.js` rather than autogenerated configuration as previously recommended. See [sidebar guide](/plugins/docusaurus/guide/sidebar).

#### Options Changes

- `includeExtension` has been removed as this behaviour is now the default.
- `frontmatter` option has been removed. Please use `typedoc-plugin-frontmatter`.
- `sidebar` options `position` and `categoryLabel` are no longer relevant and have been removed.

### Bug Fixes

- Correctly handle sidebar ids in Windows ([#597](https://github.com/typedoc2md/typedoc-plugin-markdown/issues/597)).
- Provide exit code on process error ([#583](https://github.com/typedoc2md/typedoc-plugin-markdown/issues/583))
- Use correct path separator in sidebar urls ([#489](https://github.com/typedoc2md/typedoc-plugin-markdown/issues/489))
- Fail docusaurus build when TypeDoc errors - can be overridden with `skipErrorChecking` ([#429](https://github.com/typedoc2md/typedoc-plugin-markdown/issues/429)).

---

Earlier changelog entries can be found in `CHANGELOG_ARCHIVE.md`.
