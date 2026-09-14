# Changelog

## 0.5.0 — 2026-09-14

Wires the extension to `gero lsp`, so a buffer gets diagnostics and
navigation rather than colour alone.

- `src/extension.ts` spawns `gero lsp` over stdio and routes both
  language ids through one client, the way the server serves them.
- Diagnostics, go-to-definition, hover, find-references, completion,
  inlay hints, formatting and quick-fix code actions, for `.gr` and —
  except hints and code actions, which it has no data for — `.gas`.
- `gero.path` setting for a binary that is not on `PATH`. A missing
  binary says so in a notification and the status bar rather than
  leaving a server that never answers.
- `gero.trace.server` setting for the JSON-RPC conversation, in the
  extension's own output channel.
- Status bar item reflecting the client's connection state.
- The extension now ships compiled JavaScript, so `node_modules` is no
  longer excluded from the package — it held the runtime client.
- Declares limited support for untrusted workspaces, so colour and the
  language server work in a folder opened for browsing. `gero.path` is
  a restricted configuration there: a checkout cannot name the binary
  that gets spawned by shipping its own `.vscode/settings.json`.


## 0.4.0 — 2026-09-08

Adds `.gr` — the extension covered the assembler only until now, so a
gero-lang buffer opened with no colour.

- Second `contributes.languages` entry for `gero-lang` (`*.gr`, scope
  `source.gero-lang`) alongside `gero-asm`.
- New `grammars/gero-lang.tmLanguage.json`: comments, the 42 keywords,
  the ten writable primitives, annotations in both forms, `$FF` hex /
  `0b` binary / fixed-point / decimal literals, strings with `$(expr)`
  interpolation and format specs, char literals, `Enum.Variant` paths,
  loop labels, and the operator set.
- `language-configurations/gero-lang.json`: `--` comment toggle,
  brackets, and indent rules that open on a block head and close on
  `end` / `else` / `elif` / `until` / `case`.
- `language-configuration.json` moved to
  `language-configurations/gero-asm.json` so both languages sit
  side by side. Internal path only — nothing user-visible changed for
  `.gas`.

Minor bump: a second language is a new capability, and the config path
moved.

## 0.3.0 — 2026-05-15

Mnemonic-list sync for the ISA completion sprint — pairs with [salty-max/gero#186](https://github.com/salty-max/gero/pull/186).

- `sext` added to the **arithmetic** group (sign-extension, single-operand). Keeps the same `keyword.operator.arithmetic` scope as its siblings.
- `asr` added to the **bitwise + shift** group (arithmetic shift right, preserves sign). Sits next to `shl` / `shr` / `rol` / `ror`.
- `btest` / `bclr` joined the **compare / test / single-bit ops** group. `bset` was already there (formerly the `bset memset` semantics) and keeps its slot — the asm resolver disambiguates by operand shape, so a single TextMate scope is fine.
- `bfill` (renamed from the old `bset memset` form) added to the **data movement** group alongside `bcpy` — same `keyword.operator.move` scope as the other block-memory primitive.

Minor bump (not patch) — the literal-set grew by five (one renamed) and one of the new mnemonics (`bfill`) moved category compared to the old `bset memset` form.

## 0.2.1 — 2026-05-15

Mnemonic-list completion — pairs with [salty-max/gero#179](https://github.com/salty-max/gero/pull/179).

- `bank_call` and `bank_jump` added to the control-flow mnemonic alternation. Both are cross-bank pseudo-instructions in the gero asm — they desugar at assembly time to `mov $bank, mb` + `call`/`jmp <addr>`. Placed in the **control-flow** group (alongside `jmp` / `call`) so they pick up the same `keyword.control` scope and coloration.

Patch bump (not minor) — same scope, just the literal-set in the control-flow pattern grew.

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
