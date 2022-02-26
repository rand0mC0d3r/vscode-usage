const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let subscriptions = [];
	console.log('Congratulations, your extension "npm-component-usage" is now active!');

	const	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = 'npm-component-usage.open';
	subscriptions.push(myStatusBarItem);

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		const activeDocumentTitle = vscode.window.activeTextEditor.document.fileName.split('/')
		const fileName = activeDocumentTitle[activeDocumentTitle.length - 1]
		const folderName = activeDocumentTitle[activeDocumentTitle.length - 2]


		if (['.js', '.jsx', '.ts', '.tsx'].some(i => fileName.includes(i))) {
			let filesFound = []
			// vscode.window.showInformationMessage(`Active folder: ${folderName} file: ${fileName}`);
			const targetFolder = vscode.workspace.getConfiguration('myExtension').get('includedFolders')
			myStatusBarItem.text = `Searching...`;
			myStatusBarItem.show();
			vscode.workspace.findFiles(targetFolder || 'src/**/*').then(res => {
			res
				.filter(resItem => !resItem.path.includes('node_modules'))
				.map(resItem => {
					const content = fs.readFileSync(resItem.path, 'utf8')
					if (fileName.includes('index')) {
						if (content.includes(`/${folderName}'`)) {
							filesFound.push(resItem.path)
						}
					} else {
						if (content.includes(`/${fileName}'`)) {
							filesFound.push(resItem.path)
						}
					}
				})
				// console.log(filesFound)
				if (filesFound.length > 0) {
					vscode.window.showInformationMessage(`${filesFound.length} files found: ${filesFound.join(', ')}`);
				} else {
					vscode.window.showWarningMessage('No files found');
				}
			})
			myStatusBarItem.hide();
		}
	}, null, subscriptions);

	context.subscriptions.push(vscode.Disposable.from(...subscriptions));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
