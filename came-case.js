function processData(input) {
    //Enter your code here
    let inputArray = input.split(/\r?\n/);
    for (let i = 0; i < inputArray.length; i++) {
      let controls = splitToArray(inputArray[i], ';');
      let sentence = formatStringWithType(controls[2], controls[1]);
      controls = splitOrJoinWords(sentence, controls[0], controls[1]);
      console.log(controls);
    }
  }
  
  const splitToArray = (word, splitter) => {
    return word.split(splitter).filter((element) => element);
  };
  
  const classCase = (word) => {
    let arr = splitToArray(word, ' ');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = `${arr[i][0].toUpperCase()}${arr[i].slice(1)}`;
    }
    return arr.map((element) => element.trim()).join(' ');
  };
  
  const methodCase = (word) => {
    let arr = splitToArray(word, ' ');
    for (let i = 1; i < arr.length; i++) {
      arr[i] = `${arr[i][0].toUpperCase()}${arr[i].slice(1)}`;
    }
    return arr.map((element) => element.trim()).join(' ');
  };
  
  const splitOrJoinWords = (sentence, type, action) => {
    let finalSentence = '';
  
    switch (type) {
      case 'S':
        let subSent = sentence
          .split(/(?=[A-Z])/)
          .map((element) => element.trim())
          .join(' ');
        if (action === 'V' || action === 'C' || action === 'M') {
          subSent = subSent.toLowerCase();
        }
        finalSentence = subSent;
        break;
      case 'C':
        let subSent2 = sentence
          .trim()
          .split(' ')
          .map((element) => element.trim())
          .join('');
        // if (action === 'V') {
        //     subSent2 = subSent2.toLowerCase();
        // }
        finalSentence = subSent2;
        break;
      default:
        finalSentence = sentence;
        break;
    }
    return finalSentence;
  };
  
  const formatStringWithType = (word, type) => {
    let finalString = '';
    switch (type) {
      case 'M':
        let lower = methodCase(
          word
            .split(/(?=[A-Z])/)
            .join(' ')
            .toLowerCase()
        );
        finalString = lower.includes('()')
          ? lower.replace(/[\])}[{(]/g, '')
          : `${lower}()`;
        break;
      case 'C':
        finalString = classCase(word);
        break;
      case 'V':
        finalString = methodCase(word);
        break;
      default:
        finalString = word;
        break;
    }
    return finalString;
  };
  
  let input = `C;V;can of coke\r\nS;M;sweatTea()\r\nS;V;epsonPrinter\r\nC;M;santa claus\r\nC;C;mirror`;
  processData(input);

  // Question link
  // https://www.hackerrank.com/challenges/three-month-preparation-kit-camel-case/problem

  