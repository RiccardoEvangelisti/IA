/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DuplicateTabs
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var DuplicateTabsSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h1", { text: "Close Similar Tabs" });
    const linkText = containerEl.createEl("span", {
      text: " \u{1F334}"
    });
    const linkContainer = containerEl.createEl("p", {
      text: "Repository: \u{1F334} "
    });
    linkContainer.createEl("a", {
      text: "1C0D/Obsidian-Close-Similar-Tabs",
      href: "https://github.com/1C0D/Obsidian-Close-Similar-Tabs"
    });
    linkContainer.appendChild(linkText);
    new import_obsidian.Setting(containerEl).setName("Close by window").setDesc(
      "Select whether the plugin will only close similar tabs within the same window, or throughout all open windows."
    ).addDropdown((dropdown) => {
      dropdown.addOptions({
        current: "Current window only",
        all: "All windows"
      }).setValue(this.plugin.settings.byWindow).onChange(async (value) => {
        this.plugin.settings.byWindow = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName("No empty tabs").setDesc("Activates no several empty tabs").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.noEmptyTabs).onChange((value) => {
        this.plugin.settings.noEmptyTabs = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Toggle Close Similar Tabs").setDesc("Enable/disable Close Similar Tabs").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.toggleCloseSimilarTabs).onChange((value) => {
        this.plugin.settings.toggleCloseSimilarTabs = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Be Notified").setDesc("open a notification pop up when a similar tab already exists").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.beNotified).onChange((value) => {
        this.plugin.settings.beNotified = value;
        this.plugin.saveSettings();
      });
    });
    containerEl.createEl("p", {
      text: 'Check "Close Similar Tabs parameters" in Command palette to directly change these parameters, from the editor'
    });
  }
};

