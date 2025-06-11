var blockPattern = {
  code:/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
  // html1:/^\s*<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
  html1:/^<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
  html2:/<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^\>]*?>\s*\n*/i,
  // heading1: /^\s*\#{1,6}\s+([^\n]*)[\s\n]*/i,
  // heading2: /^\s*(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
  heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  block:/^^\s*>\s+([^\n]*)[\s\n]*/i,
  checklist:/^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
  table:/^\s*(?:^\s*\|.*\|\s*\n?)+/m,
  list:/^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
  reference:/^\n+\-{3,}$/im,
  // paragraph:/^\s*[^\n]+(\s|\n)*/im,
  paragraph:/^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,
  empty:/^\s*[\s\n]*/m,
  unknown:/^\s*.*\n*$/mi
}


var checkSequence = "code,html1,html2,heading1,heading2,block,checklist,list,reference,table,paragraph,empty,unknown".split(",")

// var checkSequence = "code,html1,html2,heading1,heading2,block,checklist,list,reference,table,tab,paragraph,empty,unknown".split(",")

//identify blocks in sequence 
// code,html,table,checkbox,list,blockquote,tab,else paragraph
// takes teststring and compare starting  with blockCheck sequentially and return first match 
const checkBlockTypeStage1 = (mdinput) => {

  function matchMarkdownBlock(text) {
    for (const type of checkSequence) {
      const regex = blockPattern[type];
      const match = text.match(regex);
      if (match && match.index === 0) { // Ensure match starts at beginning
        return { type, match: match[0],unprocessed: text.slice(match[0].length) };
      }
    }
    return { type: "unknown", match: "", unprocessed: text }; // Return unknown if no match found
  }


  
    console.log(`matching: ${mdinput.substr(0, 10)}`)
  for(var i = 0; i<=checkSequence.length; i++){
    var type = checkSequence[i];
    var pattern = blockPattern[type];
    res = matchMarkdownBlock(mdinput);
    if (pattern == null || pattern == undefined ){
      console.log(`Pattern for ${i+1 } ${type} not found`)
      continue;
    }

    // console.log(`matching: ${mdinput.substr(0, 10)} \nwith ${type}`)

    // var match = mdinput.match(pattern);
    // if (match != null && match.length > 0) {
    //     var content = match[0]
    //     var contentLength = content.length
    //     var unprocessed = mdinput.substr(contentLength,mdinput.length)
    //     console.log("MATCHED:",type,content)
    //     console.log("\n\n")
    //     var res = [type,content,unprocessed]
    //     break
    // }   
    
  }
  return res
}






