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
  append(optionbar,gen(span,'try',"Try","button",{onclick:"updateOutput()"}))
  append(optionbar,gen(span,'init',"Init","button",{onclick:"initsetup()"}))


  append(main, gen(section, "gridRoot", "", "gridRoot"));

  var blocks = "beforehtml".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    var boxid = block + "-box";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "HTML Before","block-heading"));
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
    append(`#${id}`, gen(h3, "", "JS Code","block-heading"));
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
    append(`#${id}`, gen(h3, "", "HTML After","block-heading"));
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
    append(`#${id}`, gen(h3, "", "Test Render","block-heading"));
    append(
      `#${id}`,
      gen(code, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        // contenteditable: "true",
      })
    );
  });

  
}

loadSkelton()

// var beforestring = `<div id="testmain">Test Main Text<div>`
// var codeString = `append("#testmain",gen("p","","hi"))`




function initsetup(beforestring= `<div id="testmain">Test Main Text<div>`,  codeString= `append("#testmain",gen("p","","hi"))`){
  // log(beforestring)
  
  append(`#beforehtml-code`,beforestring.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"),'o')
  // append(`#testrender-code`,beforestring,'o')
  append(`#jscode-code`,codeString,'o')

  append(`#afterhtml-code`,"",'o')
  var readbefore = grab(`#beforehtml-code`)[0].innerText
  append(`#output-code`,readbefore,"o")



}

var beforestring=`<div id="testmain">Test Main Text<div>`
var codeString = `append("#testmain",gen("p","","hi"))`


initsetup(beforestring,codeString)







function updateOutput() {


    

    var readbefore = grab(`#beforehtml-code`)[0].innerText
    var jscode = grab(`#jscode-code`)[0].innerText
    initsetup(readbefore,jscode)
    append(`#output-code`,readbefore,"o")
    eval(jscode)
    // initsetup()

    var readafter = grab(`#output-code`)[0].innerHTML
    append(`#afterhtml-code`,readafter.replace(/</g, "\n&lt;").replace(/>/g, "&gt;\n").replace(/\n+/g, "\n").replace(/^\n/g, "\n"),"o")

}



  load(["./md.scss"]);




window.$$ = GeneratorWebHelper()
$$.loadCopyright();




// append("#header",gen(header,"appheader","","header"),"r")

load(["/defaults.js","/header.js"])