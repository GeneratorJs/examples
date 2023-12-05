const blockCheck = [
  {
    pattern: /^\s*```/im,
    type: 'code',
    blockpattern: /^\s*```([^\n]*)\n([^`]*)```$/im,
  },
  {
    pattern:/^\s*<(?!\/)([^>\s]*)[^>]*>.*?<\/\1>\s*$/mis,
    type: 'html',
    blockpattern: /^\s*<(?!\/)([^>\s]*)[^>]*>.*?<\/\1>\s*$/mis,
  },
  {
    pattern:/<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^>]*?>/mi,
    type: 'htmlselfclosing',
    blockpattern: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^>]*?>/mi,
  },
  {
    pattern: /^\s*(\w[^\n]*)\n(-|=){4,}/gim,
    type: 'heading',
    blockpattern: /^\s*(\w[^\n]*)\n(-|=){4,}/gim,
  },
  {
    pattern: /^\s*#{1,6}\s+([^\n]*)$/im,
    type: 'heading',
    blockpattern: /^\s*#{1,6}\s+([^\n]*)$/im,
  },
  {
    pattern: /^\s*-\s+\[(\s+|[xX*])\]\s+/im,
    type: 'checkbox',
    blockpattern: /^\s*-\s+\[(\s+|[xX*])\]\s+([^\n]*)$/gim,
  },
  {
    pattern: /^\s*(\*|\d+\.|-)\s+/im,
    type: 'list',
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
    blockpattern:/^\n+\-{3,}$/im,
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
  },  {
    pattern: /^\s*\\\[.*(?<=(\\]))\s*$/im,
    type: 'math1',
    blockpattern: /^\s*\\\[(.*)(?<=(\\]))\s*$/im,
  },
  {
    pattern: /^\s*([\w\d]+|(\*|_){1,3}[\w\d]+)[^\n]+$/im,
    type: 'paragraph',
    blockpattern: /^\s*((\*|_){1,3}[\w\d]+|[\w\d]+)[^\n]+$/im,
  },
  // {
  //   pattern: /^.*\n*$/mi,
  //   type: 'unknown',
  //   blockpattern: /^.*\n*$/mi
  // }
  
];

const checkblocktype = (md, i = 0) => {
  for (var i = 0; i <= md.length; i++) {
    
    var teststr = md.substr (i, md.length);
    if (i == 0 || teststr[i-1] == '\n') {
        // log(i)
        log(`Checking: ${teststr}` );
        for (var blockindex=0;blockindex<blockCheck.length;blockindex++) {  

            var block = blockCheck[blockindex];
            // log(block.type)
            // log(`Comparing with ${block.type}`)

            var compare = teststr.match (block.pattern);
            if (compare != null && compare.length > 0) {
              var match="";
                var match = teststr.match (block.blockpattern);
                if (match!=null && match.length > 0) {
                    var matchlength = match[0].length;
                    log ("Detected "+block.type+"\nContent:\n "+ match[0]+"\n\n");
                    i = i + matchlength-1;
                 break;
                }
            }
        }
      ;
    }
    
  }
  return {type:block.type,content:match}
};

const parsemdbeta = (mdinput, callback) => {
  var mdArray=mdinput.split(/\n{2,}/gmi)
  // md = md.substr (0, md.length);
  var lex=[]
  mdArray.forEach(md => {
    var match=checkblocktype (md);
    lex.push(match)

    
  });
  console.log(JSON.parse(JSON.stringify(lex)))
//   if (callback){
//     callback (html);
// }
  return lex;
};
