const blockCheck = [
  {
    pattern: /^\s*</im,
    type: 'html',
    blockpattern: /^\s*</im,
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
    pattern: /^\s*(\*|\d+\.|-)\s+/im,
    type: 'list',
    blockpattern: /^\s*(\*|\d+\.|-)\s+([^\n]*)$/im,
  },
  {
    pattern: /^\s*([\w\d]+|(\*|_){1,3}[\w\d]+)[^\n]+$/im,
    type: 'paragraph',
    // blockpattern: /^\s*([\w\d]+|(\*|_){1,3}[\w\d]+)[^\n]+$/im,
    blockpattern: /^\s*((\*|_){1,3}[\w\d]+|[\w\d]+)[^\n]+$/img,
  },
  {
    pattern: /^\s*-\s+\[(\s+|[xX*])\]\s+/im,
    type: 'checkbox',
    blockpattern: /^\s*-\s+\[(\s+|[xX*])\]\s+([^\n]*)$/gim,
  },

 
  {
    pattern: /^\s*>\s+([^\n]*)$/im,
    type: 'blockquote',
    pattern: /^\s*>\s+([^\n]*)$/im,
  },
  {
    pattern: /^\n+\-{3,}$/im,
    type: 'hr',
  },
  {
    pattern: /^\s*```/im,
    type: 'code',
    blockpattern: /^\s*```([^\n]*)\n([^`]*)```$/gim,
  },
  {
    pattern: /^\s*\|/im,
    type: 'table',
    blockpattern: /^\s*\|/im,
  },
  
];

const checkblocktype = (md, i = 0) => {
  // log(md)
  for (var i = 0; i <= md.length; i++) {
    
    var teststr = md.substr (i, md.length);
    if (i == 0 || teststr[i-1] == '\n') {
        log(i)
        log("Checking: " + md.substr (i, 20));
        for (var blockindex=0;blockindex<blockCheck.length;blockindex++) {  
            var block = blockCheck[blockindex];
            // log(block.type)
        

            var compare = teststr.match (block.pattern);
            if (compare != null && compare.length > 0) {
                var match="";
                var match = teststr.match (block.blockpattern);
                if (match.length > 0) {
                    var matchlength = match[0].length;
                    log ("Matched "+block.type+" : "+ match[0]);
                    i = i + match[0].length-1;
                    
                 break;
                }
            }
        }
      ;
    }
  }
};

const parsemdbeta = (md, callback) => {
  md = md.substr (0, md.length);
  var html = md;
  checkblocktype (md);
  callback (html);
  return html;
};
