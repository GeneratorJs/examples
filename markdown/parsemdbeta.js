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

const renderpattern = {
  code:/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
  heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
  heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  block:/^^\s*>\s+([^\n]*)[\s\n]*/i,
  checklist:/^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
  table:/^\s*(?:^\s*\|.*\|\s*\n?)+/m,
  list:/^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
  reference:/^\n+\-{3,}$/im,
  paragraph:/^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,

}



const coderender = (block) => {
  console.log("codeblock")
  var pattern=/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
  const match = block.match(pattern);
  if (match) {
    var matchArray =  Array.from(match)
    var res = gens(code,"",gens(pre,"",matchArray[2],`lang-${matchArray[1]},${matchArray[1]}`))
    console.log(res)
    return res
  }
}

const tablerender = (block) => {
  console.log("tableblock")
  // var pattern=/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
  // const match = block.match(pattern);
  // if (match) {
  //   var matchArray =  Array.from(match)
  //   var res = gens(code,"",gens(pre,"",matchArray[2],`lang-${matchArray[1]},${matchArray[1]}`))
  //   console.log(res)
  //   return res
  // }
}

const listrender = (block) => {
  console.log("listblock")
  // var pattern=/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
  // const match = block.match(pattern);
  // if (match) {
  //   var matchArray =  Array.from(match)
  //   var res = gens(code,"",gens(pre,"",matchArray[2],`lang-${matchArray[1]},${matchArray[1]}`))
  //   console.log(res)
  //   return res
  // }
}
const blockquoterender = (block) => {
  console.log("blockquoteblock")
  var pattern= /^^\s*>\s+([^\n]*)[\s\n]*/i;
  const match = block.match(pattern);
  if (match) {
    var matchArray =  Array.from(match)
    var res = gens(blockquote,"",matchArray[1])
    console.log(res)
    return res
  }
}

const tabrender = (block) => {
  console.log("tabblock")
  // var pattern=/^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
  // const match = block.match(pattern);
  // if (match) {
  //   var matchArray =  Array.from(match)
  //   var res = gens(code,"",gens(pre,"",matchArray[2],`lang-${matchArray[1]},${matchArray[1]}`))
  //   console.log(res)
  //   return res
  // }
}

const paragraphrender = (block) => {
  console.log("tabblock")
  var pattern=/^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im;
  const match = block.match(pattern);
  if (match) {
    var matchArray =  Array.from(match)
    var res = gens(p,"",matchArray[1])
    console.log(res)
    return res
  }
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


  //foreachitem in lex
  for(var j =0; j<lex.length;j++){
    var block = lex[j]
    var rend = ""
    //renderhtml
    if (block.type == "html1" || block.type == "html2"){
      var rend = block.content
    }
    //rendercode
    else if (block.type == "code"){
      var rend = coderender(block.content)
    }
    //rendertable
    else if (block.type == "table"){
      // var rend = tablerender(block.content)
    }
    //renderlist
    else if (block.type == "list"){
      // var rend = listrender(block.content)
    }
    //renderblockquote
    else if (block.type == "blockquote"){
      var rend = blockquoterender(block.content)
    }
    //rendertab
    else if (block.type == "tab"){
      // var rend = tablerender(block.content)
    }
    //renderparagraph
    else if (block.type == "paragraph"){
      var rend = paragraphrender(block.content)
    }

    lex[j].render1 = rend
  }
    
    
  

  // lex = lex.filter(o => o.type !== "empty" && o.type !== "unknown")
  lex = lex.filter(o => o.type !== "empty")
  console.log(JSON.parse(JSON.stringify(lex)))






  callback(renderedFinal)
  return renderedFinal;

  
}






