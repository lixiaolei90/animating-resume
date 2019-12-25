var text = `
/*
你好，我是A
我将以动画的形式来介绍我自己
只用文字介绍太单调了
我就用代码来介绍吧
首先准备一些样式 
*/

* {
  transition: all 1s;
}
html {
  background: rgb(222,222,222);
  font-size: 16px;
}
#code {
  border: 1px solid red;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector {
    color: #690;
}
.token.property {
    color: #905;
}
.token.function {
    color: #2f9c0a;
}
/*
我来介绍一下我自己
我需要一张白纸
*/

`;

var n = 0;
var timer = setInterval(()=>{
  n += 1;
  var code = document.getElementById('code');
  var sty = document.getElementById('sty');
  code.innerHTML = text.substring(0,n)
  code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css')
  sty.innerHTML = text.substring(0,n)
  console.log('one')
  if(n >= text.length) {
    clearInterval(timer)
    fn2()
    fn3(text)
  }
}, 10)

function fn2() {
  var paper = document.createElement('div');
  paper.id = 'paper';
  document.body.appendChild(paper);
}

function fn3(preResult) {
  var result = `
    #paper {
      height: 100px;
      width: 100px;
      background: red;
    }
  `;
  var n = 0;
  var timer = setInterval(() => {
    n += 1;
    
    code.innerHTML = preResult + result.substring(0,n);
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css')
    sty.innerHTML = preResult + result.substring(0,n)
    console.log('yici')
    if(n >= result.length) {
      clearInterval(timer)
    }
  },
  5)
}