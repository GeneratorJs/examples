getfile("./exampleMath.md", (data) => {
  var mdExampleText = data;

  append(app, gen(h1, "", "Equation Preview based on "+gens(a,"","MathJax","","https://www.mathjax.org/")), "over");
  append(app, gen(main, "main", "", "main"));
  append(main, gen(div, "gridRoot", "", "gridRoot"));

  var blocks = "markdown".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block));
    append(`#${id}`, gen(h3, "", "LaTeX Math Equation Input"));
    append(
      `#${id}`,
      gen(pre, `${block}-code`, block, "code", {
        onchange: "updateOutput()",
        contenteditable: "true",
      })
    );
  });

  var blocks = "preview".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block));
    append(`#${id}`, gen(h3, "", "Equation Output"));
    append(
      `#${id}`,
      gen(div, `${block}-code`, block, "code", { onchange: "updateOutput()" })
    );
  });

  grab("#markdown-code")[0].innerText = mdExampleText;

	function mathjaxUpdate() {
	  console.info("mathjaxUpdate");
	    MathJax.startup.document.state(0);
	    MathJax.texReset();
	    MathJax.typesetClear();
	  setTimeout(() => {
	    MathJax.startup.document.state(0);
	    MathJax.texReset();
	    MathJax.typesetClear();

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
  	parsemd(mdText,updatePreview)
//    parsemdbeta(mdText, updatePreview);
	mathjaxUpdate()
  }





  var mdCode = grab("#markdown-code")[0];
  mdCode.addEventListener("keyup", function (e) {
    updateOutput();
  });

  mdCode.addEventListener("click", function (e) {
    updateOutput();
  });

  mdCode.addEventListener("blur", function (e) {
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
