// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let subscriptions = [];
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "npm-component-usage" is now active!');




	vscode.window.onDidChangeActiveTextEditor((editor) => {
		// const fileList = vscode.workspace.findFiles('**​/*.js', '**​/node_modules/**', 10);
		const activeDocumentTitle = vscode.window.activeTextEditor.document.getText()
		if (['.js', '.jsx', '.ts', '.tsx'].some(i => activeDocumentTitle.includes(i))) {
			// const editor = vscode.workspace.findFiles('**​/*.js', '**​/node_modules/**', 10);
			vscode.window.showInformationMessage(`Active file: ${activeDocumentTitle}`);
		}
		// vscode.window.showInformationMessage(`ff ${JSON.stringify('')}`);

	}, null, subscriptions);

	context.subscriptions.push(vscode.Disposable.from(...subscriptions));
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
