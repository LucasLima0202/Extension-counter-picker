chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "countCharacters",
    title: "Contar caracteres",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "colorPicker",
    title: "Color Picker",
    contexts: ["all"]
  });
})


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "countCharacters" && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: contarCaracteres
    }).then((results) => {
      for (const frameResult of results) {
        console.log('Script result:', frameResult.result);
      }
    }).catch(err => console.error('Erro ao executar o script:', err));
  } else if (info.menuItemId === "colorPicker" && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["colorpicker.js"]
    }).then((results) => {
      for (const frameResult of results) {
        console.log('Script result', frameResult.result);
      }
    }).catch(err => console.error('Error executing the script:', err));
  }
});

function contarCaracteres() {
  let textoSelecionado = window.getSelection().toString().replace(/\s/g, '');
  if (textoSelecionado.length > 0) {
    alert(`Number of selected characters (without spaces): ${textoSelecionado.length}`);
  } else {
    alert('No text selected');
  }
}

