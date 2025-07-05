load("./parsemdbeta.js");

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
    "Markdown Preview"

    )
    ,"instructions")
    )

// //howto
  append(instructions,
    gen(div,"howto","","howto")
  )
  append(howto,
    gen(p,"","To test markdown. Enter the markdown code in left side and rendered output will be shown on the right. "+
    gens(a,"","<br> Read more about markdown syntax","",{href:"https://daringfireball.net/projects/markdown/syntax",target:"_blank"})+" and this project uses "+
    gens(a,"","MathJax","",{href:"https://www.mathjax.org/",target:"_blank"})
    )
    )
// //optionbar
  append(instructions,gen(div,"optionbar","","optionbar"))
  append(optionbar,gen(span,'render',"Render","button",{onclick:"updateOutput()"}))


  append(main, gen(section, "gridRoot", "", "gridRoot"));

  var blocks = "markdown".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    var boxid = block + "-box";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "Markdown Input","block-heading"));
    append(`#${id}`, gen(div, `${boxid}`, "", "box"));
    append(
      `#${boxid}`,
      gen(pre, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
        contenteditable: "true",
      })
    );
  });

  var blocks = "preview".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "Output","block-heading"));
    append(
      `#${id}`,
      gen(div, `${block}-code`, block, "code,scrolly", {
        onchange: "updateOutput()",
      })
    );
  });
}

loadSkelton()
function mathjaxUpdate() {
  console.info("mathjaxUpdate");
  // MathJax.startup.document.state(0);
  MathJax.texReset();
  MathJax.typesetClear();
  setTimeout(() => {
    // MathJax.startup.document.state(0);
    // MathJax.texReset();
    // MathJax.typesetClear();

    grab("code").forEach((c) => {
      c.innerHTML = c.innerHTML.replaceAll("<br>", "\n");
    });
    MathJax.typesetPromise();
  }, 2000);
}

 function updateOutput() {
  const updatePreview = (e) => {
    append(`#preview-code`, e, "over");
  }
  var mdText = grab("#markdown-code")[0].innerText;
  // parsemd(mdText, updatePreview);
  parsemdbeta(mdText, updatePreview);
  mathjaxUpdate();
}



getfile("./exampleMarkdown.md", (data) => {
  var mdExampleText = data;
  

  grab("#markdown-code")[0].innerText = mdExampleText;

  

  var mdCode = grab("#markdown-code")[0];
  mdCode.addEventListener("keypress", function (e) {
    updateOutput();
  });


  load(["./md.scss"]);
  updateOutput();

  grab("#preview-code")[0].addEventListener("dblclick", function (e) {
    var htmlPreview = grab("#preview-code")[0];
    var htmlPreviewText = htmlPreview.innerHTML
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    append("#preview-code", gen(pre, "", htmlPreviewText), "over");
  });
});




$$.loadCopyright();


setTimeout(
  ()=>{
  grab("#markdown-code")[0].click()
  grab("#markdown-code")[0].focus()},3000
)

append("#header",gen(header,"appheader","","header"),"r")

load(["/defaults.js","/header.js"])