const parsemdbeta = (mdinput, callback) => {
  // mdinput = `${mdinput}\n`

  var checkboxno = grab("input").length
  
  //check mdinput with checkblocktype then return match and remove matched part from mdinput and repeat till mdinput length is zero
  var lex = []



  // identify block type and content
  while (mdinput.length > 0) {
    var res = checkBlockTypeStage1(mdinput);
    if (res != null){
      var type = res.type;
      var content = res.match;
      var unprocessed = res.unprocessed;


      if (content.length > 0) {
        
        mdinput = unprocessed;
        lex.push({
          type:type,
          content:content,
          })
      }
    }
  }

  // lex = lex.filter(o => o.type !== "empty" && o.type !== "unknown")
  lex = lex.filter(o => o.type !== "empty")
  console.log(JSON.parse(JSON.stringify(lex)))

  // function verb(input){
  //   var E = document.createElement('div');
  //   E.innerHTML = input;
  //   return E.innerHTML.toString().replaceAll("&", '&amp;').replaceAll('</', '&lt;&#47;').replaceAll("<", "&lt;").replaceAll(">", '&gt;')
  // };


  // function render(content,pattern,type) {
  //   var renderedOutput = "";
  
  //   //1. code
  //   if (type == 'code') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var printcode = verb(p[2])
  //         renderedOutput = `\n<pre><code class="${p[1]}, language-${p[1]},code-block">\n${printcode}</code></pre>`
  //     });
  //   }
   
  //   //2. html
  //   else if (type == 'html') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `${p[0]}`
  //     });
  //   }
   
  //   //3. htmlselfclosing
  //   else if (type == 'htmlselfclosing') {
  //     // log("htmlselfclosing")
  //     var match1 = content.matchAll(pattern)
  //     // log(match1)
  //     var matchList = Array.from(match1)
  //     // log(matchList)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `${p[0]}`
  //     });
  //   }
   
  //   //4. heading
  //   else if (type == 'heading') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     // log(matchList)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<h${p[1].length}>${p[2]}</h${p[1].length}>`
  //     });
  //   }
    
  //   //5. headinglined
  //   else if (type == 'headinglined') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       if (p[1].includes("=")) { htag="2" } else { htag="1" }
  //       renderedOutput = `<h${htag}>${p[1]}</h${htag}>`
  //     });
  //   }  
   
  //   //6. reference
  //   else if (type == 'reference') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<p><a href="${p[0].replace(/^\[[^\]]*\]:\s+/,"")}" target="_blank">${p[0].replace(/^\[[^\]]*\]:\s+/,"")}</a></p>`       
  //     });
  //   }
   
  //   //7. blockquote
  //   else if (type == 'blockquote') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       // log(p[1])
  //       renderedOutput = `<blockquote>${p[1]}</blockquote>`       
  //     });
  //   }
   
  //   //8. subblockquote
  //   else if (type == 'subblockquote') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<p><blockquote>${p[1]}</blockquote></p>`       
  //     });
  //   }
    
  //   //9. checkbox
  //   else if (type == 'checkbox') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var boxid =`parsedcheckbox${checkboxno}`
  //       if ((p[1].length>0) ^ (p[1]!==" ")) { checked = ""} else { var checked = "checked" }
  //       renderedOutput = `<input type="checkbox" id="${boxid}" name="${boxid}" value="${p[2]}" ${checked}>
  //                         <label for="${boxid}"> ${p[2]}</label><br>`       
  //     });
  //   }
    
  //   //10. hr
  //   else if (type == 'hr') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<hr>`       
  //     });
  //   }
    
  //   //11. ol
  //   else if (type == 'listol') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var boxid =`parsedcheckbox${checkboxno}`
  //       renderedOutput = `<ol><li>${p[1]}</li></ol>`       
  //     });
  //   }
    
  //   //12. subol
  //   else if (type == 'sublistol') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var boxid =`parsedcheckbox${checkboxno}`
  //       renderedOutput = `<ol class="sub"><li>${p[1]}</li></ol>`       
  //     });
  //   }
    
  //   //13. ul
  //   else if (type == 'ul') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var boxid =`parsedcheckbox${checkboxno}`
  //       renderedOutput = `<ul><li>${p[2]}</li></ul>`       
  //     });
  //   }
    
  //   //14. subul
  //   else if (type == 'subul') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       var boxid =`parsedcheckbox${checkboxno}`
  //       renderedOutput = `<ul class="sub"><li>${p[2]}</li></ul>`       
  //     });
  //   }
    
  //   //15. table    
    
  //   //16. paragraph
  //   else if (type == 'paragraph') {
  //     checkboxno +=1;
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     var p = matchList[0]
  //     renderedOutput = `<p>${p[1]}</p>`       
      
  //   }

  //   // //17. math1
  //   // else if (type == 'math2') {
  //   //   var match1 = content.matchAll(pattern)
  //   //   var matchList = Array.from(match1)
  //   //   var renderedOutput = "";
  //   //   matchList.forEach(p => {
  //   //     renderedOutput = `<p><span class="math-inline">\\[${p[1]}\\]</span></p>`
  //   //   });
  //   // }
  //   // //18. math2
  //   // else if (type == 'math1') {
  //   //   var match1 = content.matchAll(pattern)
  //   //   var matchList = Array.from(match1)
  //   //   var renderedOutput = "";
  //   //   matchList.forEach(p => {
  //   //     renderedOutput = `<p><span class="math-inline">\\[${p[1]}\\]</span></p>`
  //   //   });
  //   // }

  //   //19. bolditalic
  //   else if (type == 'bolditalic') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       if (p[1].length > 2) {
  //         renderedOutput = `<strong><em>${p[2]}</em></strong>`
  //       } else if (p[1].length == 2) {
  //         renderedOutput = `<strong>${p[2]}</strong>`
  //       } else {
  //         renderedOutput = `<em>${p[2]}</em>`
  //       }
  //     });
  //   }

  //   //20. link
  //   else if (type == 'link') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<a href="${p[2]}">${p[1]}</a>`
  //     });
  //   }

  //   //21. imagelink
  //   else if (type == 'imagelink') {
  //     var match1 = content.matchAll(pattern)
  //     var matchList = Array.from(match1)
  //     var renderedOutput = "";
  //     matchList.forEach(p => {
  //       renderedOutput = `<img src="${p[2]}" alt="${p[1]}">`
  //     });
  //   }

  //   //empty
    
  //   return renderedOutput;
  
  // }


  // //render lex to html
  // function Stage2renderLexBlocks(lex, callback){
  //   for (var i = 0; i < lex.length; i++) {
  //     var block = lex[i];
  //     var type = block.type;
  //     var content = block.content;
  //     var pattern = blockCheck.find(o => o.type === type).renderpattern;
  //     var rendered = render(content,pattern,type)
  //     lex[i].rendered = rendered;

  //     //update preview
      
  //   }
  //   return lex;
  // }

  // lex = Stage2renderLexBlocks(lex)
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
  // function combineRendered(lex, callback){
  //   var joinedhtml = ""
  //   for (var i = 0; i < lex.length; i++) {
  //     joinedhtml += lex[i].rendered
  //   }
  //   return joinedhtml;
  // }

  // var renderedFinal = combineRendered(lex)


  // //temp check
  // // append(`#preview-code`, renderedFinal)


  callback(renderedFinal)
  return renderedFinal;

  
}






