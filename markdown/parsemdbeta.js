var blockPattern = {
  code: /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
  // html1:/^\s*<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
  html1: /^<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
  html2: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^\>]*?>\s*\n*/i,
  // heading1: /^\s*\#{1,6}\s+([^\n]*)[\s\n]*/i,
  // heading2: /^\s*(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
  heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  block: /^^\s*>\s+([^\n]*)[\s\n]*/i,
  checklist: /^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
  table: /^\s*(?:^\s*\|.*\|\s*\n?)+/m,
  list: /^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
  reference: /^\n+\-{3,}$/im,
  // paragraph:/^\s*[^\n]+(\s|\n)*/im,
  paragraph: /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,
  empty: /^\s*[\s\n]*/m,
  unknown: /^\s*.*\n*$/mi
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
        return { type, match: match[0], unprocessed: text.slice(match[0].length) };
      }
    }
    return { type: "unknown", match: "", unprocessed: text }; // Return unknown if no match found
  }



  console.log(`matching: ${mdinput.substr(0, 10)}`)
  for (var i = 0; i <= checkSequence.length; i++) {
    var type = checkSequence[i];
    var pattern = blockPattern[type];
    res = matchMarkdownBlock(mdinput);
    if (pattern == null || pattern == undefined) {
      console.log(`Pattern for ${i + 1} ${type} not found`)
      continue;
    }

  }
  return res
}

const renderpattern = {
  code: /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
  heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
  heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
  block: /^^\s*>\s+([^\n]*)[\s\n]*/i,
  checklist: /^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
  table: /^\s*(?:^\s*\|.*\|\s*\n?)+/m,
  list: /^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
  reference: /^\n+\-{3,}$/im,
  paragraph: /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,

}



const coderender = (block) => {
  var pattern = /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
  const match = block.match(pattern);
  if (match) {
    var matchArray = Array.from(match)
    var res = gens(pre, "", gens(code, "", matchArray[2], `language-${matchArray[1]},${matchArray[1]}`))
    return res
  }
}

const tablerender = (table) => {


  var tableHeadBodySepratorPattern = /(^\|)(?=(:|-))([^\w\d\s]*?)(\|\s*$)/gm

  var sep = table.matchAll(tableHeadBodySepratorPattern)

  var sep = Array.from(sep)
  if (sep.length > 0) {
    var Sep = sep[0][0]

    var alignment = Sep.substr(1, Sep.length - 2)
    alignment = alignment.replaceAll(":---:", "center").replaceAll(":---", "left").replaceAll("---:", "right").replaceAll("---", "justify")
    alignment = alignment.split("|")
    var T = table.split(Sep)
    var thead = T[0]
    var tbody = T[1]
    thead = `\n\t<thead>${tableRowsParser(thead, alignment)}\n</thead>`
    tbody = `\n\t<tbody>${tableRowsParser(tbody, alignment)}\n</tbody>`
  }
  else {
    var alignment = null
    var thead = ""
    var tbody = `\n\t<tbody>${tableRowsParser(table, alignment)}\n</tbody>`
  }
  // tableRow
  function tableRowsParser(table, alignment = null) {
    // https://regex101.com/r/zRBXEm/1
    var tableRowPattern = /(^\|)(?!(:|-))([^\n]*?)(\|\s*$)/gm
    var rows = table.matchAll(tableRowPattern)
    rowsList = Array.from(rows)
    rowsList.forEach(Row => {
      if (alignment == null) {
        alignment = []
        for (i = 0; i < Row[3].split("|").length; i++) {
          alignment.push("center")
        }
      }




      var R = RowParser(Row[3], alignment)
      table = table.replaceAll(Row[0], R)
    })
    return table
  }

  function RowParser(Row, alignment) {
    var parsedRow = ""
    var Col = Row.split("|")
    Col.forEach((cell, i) => {
      parsedRow = parsedRow + `<td class='${alignment[i]}'>${cell}</td>`
    })
    parsedRow = `\n\t<tr>\n\t${parsedRow}\n</tr>\n`
    return parsedRow
  }


  var table = `\n<table class="parse-md-table">${thead}\n${tbody}\n</table>`
  return textformat(table)
}


const blockquoterender = (block) => {
  var pattern = /^^\s*>\s+([^\n]*)[\s\n]*/i;
  const match = block.match(pattern);
  if (match) {
    var matchArray = Array.from(match)
    var res = gens("blockquote", "", matchArray[1])
    return textformat(res)
  }
}

const paragraphrender = (block) => {
  var pattern = /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im;
  const match = block.match(pattern);



  function processIndentedLines(text) {
    return text
      .split('\n')  // Split into lines
      .map(line => {
        // Check if line starts with tab or 4+ spaces
        if (/^(\t| {4,})/.test(line)) {
          return `<span class="tab">${line}</span>`;
        }
        return line;
      })
      .join('\n')  // Join back with line breaks
      .replaceAll(/\n{2,}/g, '<br>')  // Convert remaining line breaks to <br>
      .replaceAll(/\s{2,}$/g, '<br>')
  }


  if (match) {
    var matchArray = Array.from(match)
    var paratext = processIndentedLines(matchArray[1])
    var formatted = textformat(paratext)
    var res = gens(p, "", formatted)
    return res
  }
}



