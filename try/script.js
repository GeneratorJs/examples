// load("./parsemdbeta.js");

const loadSkelton =()=> {
  append(app, gen(header, "header", "", "header"), "o");
  append(header, gen(nav, "nav", gen(ul, "navlist", gen(li, "", gen(a, "", "Home", "", "/"))), "nav"));
  append(app, gen(main, "main", "", "main"));
  append(
    header, 
   "", 
    ""
  );

  append(app, gen(footer, "footer", "", "footer"));


  append(main, gen(section, "instructions", gen(
    h1, 
    "", 
    "Try GeneratorJS"

    )
    , "instructions")
    )

//howto
  append(instructions, 
    gen(div, "howto", "", "howto")
  )
  append(howto, 
    gen(p, "", "To try GeneratorJS edit HTML Before and JS Code, then click \"Try\" to get HTML after Execution "))
    // gens(a, "", "<br> Read more about markdown syntax", "", {href:"https://daringfireball.net/projects/markdown/syntax", target:"_blank"})+" and this project uses "+
    // gens(a, "", "MathJax", "", {href:"https://www.mathjax.org/", target:"_blank"})
    // )
    // )
// //optionbar
  append(instructions, gen(div, "optionbar", "", "optionbar"))
  append(optionbar, gen(div, "optioncontainer", "", "optioncontainer"))
  
  append(optioncontainer, gen(span, 'save', "Save as ", "button", {onclick:"saveImage()"}))
  append(save, gen(span, 'fileName', "Demo", "", {contenteditable:true, onclick:"event.stopPropagation()"}, 'fileName'))
  
  append(optioncontainer, gen(span, 'try', "Try", "button", {onclick:"updateOutput()"}))
  append(optioncontainer, gen(span, 'Example', "Example", "button", {onclick:"example()"}))
  append(optioncontainer, gen(span, 'Reset', "Reset", "button", {onclick:"resetSetup()"}))


  append(main, gen(div, "saveCanvas", gen(h1, "", "Learn GeneratorJS", 'canvasHeading'), "save canvas"));
  append("#saveCanvas", gen(p, "comment", "", 'comment'))
  append(saveCanvas, gen(section, "gridRoot", "", "gridRoot"));

  var blocks = "beforehtml".split(", ");
  blocks.forEach((block) => {
    var id = block + "-block";
    var boxid = block + "-box";
    append(gridRoot, gen(div, id, "", block + ", column"));
    append(`#${id}`, gen(h3, "", "HTML Before (DOM)", "block-heading"));
    append(`#${id}`, gen(div, `${boxid}`, "", "box"));
    append(
      `#${boxid}`, 
      gen(pre, `${block}-code`, block, "code, scrolly, lang-html", {
        onchange: "updateOutput()", 
        contenteditable: "true", 
      })
    );
  });

  var blocks = "jscode".split(", ");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block + ", column"));
    append(`#${id}`, gen(h3, "", "JS Code (javascript)", "block-heading"));
    append(
      `#${id}`, 
      gen(pre, `${block}-code`, block, "code, scrolly, lang-javascript", {
        onchange: "updateOutput()", 
        contenteditable: "true", 
      })
    );
  });

  var blocks = "afterhtml".split(", ");
  blocks.forEach((block) => {
    var id = block + "-block";
      append(gridRoot, gen(div, id, "", block + ", column"));
    append(`#${id}`, gen(h3, "", "HTML After (DOM)", "block-heading"));
    append(
      `#${id}`, 
      gen(pre, "", gen(code, `${block}-code`, block, "code, scrolly, lang-html", {
        onchange: "updateOutput()", 
        // contenteditable: "true", 
      }), 'code'
    )
    );
  });

  var blocks = "output".split(", ");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block + ", column"));
    append(`#${id}`, gen(h3, "", "HTML Preview", "block-heading"));
    append(
      `#${id}`, 
      gen(div, `${block}-code`, block, "code, scrolly", {
        onchange: "updateOutput()", 
        // contenteditable: "true", 
      })
    );
  });

  
}

loadSkelton()

// var beforestring = `<div id="testmain">Test Main Text<div>`
// var codeString = `append("#testmain", gen("p", "", "hi"))`




