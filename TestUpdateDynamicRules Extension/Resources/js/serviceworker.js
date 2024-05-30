'use strict';

const manifest = chrome.runtime.getManifest();

if (isManifestFirefoxLike() === false) {
    importScripts("commonscript.js");
}


// MSG Listener
browser.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    switch(request.action) {
        case 'clear-rules':
            performsAsyncOperation( async function callback() {
                await removeDynamicRules();
                refreshTestPage();
                sendResponse();
            });
        break;

        case 'set-rules':
            performsAsyncOperation( async function callback() {
                await setDynamicRules();
                refreshTestPage();
                sendResponse();
            });
        break;
    }

    return true;
});


start();
// ------------------------------------------
// START
// ------------------------------------------

async function start() {
    // cleanup rules at start
    await removeDynamicRules();
}

async function refreshTestPage() {
    const tabs = await browser.tabs.query({currentWindow: true});
    if (tabs) {
        for (const tab of tabs) {
            if (getRootDomain(tab.url) == testDomain) {
                browser.tabs.update(tab.id, {url: tab.url});
            }
        }
    }
}

// Remove all dynamic rules
async function removeDynamicRules() {
    // Measure getDynamicRules API performance
    var t0 = performance.now();
    const oldRules = await browser.declarativeNetRequest.getDynamicRules();
    console.log(`[in removeDynamicRules()] - dnr.getDynamicRules API found ${Object.keys(oldRules).length} active rule(s) in ${(performance.now()-t0).toFixed(2)} ms`);

    t0 = performance.now();
    await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRules.map(rule => rule.id),
    });
    console.log(`[in removeDynamicRules()] - dnr.updateDynamicRules API removed ${Object.keys(oldRules).length} active rule(s) in ${(performance.now()-t0).toFixed(2)} ms`);
}

 async function setDynamicRules() {
     var t0 = performance.now();
     if (isSafari) {
         await browser.declarativeNetRequest.updateDynamicRules({
             removeRuleIds: [RULE_ID],
             addRules:
                 [
                     {
                        id: RULE_ID,
                        priority: RULE_PRIORITY,
                        action: {
                         type: "block"
                        },
                         condition: {
                             urlFilter: `||${testDomain}`,
                         }
                     }
                 ]
             });
     } else {
         await browser.declarativeNetRequest.updateDynamicRules({
             removeRuleIds: [RULE_ID],
             addRules:
                 [
                     {
                        id: RULE_ID,
                        priority: RULE_PRIORITY,
                        action: {
                         type: "block"
                        },
                         condition: {
                             //urlFilter: `||${testDomain}`,
                             requestDomains: [`${testDomain}`]
                         }
                     }
                 ]
             });
     }

     console.log(`[in setDynamicRules()] - dnr.updateDynamicRules API set rule(s) in ${(performance.now()-t0).toFixed(2)} ms`);
 }

function isManifestFirefoxLike() {
    try {
        if (manifest.background.scripts) {
            return true;
        }
        return false;
    } catch(e) {
        return false;
    }
}

// --------------------------------------------------------------------------------------
