

export function normalizeText(text) {

    //remove special characters
    text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9.-])/g, '');
  
    //normalize Arabic
    text = text.replace(/(آ|إ|أ)/g, 'ا');
    text = text.replace(/(ة)/g, 'ه');
    text = text.replace(/(ئ|ؤ)/g, 'ء')
    text = text.replace(/(ى)/g, 'ي');
  
    //convert arabic numerals to english counterparts.
    var starter = 0x660;
    for (var i = 0; i < 10; i++) {
      text = text.replaceAll(String.fromCharCode(48 + i), String.fromCharCode(starter + i));
    }
  
    return text;
  }

  // text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
