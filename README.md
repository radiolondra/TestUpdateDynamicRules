# TestUpdateDynamicRules

### **Testing DNR API performances on Safari, Chrome and Firefox**

This is the complete XCode project of a browser extension created to **test the DNR updateDynamicRules API** on Safari (MacOS).


To test it on other browsers (Chromium/Firefox for Windows), copy the contents of the `TestUpdateDynamicRules/TestUpdateDynamicRules Extension/Resources/` folder to any new folder, copy the right `manifest.json` file from `/!!Platforms` to the root of the new folder and install the extension in the browser of your choice.

#### **ANATOMY**

The project uses 2 json files containing static rules, enabled by default in the manifest file. These static rules are automatically installed in the browser when the extension is installed.
Using the extension popup it is possible to add/remove just one very simple dynamic rule in the browser, a rule that acts on a predefined test domain (https://iana.org).


What we want to measure is the time it takes for each browser to add/remove that one dynamic rule.

Results are logged and visible in the service worker console (devTools/Inspector Web/...). If you want to see the effect of the dynamic rule, open https://iana.org in a browser tab.

#### **TEST RESULTS**

**updateDynamicRules**
[declarativeNetRequest.updateDynamicRules - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest/updateDynamicRules)

**Safari**: from 6000 to 8000 MILLISECONDS (6/8 seconds!) **<<<<<<<<<**

**Chrome**: from 5 to 6 MILLISECONDS

**Firefox**: from 5 to 7 MILLISECONDS
