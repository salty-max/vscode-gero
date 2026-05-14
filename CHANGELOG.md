# Changelog

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
