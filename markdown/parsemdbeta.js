const blockCheck = [
  {
    pattern: /^\s*```\w*/i,
    type: 'code',
    blockpattern: /^\s*```([^\n]*)\n([^`]*)```$/m,
    renderpattern:/`{3}([^\n]*)\n([^`]*)`{3}/gmi
  },
  {
    //   pattern: /^\s*<(?!\/)([^>\s]*)[^>]*>.*?<\/\1>\s*$/mig,
    pattern: /^\s*<(?!\/)([^>\s]*)[^>]*>/i,
    type: 'html',
    blockpattern: /^\s*<(?!\/)([^>\s]*)[^>]*>.*?<\/\1>\s*$/mis,
    renderpattern: /^\s*<(?!\/)([^>\s]*)[^>]*>.*?<\/\1>\s*$/gmis,
  },
  {
    pattern: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^>]*?>/mi,
    type: 'htmlselfclosing',
    blockpattern: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^>]*?>/mi,
    renderpattern: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^>]*?>/gmi,
  },
  {
    pattern: /^\s*(\w[^\n]*)\n(-|=){4,}/im,
    type: 'headinglined',
    blockpattern: /^\s*(\w[^\n]*)\n(-|=){4,}/im,
    renderpattern:/^\s*(\w[^\n]*)\n((-|=){4,})/img,
  },
  {
    pattern: /^\s*#{1,6}\s+([^\n]*)$/im,
    type: 'heading',
    blockpattern: /^\s*#{1,6}\s+([^\n]*)$/im,
    renderpattern: /^\s*([#]+)\s+([^\n]*)$/gmi,
  },
  {
    pattern: /^\s*-\s+\[(\s+|[xX*])\]\s+/im,
    type: 'checkbox',
    blockpattern: /^\s*-\s+\[(\s+|[xX*])\]\s+([^\n]*)$/im,
  },
  {
    pattern: /^(\*|\d+\.|-)\s+/im,
    type: 'list',
    blockpattern: /^\s*(\*|\d+\.|-)\s+([^\n]*)$/im,
  },
  {
    pattern: /^\s*(\*|\d+\.|-)\s+/im,
    type: 'sublist',
    blockpattern: /^\s*(\*|\d+\.|-)\s+([^\n]*)$/im,
  },
  {
    pattern: /\[[^\]]*\]:\s+.*$/mi,
    type: 'reference',
    blockpattern: /\[[^\]]*\]:\s+.*$/mi,
  },
  {
    pattern: /^\s*>\s+([^\n]*)$/im,
    type: 'blockquote',
    blockpattern: /^\s*>\s+([^\n]*)$/im,
  },
  {
    pattern: /^\n+\-{3,}$/im,
    type: 'hr',
    blockpattern: /^\n+\-{3,}$/im,
  },
  {
    pattern: /^\s*\|/im,
    type: 'table',
    blockpattern: /^\|(.|\n)*?\|\s*\n+$/mi,
  },
  {
    pattern: /^\s*\${2}.*(?<=\$\$)\s*$/im,
    type: 'math2',
    blockpattern: /^\s*\${2}(.*)(?<=\$\$)\s*$/im,
  }, {
    pattern: /^\s*\\\[.*(?<=(\\]))\s*$/im,
    type: 'math1',
    blockpattern: /^\s*\\\[(.*)(?<=(\\]))\s*$/im,
  },
  {
    pattern: /^\s*([\w\d]+|(\*|_){1,3}[\w\d]+)[^\n]+$/im,
    type: 'paragraph',
    blockpattern: /^\s*((\*|_){1,3}[\w\d]+|[\w\d]+)[^\n]+$/im,
  },
  {
    pattern: /^\s*$/,
    type: 'empty',
    blockpattern: /^\s*$/,
  },
  // {
  //   pattern: /^.*\n*$/mi,
  //   type: 'unknown',
  //   blockpattern: /^.*\n*$/mi
  // }

];



// takes teststring and compare starting  with blockCheck sequentially and return first match 
const checkBlockType = (mdinput) => {
  // log(`\nTestString: ${mdinput}`)


  for(var i = 0; i<blockCheck.length; i++){
  var block = blockCheck[i];
    var compare = mdinput.match(block.pattern);
    if (compare != null && compare.length > 0) {
      var match = "";
      var match = mdinput.match(block.blockpattern);
      if (match != null && match.length > 0) {
        // log("Detected " + block.type + "\nContent:\n " + match[0] + "\n\n");
        return { type: block.type, content: match[0]}
      }
    }
  }

}






const parsemdbeta = (mdinput, callback) => {
  
  //check mdinput with checkblocktype then return match and remove matched part from mdinput and repeat till mdinput length is zero
  var lex = []

  function checkPartialBlockType(testmdinput) {
    matchData = checkBlockType(testmdinput);
    return matchData;
    
  }

  while (mdinput.length > 0) {
    var matchData = checkPartialBlockType(mdinput);
    var unprocessed = mdinput.substr(matchData.content.length);
    mdinput = unprocessed;
    var match = matchData.content;
    if (match.length > 0) {
      lex.push(matchData)
    }
  }
  console.log(JSON.parse(JSON.stringify(lex)))

  function verb(input){
    var E = document.createElement('div');
    E.innerHTML = input;

    return E.innerHTML.toString().replaceAll("&", '&amp;').replaceAll('</', '&lt;&#47;').replaceAll("<", "&lt;").replaceAll(">", '&gt;')
    // return input
  };
  function render(content,pattern,type) {
    var renderedOutput = "";
    if (type == 'code') {
      var match1 = content.matchAll(pattern)
      var matchList = Array.from(match1)
      var renderedOutput = "";
      matchList.forEach(p => {
        var printcode = verb(p[2])
          renderedOutput = `\n<pre><code class="${p[1]}, language-${p[1]},code-block">\n${printcode}</code></pre>`
      });
    }
    else if (type == 'html') {
      var match1 = content.matchAll(pattern)
      var matchList = Array.from(match1)
      var renderedOutput = "";
      matchList.forEach(p => {
        renderedOutput = `${p[0]}`
      });
    }
    else if (type == 'htmlselfclosing') {
      // log("htmlselfclosing")
      var match1 = content.matchAll(pattern)
      // log(match1)
      var matchList = Array.from(match1)
      // log(matchList)
      var renderedOutput = "";
      matchList.forEach(p => {
        renderedOutput = `${p[0]}`
      });
    }
    else if (type == 'heading') {
      var match1 = content.matchAll(pattern)
      var matchList = Array.from(match1)
      // log(matchList)
      var renderedOutput = "";
      matchList.forEach(p => {
        renderedOutput = `<h${p[1].length}>${p[2]}</h${p[1].length}>`
      });
    }
    else if (type == 'headinglined') {
      var match1 = content.matchAll(pattern)
      // log(content)
      var matchList = Array.from(match1)
      // log(matchList)
      var renderedOutput = "";
      matchList.forEach(p => {
        if (p[2].includes("=")) { htag="2" } else { htag="1" }
        renderedOutput = `<h${htag}>${p[1]}</h${htag}>\n`
      });
    }

    
    return renderedOutput;
  
  }


  //render lex to html
  function Stage2renderLexBlocks(lex, callback){
    for (var i = 0; i < lex.length; i++) {
      var block = lex[i];
      var type = block.type;
      var content = block.content;
      var pattern = blockCheck.find(o => o.type === type).renderpattern;
      var rendered = render(content,pattern,type)
      lex[i].rendered = rendered;

      //update preview
      
    }
    return lex;
  }

  lex = Stage2renderLexBlocks(lex)
  // log(lex)


  //render lex to html
  // function Stage3renderLexBlocks(lex, callback){
  //   for (var i = 0; i < lex.length; i++) {
  //     var block = lex[i];
  //     var type = block.type;
  //     var content = block.content;
  //     var pattern = blockCheck.find(o => o.type === type).renderpattern;
  //     var rendered = render(content,pattern,type)
  //     lex[i].rendered = rendered;

      
  //   }
  //   return lex;
  // }

  // lex = Stage3renderLexBlocks(lex)


  // combine html and render
  function combineRendered(lex, callback){
    var joinedhtml = ""
    for (var i = 0; i < lex.length; i++) {
      joinedhtml += lex[i].rendered
    }
    return joinedhtml;
  }

  var renderedFinal = combineRendered(lex)


  //temp check
  // append(`#preview-code`, renderedFinal)


  callback(renderedFinal)
  return renderedFinal;

  
}






