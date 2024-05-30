'use strict';

const testDomain = 'iana.org';
const RULE_ID = 999999;
const RULE_PRIORITY = 1000;

try {
    if (typeof browser === undefined || 
        browser === null ||
        (!(browser instanceof Object) ))
        //Object.getPrototypeOf(browser) !== browser.prototype) 
        { var browser = chrome; }
    }
catch(e) { var browser = chrome; console.log("Error defining 'browser':", e); }

const isGecko = browser.runtime.getURL('').startsWith('moz-extension://');
const isSafari = browser.runtime.getURL('').startsWith('safari-web-extension://');

function performsAsyncOperation(callback) {
    return new Promise( (resolve) => {
        resolve(callback());
    });
}

function execRuntimeSendMessages(obj) {
    return new Promise( (resolve) => {
        browser.runtime.sendMessage(obj, function(data) {
            if (browser.runtime.lastError) {}
            resolve(data);
        });
    });
}

function getRootDomain (sURL) {
	let sRootDomain = '';
	try {
		sRootDomain = sURL.match(/^(?:.*?:\/\/)?.*?(?<root>[\w\-]*(?:\.\w{2,}|\.\w{2}\.\w{2}))(?:[\/?#:]|$)/).groups.root;
	} catch(ignore) {}
	sRootDomain = sRootDomain.toLowerCase();
	return sRootDomain;
};

function fetchJSON(path) {
    return fetch(`${path}.json`).then(response =>
        response.json()
    ).catch(reason => {
        console.info(reason);
    });
}