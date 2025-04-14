// append(header, gen(div, 'card', "card", "card"), "over")

var todoid = 0
const addtodo = (e) => {
    append(todolist, gen(li, 'list' + todoid++, gen(p, "", e.value), 'list', { "onclick": "edit(this)" }))
}

const edit = (e) => {
    var val = e.childNodes[0].innerText
    append(`#${e.id}`, gen(input, e.id, val, 'list', { "onblur": "update(this)", "value": val }), 'replace')
    document.getElementById(e.id).focus()
}

const update = (e) => {
    if (e.value == "") { append(`#${e.id}`, "", "replace"); return }
    var time = new Date().toLocaleTimeString()
    append(`#${e.id}`, gen(li, e.id, gen(p, "", e.value), 'list', { "onclick": "edit(this)" }), 'replace')
    append(`#${e.id}`, gen(p, '', time, 'time'))

}

function loadTodo(target) {



    append(target, gen(section, "todo", gen(h1, '', "Todo App with GeneratorJs")), "over")

    append(todo, gen(textarea, "input", "", "input", { "value": "Enter your todo here", "onblur": "addtodo(this)" }))
    append(todo, gen(ol, "todolist", ""))


    append(todo, gen(div, "todobox"), "parent")


    var scss = `
#todo{
    padding:20px;
    border-radius:5px;
    background-color:grey;
    box-shadow: 0 0 10px 0 rgba(0,0,100,0.2);
    textarea{
        padding:10px;
        border-radius:5px;
        font-size:20px;
        margin-block:10px;
        height:3rem;
        width:calc(100% - 10px - 10px);
    }
    .list{
        display:flex;
        justify-content:space-between;
        flex-direction:row;
        flex-wrap:wrap;
        position:relative;
        .time{
            color:green;
            font-size:.8rem;
            font-style:italic;
            position:absolute;
            top:0;
            left:calc(100% - 7rem);
            padding:0px;
        }
        p{
            display:inline-block;
        }
    }
    ol{
        // display:flex;
        // flex-align:start;
        // flex-direction:column;
        display:grid;
        grid-gap:10px;
        grid-template-columns:repeat( auto-fit, minmax(min(250px,calc(100% - 20px)), 1fr) );
        li{box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);}
        overflow-y:auto;
        li{
            position:relative;
            width:calc(100% - 10px - 10px);
            p{
                word-wrap: break-word;
                width:calc(100% - 10px - 10px);
            }

        }
        
    }


`

    loadscss(scss)
}

loadTodo(main)
// loadTodo(footer)


loadscss(`

#todo{
    position:relative;
    z-index:3;
    background-color:hsl(150,60%,10%,0.4);
    
}
textarea{
    background-color:hsl(150,60%,10%,0.5);
    color:white;
}

input{
    background-color:hsl(270,60%,10%,0.5);
    color:white;
}

#todobox{
    
    margin-block:20px;
    position:relative;
    &:after{
        content:"";
        inset:-4px;
        z-index:1;
        position:absolute;
        background-image:conic-gradient(#A100FFFF,#119CFDFF);
        filter:blur(10px);
        border-radius:2px;
    }

   
}


`)