import {Menu, nativeImage, clipboard} from "electron"
import contextMenu from "electron-context-menu"
import {download} from "electron-dl"
import fs from "fs-extra"

contextMenu({
    labels: {
		cut: 'Cut',
		copy: 'Copy',
		paste: 'Paste',
		save: 'Save Image',
		saveImageAs: 'Save Image As…',
		copyLink: 'Copy Link',
		inspect: 'Inspect'
	},
	prepend: (props, win) => [{
		label: 'Copy Image',
		visible: props.mediaType === 'image',
		async click(){
			const dl = await download(win, props.srcURL)
			const imagePath = dl.getSavePath()
			if(imagePath){
				const image = nativeImage.createFromPath(imagePath)
				clipboard.writeImage(image,'image')
				fs.remove(imagePath)
			}
		}
	}, {
		type: 'separator'
	}, {
		type: 'separator'
	}, {
		label: 'Invisible',
		visible: false
	}, {
		type: 'separator'
	}, {
		type: 'separator'
	}],
	append: () => {},
	showCopyImageAddress: true,
	showSaveImageAs: true
})

Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
]))