const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({});
    autoHideMenuBar: false
    //Load html into window
    mainWindow.loadURL(url.format({
        //passes in file: //dirname/mainWindow.html path into loadurl
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    //Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
    console.log(mainMenu)

});


//Handle create add window

function createAddWindow(){
    //Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    autoHideMenuBar: false
    //Load html into window
    addWindow.loadURL(url.format({
        //passes in file: //dirname/mainWindow.html path into loadurl
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    //Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}



//Create menu template

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit', 
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


