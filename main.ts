import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface ZoteroTranslatorSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ZoteroTranslatorSettings = {
	mySetting: 'default'
}

export default class ZoteroTranslator extends Plugin {
	settings: ZoteroTranslatorSettings;

	async onload() {
		//console.log('loading plugin');

		await this.loadSettings();

		//this.addRibbonIcon('dice', 'Sample Plugin', () => {
		//	new Notice('This is a notice!');
		//});

		//this.addStatusBarItem().setText('Status Bar Text');

		this.addCommand({
			id: 'paste-bibliographic-url',
			name: 'Paste Bibliographic URL',
			// callback: () => {
			// 	console.log('Simple Callback');
			// },
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new Notice('Extracting from URL...');
					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		//this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		//	console.log('click', evt);
		//});

		//this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		//console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: ZoteroTranslator;
	
	constructor(app: App, plugin: ZoteroTranslator) {
		super(app, plugin);
		this.plugin = plugin;
	}
	
	display(): void {
		let {containerEl} = this;
		
		containerEl.empty();
		
		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});
		
		new Setting(containerEl)
		.setName('Template')
		.setDesc('Customise the default format used to paste data')
		.addText(text => text
			.setPlaceholder('template example blah blah')
			.setValue('')
			.onChange(async (value) => {
				//console.log('Secret: ' + value);
				this.plugin.settings.mySetting = value;
				await this.plugin.saveSettings();
			}));
		}
	}
	
	/*

	class SampleModal extends Modal {
		constructor(app: App) {
			super(app);
		}
	
		onOpen() {
			let {contentEl} = this;
			contentEl.setText('Woah!');
		}
	
		onClose() {
			let {contentEl} = this;
			contentEl.empty();
		}
	}

	*/