const heading1render = (block) => {
  var pattern = /^(\#{1,6})\s+([^\n]*)[\s\n]*/i;
  const match = block.match(pattern);
  if (match) {
    var matchArray = Array.from(match)
    var res = `<h${matchArray[1].length + 1}>${matchArray[2]}</h${matchArray[1].length + 1}>`
    return textformat(res)
  }
}

const heading2render = (block) => {
  var pattern = /^(\w[^\n]*)\n((-|\=){4,})[\s\n]*/im;
  const match = block.match(pattern);
  if (match) {
    var matchArray = Array.from(match)
    if (matchArray[2][2] == "-") var htype = 1
    else if (matchArray[2][2] == "=") var htype = 2
    var res = `<h${htype}>${matchArray[1]}</h${htype}>`

    return textformat(res)
  }
}


const listrender = (md) => {
  var ullistBlockPattern = /(^[\s\t]*(\*|-)\s+[^\n]*){1,}/mi
  var ollistBlockPattern = /(^[\s\t]*\d+.\s+[^\n]*){1,}/mi
  if (md.match(ollistBlockPattern)) {
    var listblocktype = "ol"
  } else if (md.match(ullistBlockPattern)) {
    var listblocktype = "ul"
  }

  log(listblocktype)

  md = md.split(/\n+/)

  md = md.map(line => {
    var parseline = line

    //toplevel or 

    if (!line.match(/^([\t\s]+)[^\n]*/)) {
      var matchol = line.match(/^([\t\s]*)(\d+).\s+([^\n]*)$/)
      if (matchol) {
        parseline = `<ol><li class="no-${matchol[2]}">${matchol[3]}</li></ol>`
      }
      else {
        var matchul = line.match(/^([\t\s]*)(\*|-)\s+([^\n]*)$/)
        if (matchul) {
          parseline = `<ul><li>${matchul[3]}</li></ul>`
        }
      }
    }
    // sublevel
    else {
      var matchol = line.match(/^([\t\s]*)(\d+).\s+([^\n]*)$/)
      // var parseline = line
      if (matchol) {
        parseline = `<${listblocktype}><ol><li class="no-${matchol[2]}">${matchol[3]}</li></ol></${listblocktype}>`
      }
      else {
        var matchul = line.match(/^([\t\s]*)(\*|-)\s+([^\n]*)$/)
        if (matchul) {
          parseline = `<${listblocktype}><ul><li>${matchul[3]}</li></ul></${listblocktype}>`
        }
      }
    }
    return parseline
  })

  var res = md.join("\n\n").replaceAll(/<\/ul>\n+<ul>/g, "").replaceAll(/<\/ol>\n+<ol>/g, "").replaceAll("</ol><ol>", "").replaceAll("</ul><ul>", "")
  return testformat(res)
}













const textformat = (md) => {

  var inlinecodePattern = /(?<!`)`([^`]*?)`(?!`)/gmi;
  match1 = md.matchAll(inlinecodePattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    md = md.replaceAll(p[0], `<code class='parsemd-code code-inline'>${p[1]}</code>`)
  })


  // // blockMath
  //https://regex101.com/r/QdJcQS/1
  var blockMathPattern = /\${2}([^$\n]+)\${2}/gm
  match1 = md.matchAll(blockMathPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    // log(p)
    md = md.replaceAll(p[0], `\\[ ${p[1]} \\]`)
  })


  // // inlineMath
  //https://regex101.com/r/QdJcQS/1
  // var inlineMathPattern = /(?<!\$)\$([^$\n]+)\$(?!\$)/gm
  var inlineMathPattern = /(?<!\$)\$([^$\n]+)\$(?!\$)/mg;

  match1 = md.matchAll(inlineMathPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    // log(p)
    md = md.replaceAll(p[0], `\\( ${p[1]} \\)`)
  })



  // // imageurl
  // https://regex101.com/r/EXVZcK/1

  var imageUrlPattern = /!\[([^\]]*)]\("?([^\)"']*)"?\)/gm
  match1 = md.matchAll(imageUrlPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    //               console.log(p)
    md = md.replaceAll(p[0], `\n<img src="${p[2]}" alt="${p[1]}" />`)

  })

  // // link
  // https://regex101.com/r/APBkU8/1
  // var linkPattern = /[^!]\[([^\]]*)\]\(([^\)]*)\)/gmi
  var linkPattern = /(?<!!)\[([^\]]*)\]\(([^\)]*)\)/gmi

  match1 = md.matchAll(linkPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    //                    log(p)
    md = md.replaceAll(p[0], `<a href="${p[2]}">${p[1]}</a>`)

  })


  // // bold/italic/emph
  // https://regex101.com/r/3GWtGB/1
  var italicPattern = /(?<=\W+)((\*|_){1,3})(\S[^\*_\n]+?\S)\1(?=\W)/gmi
  // var italicPattern = /([\s]+)((\*|_){1,3})([^\*_\n]+?)\1(?=\W)/gmi
  match1 = md.matchAll(italicPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    if (p[1].length == 3) {
      md = md.replaceAll(p[0], `<em><strong>${p[3]}</strong></em>`)
    }
    if (p[1].length == 2) {
      md = md.replaceAll(p[0], `<strong>${p[3]}</strong>`)
    }
    if (p[1].length == 1) {
      md = md.replaceAll(p[0], `<em>${p[3]}</em>`)
    }
  })

  // // strikethrough
  // https://regex101.com/r/MLsQRh/1
  var strikethroughPattern = /~~(.*)~~/igm
  // var strikethroughPattern =/~~([\s\S]*?)~~/gm;
  match1 = md.matchAll(strikethroughPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    md = md.replace(p[0], `<del class='parsedmd-del'>${p[1]} </del>`)
  })



  // reference
  https://regex101.com/r/eLzXSC/1                                 
  var referencelinkPattern = /(?<!!)\[([^\]]*)\]\s{0,3}\[([^\]]*)\]/gmi

  match1 = md.matchAll(referencelinkPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    //                    log(p)
    md = md.replaceAll(p[0], `<a href="#${p[2]}">${p[1]}</a>`)

  })

  // Blockreferencelist
  // https://regex101.com/r/xu97SN/1
  var listBlockPattern = /(^ *(\[[^\]]*\]:)\s+[^\n]*){1,}/gmi
  match1 = md.matchAll(listBlockPattern)
  matchList = Array.from(match1)
  matchList.forEach(p => {
    var block = p[0]
    // referencelistBlock
    // https://regex101.com/r/JC0xSx/1
    var listPattern = /^\[([^\]]*)\]:\s+([^\n]*)$/gmi
    list = block.matchAll(listPattern)
    listEntry = Array.from(list)
    listEntry.forEach(li => {
      block = block.replaceAll(li[0], `\n\t<span id="${li[1]}">${li[2]}</span> `)
    })

    // subreferencelist
    // https://regex101.com/r/DYvI2z/1
    var sublistPattern = /^ +(\*|-)\s+([^\n]*)$/gmi
    list = block.matchAll(sublistPattern)
    listEntry = Array.from(list)
    listEntry.forEach(li => {
      //                        block = block.replaceAll(li[0], `\n<ul>\n\t<li>${li[1]}</li></ul>`) trying sub list
      block = block.replaceAll(li[0], `\n<ul>\n\t<li>${li[2]}</li></ul>`)
    })

    // md = md.replaceAll(p[0], `\n<ul>${block}</ul>`)
    md = md.replaceAll(p[0], `\n${block}`)
  })
  return md

}







const parsemdbeta = (mdinput, callback) => {
  // mdinput = `${mdinput}\n`

  var checkboxno = grab("input").length

  //check mdinput with checkblocktype then return match and remove matched part from mdinput and repeat till mdinput length is zero
  var lex = []



  // identify block type and content
  while (mdinput.length > 0) {
    var res = checkBlockTypeStage1(mdinput);
    if (res != null) {
      var type = res.type;
      var content = res.match;
      var unprocessed = res.unprocessed;


      if (content.length > 0) {

        mdinput = unprocessed;
        lex.push({
          type: type,
          content: content,
        })
      }
    }
  }


  //foreachitem in lex
  for (var j = 0; j < lex.length; j++) {
    var block = lex[j]
    var rend = ""
    //renderhtml
    if (block.type == "html1" || block.type == "html2") {
      var rend = block.content
    }
    //rendercode
    else if (block.type == "code") {
      var rend = coderender(block.content)
    }
    //rendertable
    else if (block.type == "table") {
      var rend = tablerender(block.content)
    }
    //renderlist
    else if (block.type == "list") {
      var rend = listrender(block.content)
    }
    //renderblockquote
    else if (block.type == "block" || block.type == "blockquote") {
      var rend = blockquoterender(block.content)
    }
    //rendertab
    else if (block.type == "tab") {
      // var rend = tablerender(block.content)
    }
    //renderparagraph
    else if (block.type == "paragraph") {
      var rend = paragraphrender(block.content)
    }
    else if (block.type == "heading1") {
      var rend = heading1render(block.content)
    }
    else if (block.type == "heading2") {
      var rend = heading2render(block.content)
    }

    lex[j].render1 = rend
  }

  var rend1join = ""


  for (var j = 0; j < lex.length; j++) {
    rend1join = `${rend1join}${lex[j].render1}`
  }



  // lex = lex.filter(o => o.type !== "empty" && o.type !== "unknown")
  lex = lex.filter(o => o.type !== "empty")
  console.log(JSON.parse(JSON.stringify(lex)))






  callback(rend1join)
  return rend1join;


}






