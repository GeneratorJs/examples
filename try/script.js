// load("./parsemdbeta.js");

const loadSkelton =()=> {
  append(app, gen(header, "header", "", "header"), "o");
  append(header, gen(nav, "nav", gen(ul,"navlist",gen(li,"",gen(a,"","Home","","/"))), "nav"));
  append(app, gen(main, "main", "", "main"));
  append(
    header,
   "",
    ""
  );

  append(app, gen(footer, "footer", "", "footer"));


  append(main,gen(section,"instructions", gen(
    h1,
    "",
    "Try GeneratorJS"

    )
    ,"instructions")
    )

//howto
  append(instructions,
    gen(div,"howto","","howto")
  )
  append(howto,
    gen(p,"","To try GeneratorJS edit HTML Before and JS Code, then click \"Try\" to get HTML after Execution "))
    // gens(a,"","<br> Read more about markdown syntax","",{href:"https://daringfireball.net/projects/markdown/syntax",target:"_blank"})+" and this project uses "+
    // gens(a,"","MathJax","",{href:"https://www.mathjax.org/",target:"_blank"})
    // )
    // )
// //optionbar
  append(instructions,gen(div,"optionbar","","optionbar"))
  append(optionbar,gen(div,"optioncontainer","","optioncontainer"))
  
  append(optioncontainer,gen(span,'save',"Save as ","button",{onclick:"saveImage()"}))
  append(save,gen(span,'fileName',"Demo","",{contenteditable:true,onclick:"event.stopPropagation()"},'fileName'))
  
  append(optioncontainer,gen(span,'try',"Try","button",{onclick:"updateOutput()"}))
  append(optioncontainer,gen(span,'Example',"Example","button",{onclick:"example()"}))
  append(optioncontainer,gen(span,'Reset',"Reset","button",{onclick:"resetSetup()"}))


  append(main, gen(div, "saveCanvas", gen(h1,"","Learn GeneratorJS",'canvasHeading'), "save canvas"));
  append("#saveCanvas",gen(p,"comment","",'comment'))
  append(saveCanvas, gen(section, "gridRoot", "", "gridRoot"));

  var blocks = "beforehtml".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    var boxid = block + "-box";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "HTML Before (DOM)","block-heading"));
    append(`#${id}`, gen(div, `${boxid}`, "", "box"));
    append(
      `#${boxid}`,
      gen(pre, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        contenteditable: "true",
      })
    );
  });

  var blocks = "jscode".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "JS Code (javascript)","block-heading"));
    append(
      `#${id}`,
      gen(code, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        contenteditable: "true",
      })
    );
  });

  var blocks = "afterhtml".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
      append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "HTML After (DOM)","block-heading"));
    append(
      `#${id}`,
      gen(pre,"",gen(code, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        // contenteditable: "true",
      }),'code'
    )
    );
  });

  var blocks = "output".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "HTML Preview","block-heading"));
    append(
      `#${id}`,
      gen(div, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        // contenteditable: "true",
      })
    );
  });

  
}

loadSkelton()

// var beforestring = `<div id="testmain">Test Main Text<div>`
// var codeString = `append("#testmain",gen("p","","hi"))`




function resetSetup(beforestring= `<div id="testmain">Test Main Text</div>`,  codeString= `append("#testmain",gen("p","","hi"))`,comment=""){
  // log(beforestring)
  
  append(`#beforehtml-code`,beforestring.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"),'o')
  // append(`#testrender-code`,beforestring,'o')
  
  append(`#jscode-code`,codeString,'o')

  append(`#afterhtml-code`,"",'o')
  var readbefore = grab(`#beforehtml-code`)[0].innerText
  append(`#output-code`,readbefore,"o")

  // append("#testmain","Test Main Text","o"); 
  if (comment.length > 0) {
    append(`#comment`,comment,"o")
  }

}

var beforestring=`<div id="testmain">Test Main Text</div>`
var codeString = `append("#testmain",gen("p","","hi"))`


resetSetup(beforestring,codeString)







function updateOutput() {


    

    var readbefore = grab(`#beforehtml-code`)[0].innerText
    var jscode = grab(`#jscode-code`)[0].innerText
    resetSetup(readbefore,jscode)
    append(`#output-code`,readbefore,"o")
    eval(jscode)
    // resetSetup()

    var readafter = grab(`#output-code`)[0].innerHTML
    append(`#afterhtml-code`,readafter.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"),"o")

}




var exampleNo = 0
function example() {

  var examples = [
    {
      beforestring: `<div id="testmain">Test Main Text</div>`,
      codeString: `append("#testmain",gen("p","","hi"))`,
      comment: `// example showing append`,
      // afterstring: `<div id="testmain">Test Main Text</div><p>hi</p>`,
  
    },
    {
      beforestring: `<div id="testmain">Test Main Text</div>`,
      codeString: `append("#testmain",gen("p","","hi")) <br>\/\/ example showing append after`,
      // afterstring: `<div id="testmain">Test Main Text</div><p>hi</p>`,  
      comment: `// example showing append after`,
    },
    {
      beforestring: `<div id="testmain">Test Main Text</div>`,
      codeString: `append("#testmain",gen("p","","hi"),"b") <br>\/\/append("#testmain",gen("p","","hi"),"before")  <br>\/\/ example showing append before`,
      comment: `// example showing append before`,
      // afterstring: `<div id="testmain">Test Main Text</div><p>hi</p>`,  
    }
  ]
  
  if (exampleNo > examples.length - 1) {
    exampleNo = 0
  }
  var beforestring = examples[exampleNo].beforestring
  var codeString = examples[exampleNo].codeString
  var comment = examples[exampleNo].comment 
  // var afterstring = examples[exampleNo].afterstring

  resetSetup(beforestring, codeString,comment)
  
  // append(`#output-code`,afterstring,"o")
  // append(`#afterhtml-code`,afterstring,"o")

  exampleNo = exampleNo + 1

  setTimeout(()=>{updateOutput()},2000)
}


  load(["./md.scss"]);


  

  async function saveImage(){
    // code to download #gridRoot as png;
    // console.log('pending export to png')
    var elem = grab(`#saveCanvas`)[0]
    var canvas = await html2canvas(elem)
    var generatedfilename = `GeneratorJS-${grab(`#fileName`)[0].innerText}.png`
    var link = await gen(a,`savepng`,"","button",{"href":canvas.toDataURL('image/png'),download:generatedfilename})
    await link.click()
    // append(app,link)
    append(savepng,"","r")
  
  }
  
// load('savecanvas.js')


append("#header",gen(header,"appheader","","header"),"r")

load(["/defaults.js","/header.js"])
async function copyrightsloader(){
   window.$$ =await  GeneratorWebHelper()
   $$.PageNav().init()
  await $$.loadCopyright();

  setTimeout(()=>{
    
  var copyrightdiv= grab(`#copyright`)[0].outerHTML
  append(`#copyright`,"",'o')
  append(saveCanvas,copyrightdiv)

  },3000)
}

copyrightsloader()