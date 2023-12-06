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


  append(main,gen(div,"instructions", gen(
    h1,
    "",
    "Equation Preview based on " +gens(a, "", "MathJax", "", {href:"https://www.mathjax.org/",target:"_blank"})

    )
    ,"instructions")
    )

// //howto
  append(instructions,
    gen(div,"howto","","howto")
  )
  append(howto,
    gen(p,"","To test LaTeX equation or to test the output of MathJax output. Enter the equation in left side and rendered output will be shown on the right.")
    )
// //optionbar
  append(instructions,gen(div,"optionbar","","optionbar"))
  append(optionbar,gen(span,'render',"Render","button",{onclick:"updateOutput()"}))


  append(main, gen(div, "gridRoot", "", "gridRoot"));

  var blocks = "markdown".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    var boxid = block + "-box";
    append(gridRoot, gen(div, id, "", block + ",column"));
    append(`#${id}`, gen(h3, "", "LaTeX Math Equation Input","block-heading"));
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
    append(`#${id}`, gen(h3, "", "Equation Output","block-heading"));
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
  function updatePreview(e) {
    append(`#preview-code`, e, "over");
  }
  var mdText = grab("#markdown-code")[0].innerText;
  parsemd(mdText, updatePreview);
  //    parsemdbeta(mdText, updatePreview);
  mathjaxUpdate();
}



getfile("./exampleMath.md", (data) => {
  var mdExampleText = data;
  

  grab("#markdown-code")[0].innerText = mdExampleText;

  

  var mdCode = grab("#markdown-code")[0];
  mdCode.addEventListener("keypress", function (e) {
    if (e.key=="$"){
    updateOutput();
    }
  });

  // mdCode.addEventListener("click", function (e) {
  //   updateOutput();
  // });

  // mdCode.addEventListener("blur", function (e) {
  //   updateOutput();
  // });

  // mdCode.addEventListener("touchstart", function (e) {
  //   updateOutput();
  // });

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
