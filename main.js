const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

//SET Environment 
process.env.NODE_ENV = 'production';

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
    //console.log(mainMenu)

});


//Handle create add window
function createAddWindow(){
    //Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item',
        webPreferences: {
            nodeIntegration: true
          }
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

//Catch item: add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


//Create menu template
const mainMenuTemplate = [
    
    {
        label:'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
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

//if mac, then add an empty object to the menu

// if (process.platform == 'darwin') {
//     mainMenuTemplate.unshift({label: ''});
// }


if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools', 
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
// const electron = require('electron');
// const path = require('path');
// const url = require('url');

// // SET ENV
// process.env.NODE_ENV = 'development';

// const {app, BrowserWindow, Menu, ipcMain} = electron;

// let mainWindow;
// let addWindow;

// // Listen for app to be ready
// app.on('ready', function(){
//   // Create new window
//   mainWindow = new BrowserWindow({});
//   // Load html in window
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'mainWindow.html'),
//     protocol: 'file:',
//     slashes:true
//   }));
//   // Quit app when closed
//   mainWindow.on('closed', function(){
//     app.quit();
//   });

//   // Build menu from template
//   const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//   // Insert menu
//   Menu.setApplicationMenu(mainMenu);
// });

// // Handle add item window
// function createAddWindow(){
//   addWindow = new BrowserWindow({
//     width: 300,
//     height:200,
//     title:'Add Shopping List Item'
//   });
//   addWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'addWindow.html'),
//     protocol: 'file:',
//     slashes:true
//   }));
//   // Handle garbage collection
//   addWindow.on('close', function(){
//     addWindow = null;
//   });
// }

// // Catch item:add
// ipcMain.on('item:add', function(e, item){
//   mainWindow.webContents.send('item:add', item);
//   addWindow.close(); 
//   // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
//   //addWindow = null;
// });

// // Create menu template
// const mainMenuTemplate =  [
//     // { role: 'appMenu' }
//   // Each object is a dropdown
//   {
//     label: 'File',
//     submenu:[
//       {
//         label:'Add Item',
//         click(){
//           createAddWindow();
//         }
//       },
//       {
//         label:'Clear Items',
//         click(){
//           mainWindow.webContents.send('item:clear');
//         }
//       },
//       {
//         label: 'Quit',
//         accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//         click(){
//           app.quit();
//         }
//       }
//     ]
//   }
// ];


// // If OSX, add empty object to menu
// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }

// // Add developer tools option if in dev
// if(process.env.NODE_ENV !== 'production'){
//   mainMenuTemplate.push({
//     label: 'Developer Tools',
//     submenu:[
//       {
//         role: 'reload'
//       },
//       {
//         label: 'Toggle DevTools',
//         accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       }
//     ]
//   });
// }
