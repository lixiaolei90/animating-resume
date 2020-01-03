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
#code {
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
#paper {
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
#paper > .content {
  background: white;
 
  height: 100%;
  width: 100%;
}
`;
var result = `
/*
接下来利用marked.js把Markdown转成HTML
*/
`;

var md = `
# 自我介绍
`;
function writeCode(pretext, text, fn) {
  let preResult = '' || pretext ;
  let n = 0;
  let timer = setInterval(() => {
    n += 1;
    var code = document.getElementById('code');
    var sty = document.getElementById('sty');
    code.innerHTML = Prism.highlight(preResult + text.substring(0, n), Prism.languages.css, 'css')
    code.scrollTop = 1000000
    sty.innerHTML = pretext + text.substring(0, n)
    
    if (n >= text.length) {
      clearInterval(timer)
      fn.call()
    }
  }, 0)
}

function writeMarkdown(md, fn) {
  var text = md;
  var domMD = document.querySelector('#paper > .content');
  let n = 0;
  let timer = setInterval(() => {
    n += 1;

    // domMD.innerHTML = Prism.highlight( text.substring(0, n), Prism.languages.markdown, 'markdown')
    domMD.innerHTML = text.substring(0, n);
    domMD.scrollTop = 1000000
    
    
    if (n >= text.length) {
      clearInterval(timer)
      fn.call()
    }
  }, 0)
}

function mdToHTML(md) {
  // var text = md;
  var domMD = document.querySelector('#paper > .content');
  domMD.innerHTML = marked(md)
}

// function convertMarkdownToHtml(fn){
//   var div = document.createElement('div')  
//   div.className = 'html markdown-body'
//   div.innerHTML = marked(md)
//   let markdownContainer = document.querySelector('#paper > .content')
//   markdownContainer.replaceWith(div)
//   fn && fn.call()
// }
writeCode('', text, ()=> {
  createPaper(() => {
    writeCode(text, result, () => {
      writeMarkdown(md,() => {
        mdToHTML(md)
      })
    })
  })
})

function createPaper(fn) {
  var paper = document.createElement('div');
  paper.id = 'paper';
  var content = document.createElement('pre');
  content.className = 'content';
  paper.appendChild(content)
  document.body.appendChild(paper);
  fn.call()
}


