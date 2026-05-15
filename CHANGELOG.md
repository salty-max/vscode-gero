# Changelog

## 0.2.0 — 2026-05-15

Conditional assembly directives — pairs with [salty-max/gero#177](https://github.com/salty-max/gero/pull/177).

- New TextMate pattern matching `\\b(ifdef|ifndef|endif)\\b` with scope `keyword.control.preprocessor.gero-asm`. VS Code's default themes colorize this like C `#ifdef` / `#endif` — visually distinct from `storage.type.directive` (used for `const` / `data8` / `data16` / `struct` / `reserve`) and `keyword.other.directive` (used for `org` / `bank` / `sram_banks` / `include`).
- Gives users a coup-d'œil distinction between flow-control directives (preprocessor color) and value-declaration directives.

Minor bump (not patch) — new TextMate scope = new coloration users will see.

## 0.1.0 — 2026-05-14

Initial release. Tracks the [gero v0.1-final asm spec](https://github.com/salty-max/gero/blob/main/docs/asm-spec.md).

- `.gas` file association
- TextMate grammar covering all 52 ISA mnemonics, 9 directives,
  registers (`r1`-`r8`, `ip`, `acu`, `sp`, `fp`, `mb`, `im`),
  bracketed addressing (`[…]` / `&[…]`), `@SYM` symbol refs,
  global + local labels (`.foo:`), character + string literals,
  `<Type> obj.prop` casts inside bracket expressions, `;` comments
- Language config: line-comment toggle (`;`), bracket pairs
  (`{} [] () <>`), auto-closing pairs (incl. quotes), indent under
  labels
- GitHub Linguist also picks up the TextMate grammar so `.gas`
  files render with the same scopes in the GitHub web view
