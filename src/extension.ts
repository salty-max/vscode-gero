import { spawnSync } from "node:child_process";
import {
  ExtensionContext,
  StatusBarAlignment,
  StatusBarItem,
  window,
  workspace,
} from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  State,
  TransportKind,
} from "vscode-languageclient/node";

/** Language ids this extension contributes, and the server serves. */
const LANGUAGES = ["gero-asm", "gero-lang"];

let client: LanguageClient | undefined;
let status: StatusBarItem;

export async function activate(context: ExtensionContext): Promise<void> {
  status = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  status.name = "Gero";
  context.subscriptions.push(status);

  const command = resolveBinary();
  if (!command) {
    // A missing binary is the common first-run failure, and silence
    // would leave the user wondering why nothing resolves.
    setStatus("$(error) Gero: not found", "gero was not found on PATH. Set gero.path.");
    window.showWarningMessage(
      "Gero language server not started: `gero` was not found on PATH. " +
        "Set `gero.path` to the binary, or install gero.",
    );
    return;
  }

  const serverOptions: ServerOptions = {
    run: { command, args: ["lsp"], transport: TransportKind.stdio },
    debug: { command, args: ["lsp"], transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: LANGUAGES.map((language) => ({ scheme: "file", language })),
    // The server re-reads a document's imports from disk, so a change
    // to one it never opened still matters to the buffers that do.
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.{gas,gr}"),
    },
  };

  client = new LanguageClient("gero", "Gero Language Server", serverOptions, clientOptions);
  context.subscriptions.push(client.onDidChangeState((e) => reflectState(e.newState)));

  try {
    await client.start();
  } catch (err) {
    setStatus("$(error) Gero: failed", `The language server did not start: ${err}`);
    window.showErrorMessage(`Gero language server failed to start: ${err}`);
  }
}

export async function deactivate(): Promise<void> {
  await client?.stop();
}

/** Mirror the client's connection state into the status bar. */
function reflectState(state: State): void {
  switch (state) {
    case State.Running:
      setStatus("$(check) Gero", `${versionLabel()} — language server running`);
      break;
    case State.Starting:
      setStatus("$(sync~spin) Gero", "Starting the Gero language server…");
      break;
    case State.Stopped:
      setStatus("$(circle-slash) Gero", "The Gero language server is stopped.");
      break;
  }
}

function setStatus(text: string, tooltip: string): void {
  status.text = text;
  status.tooltip = tooltip;
  status.show();
}

/**
 * The `gero` binary to spawn: the `gero.path` setting when set,
 * otherwise whatever `gero` resolves to on PATH.
 *
 * Returns `undefined` when neither runs, so activation can say so
 * rather than leaving a server that never answers.
 */
function resolveBinary(): string | undefined {
  const configured = workspace.getConfiguration("gero").get<string>("path");
  const candidate = configured && configured.trim().length > 0 ? configured : "gero";
  return runsOk(candidate) ? candidate : undefined;
}

/** `true` when `command --version` exits cleanly. */
function runsOk(command: string): boolean {
  try {
    return spawnSync(command, ["--version"], { encoding: "utf8" }).status === 0;
  } catch {
    return false;
  }
}

/** `gero --version`'s output, for the status bar tooltip. */
function versionLabel(): string {
  const command = resolveBinary();
  if (!command) return "gero";
  try {
    const out = spawnSync(command, ["--version"], { encoding: "utf8" }).stdout;
    return out.trim() || "gero";
  } catch {
    return "gero";
  }
}