// src/modal.ts
var import_obsidian2 = require("obsidian");
var DuplicateTabsModal = class extends import_obsidian2.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h4", { text: "Close Similar Tabs Parameters" });
    new import_obsidian2.Setting(contentEl).setName("Toggle Close Similar Tabs").setDesc("Enable/disable Close Similar Tabs").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.toggleCloseSimilarTabs).onChange((value) => {
        this.plugin.settings.toggleCloseSimilarTabs = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("Close by window").setDesc(
      "Select whether the plugin will only close similar tabs within the same window, or throughout all open windows."
    ).addDropdown((dropdown) => {
      dropdown.addOptions({
        current: "Current window only",
        all: "All windows"
      }).setValue(this.plugin.settings.byWindow).onChange(async (value) => {
        this.plugin.settings.byWindow = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("No empty tabs").setDesc("Activates no several empty tabs").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.noEmptyTabs).onChange((value) => {
        this.plugin.settings.noEmptyTabs = value;
        this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(contentEl).setName("Be Notified").setDesc("open a notification pop up when a similar tab already exists").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.beNotified).onChange((value) => {
        this.plugin.settings.beNotified = value;
        this.plugin.saveSettings();
      });
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  byWindow: "current",
  noEmptyTabs: true,
  toggleCloseSimilarTabs: true,
  beNotified: true
};
var DuplicateTabs = class extends import_obsidian3.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new DuplicateTabsSettingsTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      this.registerEvent(
        this.app.workspace.on("active-leaf-change", () => {
          if (this.settings.toggleCloseSimilarTabs)
            this.findDuplicates();
        })
      );
    });
    this.addCommand({
      id: "close-similar-tabs-params",
      name: "Close similar tabs parameters",
      callback: () => {
        new DuplicateTabsModal(this.app, this).open();
      }
    });
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // activeLeaf = last leaf created, removed when it's a duplicate
  findDuplicates() {
    const byWindow = this.settings.byWindow;
    const noEmptyTabs = this.settings.noEmptyTabs;
    const { workspace } = this.app;
    const activeLeaf = workspace.activeLeaf;
    const activeView = activeLeaf.view;
    const isMainWindowActive = (activeView == null ? void 0 : activeView.containerEl.win) == window;
    const rootSplitActive = activeLeaf.getRoot() == workspace.rootSplit;
    const activeLeafPath = activeLeaf == null ? void 0 : activeLeaf.getViewState().state.file;
    const activeTitlePart = activeLeafPath == null ? void 0 : activeLeafPath.split("/").pop().split(".")[0];
    const activetitle = activeView == null ? void 0 : activeView.getDisplayText();
    const activeEl = activeLeaf.parent.containerEl;
    if ((activeView == null ? void 0 : activeView.getDisplayText()) !== "New tab" && (!activeLeafPath || activeTitlePart !== activetitle))
      return;
    workspace.iterateAllLeaves((leaf) => {
      const leafEl = leaf.parent.containerEl;
      if (activeEl !== leafEl)
        return;
      const leafState = leaf.getViewState();
      const leafPath = leafState.state.file;
      const leafTitle = leaf.getDisplayText();
      const leafTitlePart = leafPath == null ? void 0 : leafPath.split("/").pop().split(".")[0];
      if ((activeView == null ? void 0 : activeView.getDisplayText()) !== "New tab" && (!leafPath || leafTitlePart !== leafTitle))
        return;
      const isMainWindowDupli = leaf.view.containerEl.win == window;
      const isSameWindowDupli = leaf.view.containerEl.win == activeWindow;
      const rootSplitDupli = leaf.getRoot() == workspace.rootSplit;
      const correctPane = isMainWindowDupli && rootSplitDupli || !isMainWindowDupli;
      if (leaf !== activeLeaf && leafPath && leafPath === activeLeafPath && (!isMainWindowActive || rootSplitActive) && correctPane) {
        if (byWindow === "all") {
          this.closeDuplicate(activeLeaf, workspace, leaf, leafPath);
        } else {
          const correctPane1 = isMainWindowDupli && isMainWindowActive || !isMainWindowActive && !isMainWindowDupli && isSameWindowDupli;
          if (correctPane1) {
            this.closeDuplicate(activeLeaf, workspace, leaf, leafPath);
          }
        }
      } else if (
        // empty tabs
        noEmptyTabs && leaf !== activeLeaf && leaf.view.getDisplayText() === "New tab" && (activeView == null ? void 0 : activeView.getDisplayText()) === "New tab" && (!isMainWindowActive || rootSplitActive) && correctPane
      ) {
        if (byWindow === "all") {
          leaf == null ? void 0 : leaf.detach();
          if (activeLeaf)
            workspace.revealLeaf(activeLeaf);
        } else {
          const correctPane1 = isMainWindowDupli && isMainWindowActive || !isMainWindowActive && !isMainWindowDupli && isSameWindowDupli;
          if (correctPane1) {
            leaf == null ? void 0 : leaf.detach();
            if (activeLeaf)
              workspace.revealLeaf(activeLeaf);
          }
        }
      }
    });
  }
  closeDuplicate(activeLeaf, workspace, leaf, leafPath) {
    activeLeaf == null ? void 0 : activeLeaf.detach();
    workspace.revealLeaf(leaf);
    if (this.settings.beNotified) {
      new import_obsidian3.Notice(`"${leafPath}" already opened`);
    }
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL3NldHRpbmdzLnRzIiwgInNyYy9tb2RhbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIFdvcmtzcGFjZSwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBEdXBsaWNhdGVUYWJzU2V0dGluZ3NUYWIgfSBmcm9tIFwic3JjL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IER1cGxpY2F0ZVRhYnNNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XHJcblxyXG5pbnRlcmZhY2UgVGFiQ2Vzc2lvbnNTZXR0aW5ncyB7XHJcblx0YnlXaW5kb3c6IFwiY3VycmVudFwiIHwgXCJhbGxcIjtcclxuXHRub0VtcHR5VGFiczogYm9vbGVhbjtcclxuXHR0b2dnbGVDbG9zZVNpbWlsYXJUYWJzOiBib29sZWFuO1xyXG5cdGJlTm90aWZpZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFRhYkNlc3Npb25zU2V0dGluZ3MgPSB7XHJcblx0YnlXaW5kb3c6IFwiY3VycmVudFwiLFxyXG5cdG5vRW1wdHlUYWJzOiB0cnVlLFxyXG5cdHRvZ2dsZUNsb3NlU2ltaWxhclRhYnM6IHRydWUsXHJcblx0YmVOb3RpZmllZDogdHJ1ZSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1cGxpY2F0ZVRhYnMgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBUYWJDZXNzaW9uc1NldHRpbmdzO1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBEdXBsaWNhdGVUYWJzU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVnaXN0ZXJFdmVudChcclxuXHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MudG9nZ2xlQ2xvc2VTaW1pbGFyVGFicylcclxuXHRcdFx0XHRcdFx0dGhpcy5maW5kRHVwbGljYXRlcygpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJjbG9zZS1zaW1pbGFyLXRhYnMtcGFyYW1zXCIsXHJcblx0XHRcdG5hbWU6IFwiQ2xvc2Ugc2ltaWxhciB0YWJzIHBhcmFtZXRlcnNcIixcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0XHRuZXcgRHVwbGljYXRlVGFic01vZGFsKHRoaXMuYXBwLCB0aGlzKS5vcGVuKCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9XHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oXHJcblx0XHRcdHt9LFxyXG5cdFx0XHRERUZBVUxUX1NFVFRJTkdTLFxyXG5cdFx0XHRhd2FpdCB0aGlzLmxvYWREYXRhKClcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0Ly8gYWN0aXZlTGVhZiA9IGxhc3QgbGVhZiBjcmVhdGVkLCByZW1vdmVkIHdoZW4gaXQncyBhIGR1cGxpY2F0ZVxyXG5cdGZpbmREdXBsaWNhdGVzKCkge1xyXG5cdFx0Y29uc3QgYnlXaW5kb3cgPSB0aGlzLnNldHRpbmdzLmJ5V2luZG93O1xyXG5cdFx0Y29uc3Qgbm9FbXB0eVRhYnMgPSB0aGlzLnNldHRpbmdzLm5vRW1wdHlUYWJzO1xyXG5cdFx0Ly8gb24gd2hhdCB3aW5kb3cgYWN0aXZlIGlzXHJcblx0XHRjb25zdCB7IHdvcmtzcGFjZSB9ID0gdGhpcy5hcHA7XHJcblx0XHRjb25zdCBhY3RpdmVMZWFmID0gKHdvcmtzcGFjZSBhcyBhbnkpLmFjdGl2ZUxlYWY7XHJcblx0XHRjb25zdCBhY3RpdmVWaWV3ID0gYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0Y29uc3QgaXNNYWluV2luZG93QWN0aXZlID0gYWN0aXZlVmlldz8uY29udGFpbmVyRWwud2luID09IHdpbmRvdztcclxuXHRcdGNvbnN0IHJvb3RTcGxpdEFjdGl2ZSA9IGFjdGl2ZUxlYWYuZ2V0Um9vdCgpID09IHdvcmtzcGFjZS5yb290U3BsaXQ7XHJcblxyXG5cdFx0Ly8gZ2V0IGFjdGl2ZSByZWxhdGl2ZSBwYXRoIChmb2xkZXI/L25hbWUpXHJcblx0XHRjb25zdCBhY3RpdmVMZWFmUGF0aCA9IGFjdGl2ZUxlYWY/LmdldFZpZXdTdGF0ZSgpLnN0YXRlLmZpbGU7XHJcblx0XHRjb25zdCBhY3RpdmVUaXRsZVBhcnQgPSBhY3RpdmVMZWFmUGF0aD8uc3BsaXQoXCIvXCIpLnBvcCgpLnNwbGl0KFwiLlwiKVswXTtcclxuXHRcdGNvbnN0IGFjdGl2ZXRpdGxlID0gYWN0aXZlVmlldz8uZ2V0RGlzcGxheVRleHQoKTtcclxuXHRcdGNvbnN0IGFjdGl2ZUVsID0gKGFjdGl2ZUxlYWYgYXMgYW55KS5wYXJlbnQuY29udGFpbmVyRWw7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHRhY3RpdmVWaWV3Py5nZXREaXNwbGF5VGV4dCgpICE9PSBcIk5ldyB0YWJcIiAmJlxyXG5cdFx0XHQoIWFjdGl2ZUxlYWZQYXRoIHx8IGFjdGl2ZVRpdGxlUGFydCAhPT0gYWN0aXZldGl0bGUpXHJcblx0XHQpXHJcblx0XHRcdHJldHVybjsgLy8gdG8gYWxsb3dlZCBvcGVuIGxpbmtlZCB2aWV3XHJcblxyXG5cdFx0d29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMoKGxlYWYpID0+IHtcclxuXHRcdFx0Y29uc3QgbGVhZkVsID0gKGxlYWYgYXMgYW55KS5wYXJlbnQuY29udGFpbmVyRWw7XHJcblx0XHRcdGlmIChhY3RpdmVFbCAhPT0gbGVhZkVsKSByZXR1cm47XHJcblx0XHRcdGNvbnN0IGxlYWZTdGF0ZSA9IGxlYWYuZ2V0Vmlld1N0YXRlKCk7XHJcblx0XHRcdGNvbnN0IGxlYWZQYXRoID0gbGVhZlN0YXRlLnN0YXRlLmZpbGU7XHJcblx0XHRcdGNvbnN0IGxlYWZUaXRsZSA9IGxlYWYuZ2V0RGlzcGxheVRleHQoKTtcclxuXHRcdFx0Y29uc3QgbGVhZlRpdGxlUGFydCA9IGxlYWZQYXRoPy5zcGxpdChcIi9cIikucG9wKCkuc3BsaXQoXCIuXCIpWzBdO1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0YWN0aXZlVmlldz8uZ2V0RGlzcGxheVRleHQoKSAhPT0gXCJOZXcgdGFiXCIgJiZcclxuXHRcdFx0XHQoIWxlYWZQYXRoIHx8IGxlYWZUaXRsZVBhcnQgIT09IGxlYWZUaXRsZSlcclxuXHRcdFx0KVxyXG5cdFx0XHRcdHJldHVybjsgLy8gdG8gYWxsb3dlZCBvcGVuIGxpbmtlZCB2aWV3XHJcblxyXG5cdFx0XHRjb25zdCBpc01haW5XaW5kb3dEdXBsaSA9IGxlYWYudmlldy5jb250YWluZXJFbC53aW4gPT0gd2luZG93O1xyXG5cdFx0XHRjb25zdCBpc1NhbWVXaW5kb3dEdXBsaSA9IGxlYWYudmlldy5jb250YWluZXJFbC53aW4gPT0gYWN0aXZlV2luZG93O1xyXG5cdFx0XHRjb25zdCByb290U3BsaXREdXBsaSA9IGxlYWYuZ2V0Um9vdCgpID09IHdvcmtzcGFjZS5yb290U3BsaXQ7XHJcblx0XHRcdGNvbnN0IGNvcnJlY3RQYW5lID1cclxuXHRcdFx0XHQoaXNNYWluV2luZG93RHVwbGkgJiYgcm9vdFNwbGl0RHVwbGkpIHx8ICFpc01haW5XaW5kb3dEdXBsaTtcclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRsZWFmICE9PSBhY3RpdmVMZWFmICYmXHJcblx0XHRcdFx0bGVhZlBhdGggJiZcclxuXHRcdFx0XHRsZWFmUGF0aCA9PT0gYWN0aXZlTGVhZlBhdGggJiZcclxuXHRcdFx0XHQoIWlzTWFpbldpbmRvd0FjdGl2ZSB8fCByb290U3BsaXRBY3RpdmUpICYmXHJcblx0XHRcdFx0Y29ycmVjdFBhbmVcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0aWYgKGJ5V2luZG93ID09PSBcImFsbFwiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNsb3NlRHVwbGljYXRlKGFjdGl2ZUxlYWYsIHdvcmtzcGFjZSwgbGVhZiwgbGVhZlBhdGgpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNvcnJlY3RQYW5lMSA9XHJcblx0XHRcdFx0XHRcdChpc01haW5XaW5kb3dEdXBsaSAmJiBpc01haW5XaW5kb3dBY3RpdmUpIHx8XHJcblx0XHRcdFx0XHRcdCghaXNNYWluV2luZG93QWN0aXZlICYmXHJcblx0XHRcdFx0XHRcdFx0IWlzTWFpbldpbmRvd0R1cGxpICYmXHJcblx0XHRcdFx0XHRcdFx0aXNTYW1lV2luZG93RHVwbGkpO1xyXG5cdFx0XHRcdFx0aWYgKGNvcnJlY3RQYW5lMSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlRHVwbGljYXRlKGFjdGl2ZUxlYWYsIHdvcmtzcGFjZSwgbGVhZiwgbGVhZlBhdGgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdC8vIGVtcHR5IHRhYnNcclxuXHRcdFx0XHRub0VtcHR5VGFicyAmJlxyXG5cdFx0XHRcdGxlYWYgIT09IGFjdGl2ZUxlYWYgJiZcclxuXHRcdFx0XHRsZWFmLnZpZXcuZ2V0RGlzcGxheVRleHQoKSA9PT0gXCJOZXcgdGFiXCIgJiZcclxuXHRcdFx0XHRhY3RpdmVWaWV3Py5nZXREaXNwbGF5VGV4dCgpID09PSBcIk5ldyB0YWJcIiAmJlxyXG5cdFx0XHRcdCghaXNNYWluV2luZG93QWN0aXZlIHx8IHJvb3RTcGxpdEFjdGl2ZSkgJiZcclxuXHRcdFx0XHRjb3JyZWN0UGFuZVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRpZiAoYnlXaW5kb3cgPT09IFwiYWxsXCIpIHtcclxuXHRcdFx0XHRcdGxlYWY/LmRldGFjaCgpOyAvLyB0byBrZWVwIHRoZSBuZXcgTmV3IHRhYlxyXG5cdFx0XHRcdFx0aWYgKGFjdGl2ZUxlYWYpIHdvcmtzcGFjZS5yZXZlYWxMZWFmKGFjdGl2ZUxlYWYpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zdCBjb3JyZWN0UGFuZTEgPVxyXG5cdFx0XHRcdFx0XHQoaXNNYWluV2luZG93RHVwbGkgJiYgaXNNYWluV2luZG93QWN0aXZlKSB8fFxyXG5cdFx0XHRcdFx0XHQoIWlzTWFpbldpbmRvd0FjdGl2ZSAmJlxyXG5cdFx0XHRcdFx0XHRcdCFpc01haW5XaW5kb3dEdXBsaSAmJlxyXG5cdFx0XHRcdFx0XHRcdGlzU2FtZVdpbmRvd0R1cGxpKTtcclxuXHRcdFx0XHRcdGlmIChjb3JyZWN0UGFuZTEpIHtcclxuXHRcdFx0XHRcdFx0bGVhZj8uZGV0YWNoKCk7XHJcblx0XHRcdFx0XHRcdGlmIChhY3RpdmVMZWFmKSB3b3Jrc3BhY2UucmV2ZWFsTGVhZihhY3RpdmVMZWFmKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y2xvc2VEdXBsaWNhdGUoYWN0aXZlTGVhZjogV29ya3NwYWNlTGVhZiwgd29ya3NwYWNlOiBXb3Jrc3BhY2UsIGxlYWY6IFdvcmtzcGFjZUxlYWYsIGxlYWZQYXRoOiBzdHJpbmcpIHtcclxuXHRcdGFjdGl2ZUxlYWY/LmRldGFjaCgpO1xyXG5cdFx0d29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5iZU5vdGlmaWVkKSB7XHJcblx0XHRcdG5ldyBOb3RpY2UoYFwiJHtsZWFmUGF0aH1cIiBhbHJlYWR5IG9wZW5lZGApO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCAiaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBEdXBsaWNhdGVUYWJzIGZyb20gXCJzcmMvbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIER1cGxpY2F0ZVRhYnNTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cdHBsdWdpbjogRHVwbGljYXRlVGFicztcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogRHVwbGljYXRlVGFicykge1xyXG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbChcImgxXCIsIHsgdGV4dDogXCJDbG9zZSBTaW1pbGFyIFRhYnNcIiB9KTtcclxuXHRcdGNvbnN0IGxpbmtUZXh0ID0gY29udGFpbmVyRWwuY3JlYXRlRWwoXCJzcGFuXCIsIHtcclxuXHRcdFx0dGV4dDogXCIgXHVEODNDXHVERjM0XCIsXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IGxpbmtDb250YWluZXIgPSBjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwge1xyXG5cdFx0XHR0ZXh0OiBcIlJlcG9zaXRvcnk6IFx1RDgzQ1x1REYzNCBcIixcclxuXHRcdH0pO1xyXG5cdFx0bGlua0NvbnRhaW5lci5jcmVhdGVFbChcImFcIiwge1xyXG5cdFx0XHR0ZXh0OiBcIjFDMEQvT2JzaWRpYW4tQ2xvc2UtU2ltaWxhci1UYWJzXCIsXHJcblx0XHRcdGhyZWY6IFwiaHR0cHM6Ly9naXRodWIuY29tLzFDMEQvT2JzaWRpYW4tQ2xvc2UtU2ltaWxhci1UYWJzXCIsXHJcblx0XHR9KTtcclxuXHRcdGxpbmtDb250YWluZXIuYXBwZW5kQ2hpbGQobGlua1RleHQpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZShcIkNsb3NlIGJ5IHdpbmRvd1wiKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHRcIlNlbGVjdCB3aGV0aGVyIHRoZSBwbHVnaW4gd2lsbCBvbmx5IGNsb3NlIHNpbWlsYXIgdGFicyB3aXRoaW4gdGhlIHNhbWUgd2luZG93LCBvciB0aHJvdWdob3V0IGFsbCBvcGVuIHdpbmRvd3MuXCJcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XHJcblx0XHRcdFx0ZHJvcGRvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb25zKHtcclxuXHRcdFx0XHRcdFx0Y3VycmVudDogXCJDdXJyZW50IHdpbmRvdyBvbmx5XCIsXHJcblx0XHRcdFx0XHRcdGFsbDogXCJBbGwgd2luZG93c1wiLFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5ieVdpbmRvdylcclxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWU6IFwiYWxsXCIgfCBcImN1cnJlbnRcIikgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5ieVdpbmRvdyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZShcIk5vIGVtcHR5IHRhYnNcIilcclxuXHRcdFx0LnNldERlc2MoXCJBY3RpdmF0ZXMgbm8gc2V2ZXJhbCBlbXB0eSB0YWJzXCIpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xyXG5cdFx0XHRcdHRvZ2dsZVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm5vRW1wdHlUYWJzKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5ub0VtcHR5VGFicyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoXCJUb2dnbGUgQ2xvc2UgU2ltaWxhciBUYWJzXCIpXHJcblx0XHRcdC5zZXREZXNjKFwiRW5hYmxlL2Rpc2FibGUgQ2xvc2UgU2ltaWxhciBUYWJzXCIpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xyXG5cdFx0XHRcdHRvZ2dsZVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRvZ2dsZUNsb3NlU2ltaWxhclRhYnMpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRvZ2dsZUNsb3NlU2ltaWxhclRhYnMgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKFwiQmUgTm90aWZpZWRcIilcclxuXHRcdFx0LnNldERlc2MoXCJvcGVuIGEgbm90aWZpY2F0aW9uIHBvcCB1cCB3aGVuIGEgc2ltaWxhciB0YWIgYWxyZWFkeSBleGlzdHNcIilcclxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XHJcblx0XHRcdFx0dG9nZ2xlXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYmVOb3RpZmllZClcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYmVOb3RpZmllZCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcdFx0XHJcblx0XHRcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7XHJcblx0XHRcdHRleHQ6ICdDaGVjayBcIkNsb3NlIFNpbWlsYXIgVGFicyBwYXJhbWV0ZXJzXCIgaW4gQ29tbWFuZCBwYWxldHRlIHRvIGRpcmVjdGx5IGNoYW5nZSB0aGVzZSBwYXJhbWV0ZXJzLCBmcm9tIHRoZSBlZGl0b3InLFxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBEdXBsaWNhdGVUYWJzIGZyb20gXCIuL21haW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEdXBsaWNhdGVUYWJzTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0cGx1Z2luOiBEdXBsaWNhdGVUYWJzO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBEdXBsaWNhdGVUYWJzKSB7XHJcblx0XHRzdXBlcihhcHApO1xyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIkNsb3NlIFNpbWlsYXIgVGFicyBQYXJhbWV0ZXJzXCIgfSk7XHJcblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXHJcblx0XHRcdC5zZXROYW1lKFwiVG9nZ2xlIENsb3NlIFNpbWlsYXIgVGFic1wiKVxyXG5cdFx0XHQuc2V0RGVzYyhcIkVuYWJsZS9kaXNhYmxlIENsb3NlIFNpbWlsYXIgVGFic1wiKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcclxuXHRcdFx0XHR0b2dnbGVcclxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIHRvZ2dsZSBmb3IgdGhlIHNldHRpbmdcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2dnbGVDbG9zZVNpbWlsYXJUYWJzKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIHBsdWdpbiBzZXR0aW5nIHdoZW4gdGhlIHRvZ2dsZSBpcyBjaGFuZ2VkXHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRvZ2dsZUNsb3NlU2ltaWxhclRhYnMgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxyXG5cdFx0XHQuc2V0TmFtZShcIkNsb3NlIGJ5IHdpbmRvd1wiKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHRcIlNlbGVjdCB3aGV0aGVyIHRoZSBwbHVnaW4gd2lsbCBvbmx5IGNsb3NlIHNpbWlsYXIgdGFicyB3aXRoaW4gdGhlIHNhbWUgd2luZG93LCBvciB0aHJvdWdob3V0IGFsbCBvcGVuIHdpbmRvd3MuXCJcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XHJcblx0XHRcdFx0ZHJvcGRvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb25zKHtcclxuXHRcdFx0XHRcdFx0Y3VycmVudDogXCJDdXJyZW50IHdpbmRvdyBvbmx5XCIsXHJcblx0XHRcdFx0XHRcdGFsbDogXCJBbGwgd2luZG93c1wiLFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5ieVdpbmRvdylcclxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWU6IFwiYWxsXCIgfCBcImN1cnJlbnRcIikgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5ieVdpbmRvdyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LnNldE5hbWUoXCJObyBlbXB0eSB0YWJzXCIpXHJcblx0XHRcdC5zZXREZXNjKFwiQWN0aXZhdGVzIG5vIHNldmVyYWwgZW1wdHkgdGFic1wiKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcclxuXHRcdFx0XHR0b2dnbGVcclxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIHRvZ2dsZSBmb3IgdGhlIHNldHRpbmdcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5ub0VtcHR5VGFicylcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBwbHVnaW4gc2V0dGluZyB3aGVuIHRoZSB0b2dnbGUgaXMgY2hhbmdlZFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5ub0VtcHR5VGFicyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LnNldE5hbWUoXCJCZSBOb3RpZmllZFwiKVxyXG5cdFx0XHQuc2V0RGVzYyhcIm9wZW4gYSBub3RpZmljYXRpb24gcG9wIHVwIHdoZW4gYSBzaW1pbGFyIHRhYiBhbHJlYWR5IGV4aXN0c1wiKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcclxuXHRcdFx0XHR0b2dnbGVcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5iZU5vdGlmaWVkKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5iZU5vdGlmaWVkID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1x0XHJcblx0fVxyXG5cclxuXHRvbkNsb3NlKCkge1xyXG5cdFx0Y29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLG1CQUF5RDs7O0FDQXpELHNCQUErQztBQUd4QyxJQUFNLDJCQUFOLGNBQXVDLGlDQUFpQjtBQUFBLEVBRzlELFlBQVksS0FBVSxRQUF1QjtBQUM1QyxVQUFNLEtBQUssTUFBTTtBQUNqQixTQUFLLFNBQVM7QUFBQSxFQUNmO0FBQUEsRUFFQSxVQUFnQjtBQUNmLFVBQU0sRUFBRSxZQUFZLElBQUk7QUFDeEIsZ0JBQVksTUFBTTtBQUNsQixnQkFBWSxTQUFTLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELFVBQU0sV0FBVyxZQUFZLFNBQVMsUUFBUTtBQUFBLE1BQzdDLE1BQU07QUFBQSxJQUNQLENBQUM7QUFDRCxVQUFNLGdCQUFnQixZQUFZLFNBQVMsS0FBSztBQUFBLE1BQy9DLE1BQU07QUFBQSxJQUNQLENBQUM7QUFDRCxrQkFBYyxTQUFTLEtBQUs7QUFBQSxNQUMzQixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUCxDQUFDO0FBQ0Qsa0JBQWMsWUFBWSxRQUFRO0FBRWxD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
