getfile("./exampleMarkdown.md", (data) => {
  var mdExampleText = data;

  append(app, gen(h1, "", "Markdown Preview"), "over");
  append(app, gen(main, "main", "", "main"));
  append(main, gen(div, "gridRoot", "", "gridRoot"));

  var blocks = "markdown".split(",");
  blocks.forEach((block) => {
    var id = block + "-block";
    append(gridRoot, gen(div, id, "", block));
    append(`#${id}`, gen(h3, "", block));
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
    append(`#${id}`, gen(h3, "", block));
    append(
      `#${id}`,
      gen(div, `${block}-code`, block, "code", { onchange: "updateOutput()" })
    );
  });

  grab("#markdown-code")[0].innerText = mdExampleText;

  function updateOutput() {
    function updatePreview(e) {
      append(`#preview-code`, e, "over");
    }
    var mdText = grab("#markdown-code")[0].innerText;
    // parsemd(mdText,updatePreview)
    parsemdbeta(mdText, updatePreview);
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
