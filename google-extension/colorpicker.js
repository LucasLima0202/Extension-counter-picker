function createColorPicker() {
    var colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.position = 'fixed';
    colorPicker.style.top = '10px';
    colorPicker.style.left = '10px';
    document.body.appendChild(colorPicker);
  
    colorPicker.addEventListener('input', function() {
      var selectedColor = colorPicker.value;
      console.log('Cor selecionada: #', selectedColor);
    });
  }
  
  createColorPicker();