function resetSetup(beforestring= `<div id="testmain">Test Main Text</div>`, codeString= `append("#testmain", gen("p", "", "hi"))`, comment=""){
  // log(beforestring)
  
  append(`#beforehtml-code`, beforestring.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"), 'o')
  // append(`#testrender-code`, beforestring, 'o')
  
  append(`#jscode-code`, codeString, 'o')

  append(`#afterhtml-code`, "", 'o')
  var readbefore = grab(`#beforehtml-code`)[0].innerText
  append(`#output-code`, readbefore, "o")

  // append("#testmain", "Test Main Text", "o"); 
  if (comment.length > 0) {
    append(`#comment`, comment, "o")
  }

}

var beforestring=`<div id="testmain">Test Main Text</div>`
var codeString = `append("#testmain", gen("p", "", "hi"))`


resetSetup(beforestring, codeString)







function updateOutput() {


    

    var readbefore = grab(`#beforehtml-code`)[0].innerText
    var jscode = grab(`#jscode-code`)[0].innerText
    resetSetup(readbefore, jscode)
    append(`#output-code`, readbefore, "o")
    eval(jscode)
    // resetSetup()

    var readafter = grab(`#output-code`)[0].innerHTML
    append(`#afterhtml-code`, readafter.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"), "o")

}


  var examples = [
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("p", "", "hi")) <br>`, 
      comment: `Use of append() function, this function takes three arguments, <br> 1st to target parent element where we want to append content, it can be dom element, tag, #id or .class, <br> 2nd is content that needs to be inserted, can be text, HTML or another gen() function. <br> 3rd is optional by default is 'after'.<br>Example showing append after with 2 arguments.`
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("p", "", "hi"), "after") <br>\/\/append("#testmain", gen("p", "", "hi"), "a")`, 
      comment: `append() function with third argument as 'after' or 'a'.<br>Example showing append after with 3 arguments.`
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("p", "", "hi"), "b")  <br>\/\/append("#testmain", gen("p", "", "hi"), "before")`, 
      comment: `append() to append before keeping previous content. <br>Example showing append before.`
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("p", "", "hi"), "o") <br>\/\/append("#testmain", gen("p", "", "hi"), "over")`, 
      comment: `append() to overwrite over previous content, removing previous content. <br>Example showing append overwrite over previous content`
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("p", "", "hi"), "r") <br>\/\/append("#testmain", gen("p", "", "hi"), "replace")`, 
      comment: `append() to replace previous html tag with content, completely overwriting. <br>Example showing append replace replacing previous html html completely`
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen("div", "parent", "hi"), "p") <br>\/\/append("#testmain", gen("div", "parent", "hi"), "parent")`, 
      comment: `append() as parent of previous html tag, making previous tag chile of appended tag. <br>Example showing append parent will add new content in place of previous tag and add previous tag as its child element.`, 
    }, 
    {
      beforestring: `<div id="testmain">Test Main Text</div>`, 
      codeString: `append("#testmain", gen(div, "IDNAME", "ActualContent", "class1, class2, class3", {"attr1":"attr1val", "attr2":"attr2val"}), "o")`, 
      comment: `Next we learn gen() function to create html element in the DOM. <br> consider a given tag <div id="IDNAME" class="class1 class2 class3" attr1="attr1val" attr2="attr2val">ActualContent</div>. <br> The important things in above tag are <br>1 tagname: "div"<br>2 id: "IDNAME"<br>3 content: "ActualContent"<br>4 classlist: "class1 class2 class3" <br>These 4 are important values, sometimes there are other attributes like in this case, we just create object of all the remaining attributed like, <br>5 dictionary:{<br>"attr1":"attr1val", <br>"attr2":"attr2val"} div<br><br> To create similar tag in DOM using gen() function<br><br>
      <br> gen take 4 input argument, and some times 5th as object or single value.
      <br>We can create above tag like<br>
      gen(div, "IDNAME", "ActualContent", "class1, class2, class3", {"attr1":"attr1val", "attr2":"attr2val"})

      `
    }
  ];


  // var examples = getfile("./listOfExamples.json")
  


var exampleNo = 0

function example() {
 
  if (exampleNo > examples.length - 1) {
    exampleNo = 0
  }
  var beforestring = examples[exampleNo].beforestring
  var codeString = examples[exampleNo].codeString
  var comment = examples[exampleNo].comment 

  

  // add example 
  resetSetup(beforestring, codeString, comment)

  //execute after 2 sec 
  setTimeout(()=>{updateOutput()}, 2000)

  //increment exampleNo
  exampleNo = exampleNo + 1
}


  load(["./md.scss"]);


  

  async function saveImage(){
    // code to download #gridRoot as png;
    // console.log('pending export to png')
    var elem = grab(`#saveCanvas`)[0]
    var canvas = await html2canvas(elem)
    var generatedfilename = `GeneratorJS-${grab(`#fileName`)[0].innerText}.png`
    var link = await gen(a, `savepng`, "", "button", {"href":canvas.toDataURL('image/png'), download:generatedfilename})
    await link.click()
    // append(app, link)
    append(savepng, "", "r")
  
  }
  
// load('savecanvas.js')


append("#header", gen(header, "appheader", "", "header"), "r")

load(["/defaults.js", "/header.js"])
async function copyrightsloader(){
   window.$$ =await  GeneratorWebHelper()
   $$.PageNav().init()
  await $$.loadCopyright();

  setTimeout(()=>{
    
  var copyrightdiv= grab(`#copyright`)[0].outerHTML
  append(`#copyright`, "", 'o')
  append(saveCanvas, copyrightdiv)

  }, 3000)
}

copyrightsloader()