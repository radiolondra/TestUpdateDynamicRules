
'use strict';

async function clearDynamicRules() {
    $('#cover-spin').show(0);
    
    await execRuntimeSendMessages({action: 'clear-rules'});
    
    $('#cover-spin').hide(0);
}

async function setDynamicRules() {
    $('#cover-spin').show(0);

    await execRuntimeSendMessages({action: 'set-rules'});
    
    $('#cover-spin').hide(0);
}

// ---------------------------------------------------------
// DOM
// ---------------------------------------------------------

$('#clearrules').click(function(e) {
    clearDynamicRules();
});

$('#setrules').click(function(e) {
    setDynamicRules();
});
