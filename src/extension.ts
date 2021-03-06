'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'sqlops' contains the SQL Operations Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias sqlops in your code below

import * as sqlops from 'sqlops';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', async (context?: sqlops.ObjectExplorerContext) => {
        let connection = await getConnection(context);

        // Format the message
        let message = `Hello Connected World! Please connect in Object Explorer or a Query window`;
        if (connection) {
            message = `Hello Connected World! Your server name is ${connection.options['server']}`;
        }
        // Display a message box to the user
        vscode.window.showInformationMessage(message);
    });

    context.subscriptions.push(disposable);
}

async function getConnection(context?: sqlops.ObjectExplorerContext): Promise<sqlops.ConnectionInfo> {
    // If we are called from a context menu use the predefined connection.
    // This even has correct database if the node clicked on is under a specific DB
    if (context) {
        return context.connectionProfile;
    }
    // Otherwise use APIs to find the global current connection / active connection
    let connection = await sqlops.connection.getCurrentConnection();
    if (!connection) {
        let allConnections = await sqlops.connection.getActiveConnections();
        if (allConnections && allConnections.length > 0) {
            connection = allConnections[0];
        }
    }
    return connection;
}

// this method is called when your extension is deactivated
export function deactivate() {
}