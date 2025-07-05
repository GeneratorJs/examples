
// import htmltocanvas from 'htmltocanvas'

async function saveImage(){
  // code to download #gridRoot as png;
  // console.log('pending export to png')
  var elem = grab(`#gridRoot`)[0]
  var canvas = await htmltocanvas(elem)
  var link = gen(a,`savepng`,"","button",{"link":canvas.toDataURL('image/png'),download:"GeneratorJS-Demo"})
  link.click()
  append(savepng,"","r")

}
