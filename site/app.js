async function sendMessage(channel, data = "") {
    let response = await new Promise(function (resolve, reject) {
        let responseFunc = function (event, packet) {
            ipcRenderer.removeAllListeners(channel + "-response");
            // console.log(`got response on: "${channel}-response":`, packet);
            if (packet.error) {
                console.error("error:", packet);
                reject(packet);
            }
            resolve(packet);
        };
        ipcRenderer.on(channel + "-response", responseFunc);
        // console.log(`sending data on: "${channel}"`, data);
        ipcRenderer.postMessage(channel, data);
    });
    return response;
}

document.querySelectorAll(".nav-links-target").forEach(e => {
    e.innerHTML += `<a class="mdl-navigation__link" href="javascript:window.location.reload(true)">Reload</a>`;
});