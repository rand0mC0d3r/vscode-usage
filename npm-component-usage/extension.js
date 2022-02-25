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


	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with  registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('npm-component-usage.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	const activeDocumentTitle = vscode.window.activeTextEditor.document.getText()
	// 	if (['.js', '.jsx', '.ts', '.tsx'].some(i => activeDocumentTitle.includes(i))) {
	// 		vscode.window.showInformationMessage(`Active file: ${activeDocumentTitle}`);
	// 	}
	// });


	vscode.window.onDidChangeActiveTextEditor((editor) => {
		const activeDocumentTitle = vscode.window.activeTextEditor.document.fileName
		if (['.js', '.jsx', '.ts', '.tsx'].some(i => activeDocumentTitle.includes(i))) {

			vscode.window.showInformationMessage(`Active file: ${activeDocumentTitle}`);
		}

	}, null, subscriptions);


	context.subscriptions.push(vscode.Disposable.from(...subscriptions));
	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
