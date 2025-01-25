//calc

function loadheader() {
    append(header, gen(div, 'card', "", "card"), "over")
    append(card, gen(h1, "", "Calculator using GenetatorJs"))
    append(card,gen(nav,"nav",))
    append(nav,gen(ul,"navlist",""))
    append(navlist,gen(li,"",gen(a,"back","Examples","","/examples/")))
    append(navlist,gen(li,"",gen(a,"back","Home","","/")))
}


loadheader()

function loadCalculator(target) {

    load("./calc.scss")
    append(target,"","o")
    append(target, gen(section, "calc", "", "calc"))
    


    append(calc, gen(div, "buttonGroup", "", `buttonGroup`),)

    var buttonList = 'C,1,2,3,4,5,6,7,8,9,0,.,+,-,*,/,(,),Del,='
    buttonList.split(",").forEach(b => {
        if (`0123456789.`.includes(b) == false) {

            append(buttonGroup, gen(button, b, b, `calcButton, ${b},operator`, { "onclick": "buttonAction(this)" }))
        }
        else {

            append(buttonGroup, gen(button, b, b, `calcButton, ${b}`, { "onclick": "buttonAction(this)" }))
        }
    })
    append(calc, gen(input, "expression", "", `expression`), "before")
    append(main, gen(div, "calcHistory", gen(h2, "", "History"), "calcHistory"))


    function buttonAction(e) {
        var val = e.innerText
        if (val == "=") {
            // var res = evalFunction(expression.value)
            var res = Function("return " + expression.value)()
            append(calcHistory, gen(span, "", expression.value + ' = ' + res, `calcHistory`, { "onclick": "reEvaluate(this)" }), "after")
            expression.value = res
            // append(result, res, "over")
        } else if (val == "C") {
            expression.value = ''
        } else if (val == "Del") {
            expression.value = expression.value.substring(0, expression.value.length - 1)
        }
        else {

            expression.value += val
        }



    }
    window.buttonAction = buttonAction


    function reEvaluate(e) {
        var exp = e.innerText.split("=")[0]
        expression.value = exp;

    }

    window.reEvaluate = reEvaluate
}

loadCalculator(main)

load("./calc.scss")
load("/header.js")