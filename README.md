# Gero for VS Code

Editor support for the [Gero VM](https://github.com/salty-max/gero):
the assembly language (`.gas`) and gero-lang (`.gr`).

![gero-asm preview](https://raw.githubusercontent.com/salty-max/vscode-gero/main/images/preview.png)

## Features

Colour comes from the extension; everything else comes from
`gero lsp`, which it spawns for you.

- **Syntax highlighting** for both languages — every ISA mnemonic,
  directive, register, bracketed addressing mode, `@SYM` reference,
  global and local label, and `<Type> obj.prop` cast in `.gas`; the
  keywords, primitives, annotations, literals and interpolated
  strings in `.gr`
- **Diagnostics** as you type, identical to what `gero check` reports
- **Go-to-definition, hover and find-references**, answered from the
  compiler's own tables rather than a second guess at the same names.
  Hovering a name in `.gas` reports the address it assembled to
- **Completion**, including names you have not imported yet —
  accepting one writes the `use` line for you
- **Quick fixes** for a misspelled name, a missing import, and an
  import nothing uses (`.gr`)
- **Inlay hints** showing the inferred type of an unannotated `let`
  (`.gr`)
- **Formatting**, identical to what `gero fmt` writes
- **Comment toggle** with `Cmd+/` — `;` in `.gas`, `--` in `.gr`
- **Auto-closing pairs** and file association for both extensions

The language server has to be installed separately: see
[installing gero](https://github.com/salty-max/gero/blob/main/docs/tooling.md).
Point `gero.path` at the binary if it is not on your `PATH`.

## Settings

| Setting | Default | What it does |
|---|---|---|
| `gero.path` | `""` | Absolute path to the `gero` binary. Empty resolves `gero` on `PATH`. |
| `gero.trace.server` | `"off"` | `messages` or `verbose` logs the JSON-RPC conversation to the **Gero Language Server** output channel. |

In a folder you have not trusted, `gero.path` is ignored and the
server is whichever `gero` your PATH or user settings resolve to — a
checkout cannot choose the binary that runs on your machine.

This extension tracks the specs in the
[gero repository](https://github.com/salty-max/gero/tree/main/docs).
When they bump, this extension bumps in lockstep.

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
npm install
npm run compile          # or: npm run watch
npx vsce package         # produces gero-asm-<version>.vsix
code --install-extension gero-asm-*.vsix --force
```

Reload VS Code (`Cmd+Shift+P` → "Reload Window") to pick up a new
build. A grammar or language-config change needs only the reload; a
change under `src/` needs a recompile first.

To see what the client and server are saying to each other, set
`gero.trace.server` to `verbose` and open the **Gero Language Server**
output channel.

## Roadmap

- Publish to the marketplace
- Snippets for common patterns (`hlt`, `int $10`, `call/ret`)
- Bundle with esbuild, once the dependency footprint justifies it

Neovim, Helix and Zed get highlighting from the tree-sitter grammars
instead —
[gero-asm](https://github.com/salty-max/tree-sitter-gero-asm) and
[gero-lang](https://github.com/salty-max/tree-sitter-gero-lang) — and
the same server through their own LSP config.

## License

MIT.
