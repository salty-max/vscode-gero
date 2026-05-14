# Gero Assembly for VS Code

Syntax highlighting and editor support for the
[Gero VM](https://github.com/salty-max/gero) assembly language
(`.gas`).

![gero-asm preview](https://raw.githubusercontent.com/salty-max/vscode-gero/main/images/preview.png)

## Features

- **Syntax highlighting** for all 52 ISA mnemonics, 9 directives,
  registers, bracketed addressing, `@SYM` symbol references,
  global + local labels (`.foo:`), character / string literals,
  and `<Type> obj.prop` casts
- **Comment toggle** with `Cmd+/` (or `Ctrl+/`) using `;`
- **Auto-closing pairs** for `()`, `[]`, `{}`, `<>`, `"`, `'`
- **File association** for `.gas` out of the box

This extension tracks the
[gero v0.1-final asm spec](https://github.com/salty-max/gero/blob/main/docs/asm-spec.md).
When the spec bumps, this extension bumps in lockstep.

## Install

### From the marketplace

```bash
code --install-extension salty-max.gero-asm
```

### From a `.vsix` (fallback)

Download the latest `.vsix` from
[Releases](https://github.com/salty-max/vscode-gero/releases),
then:

```bash
code --install-extension gero-asm-<version>.vsix
```

## Develop

```bash
# Symlink into your extensions directory for live testing
ln -s "$(pwd)" ~/.vscode/extensions/salty-max.gero-asm-dev
```

Then reload VS Code (`Cmd+Shift+P` → "Reload Window"). Edit the
grammar or language config and reload again to see changes.

To package a `.vsix`:

```bash
npx vsce package
```

## Roadmap

- LSP integration (planned for v0.2, alongside
  [gero v0.3](https://github.com/salty-max/gero/issues/122) —
  `gero lsp` server reusing `gero check` / `gero fmt`)
- Snippets for common patterns (`hlt`, `int $10`, `call/ret`)
- Tree-sitter highlighting (already available for Neovim / Helix /
  Zed via
  [tree-sitter-gero-asm](https://github.com/salty-max/tree-sitter-gero-asm))

## License

MIT.
