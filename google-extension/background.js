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
        console.log('Resultado do script:', frameResult.result);
      }
    }).catch(err => console.error('Erro ao executar o script:', err));
  } else if (info.menuItemId === "colorPicker" && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["colorpicker.js"]
    }).then((results) => {
      for (const frameResult of results) {
        console.log('Resultado do script:', frameResult.result);
      }
    }).catch(err => console.error('Erro ao executar o script:', err));
  }
});

function contarCaracteres() {
  let textoSelecionado = window.getSelection().toString().replace(/\s/g, '');
  if (textoSelecionado.length > 0) {
    alert(`Número de caracteres selecionados (sem espaços): ${textoSelecionado.length}`);
  } else {
    alert('Nenhum texto selecionado');
  }
}

