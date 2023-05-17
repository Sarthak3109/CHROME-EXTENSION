function AddEventListenersToTheMainOuterDivToEnableDrag(outer_div){
let isDragging = false;
let mouseOffsetX = 0;
let mouseOffsetY = 0;


  outer_div.addEventListener('mousedown', function(e) {
  
    isDragging = true;
    mouseOffsetX = e.clientX - outer_div.offsetLeft;
    mouseOffsetY = e.clientY - outer_div.offsetTop;
  });
  
  outer_div.addEventListener('mousemove', function(e) {
    // e.stopPropagation()
    if (isDragging) {
      outer_div.style.left = (e.clientX - mouseOffsetX) + 'px';
      outer_div.style.top = (e.clientY - mouseOffsetY) + 'px';
    }
  });
  
  outer_div.addEventListener('mouseup', function(e) {
    isDragging = false;
  });
}







function AddEventListenersToBoldButton(bold_btn,content_div){
  bold_btn.addEventListener('click',()=>{

    if(content_div.style.fontWeight === 'bold')
      content_div.style.fontWeight = 'normal'
    else
    content_div.style.fontWeight = 'bold'
  })
}








function AddEventListenersToItalicButton(italic_btn,content_div){
  italic_btn.addEventListener('click',()=>{
    if(content_div.style.fontStyle === 'italic')
      content_div.style.fontStyle = 'normal'
    else
    content_div.style.fontStyle = 'italic'
  })
}


function AddEventListenersToCopyButton(copy_btn,content_div){
  copy_btn.addEventListener('click',()=>{
    let text = content_div.innerText;
    let flash = document.createElement('div')
    flash.innerHTML = 'message copied'
    flash.className = 'flash'
    document.body.appendChild(flash)
    setTimeout(()=>{
      document.body.removeChild(flash)
    }, 1000)
    let textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)


    
    textarea.select()
    document.execCommand('copy')
    textarea.parentNode.removeChild(textarea)
  })
}






chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ask-me_anything") {
    let originalActiveElement;
    let text;


    if (
      document.activeElement &&
      (document.activeElement.isContentEditable ||
        document.activeElement.nodeName.toUpperCase() === "textarea" ||
        document.activeElement.nodeName.toUpperCase() === "textarea")
    ) {
      // Set as original for later
      originalActiveElement = document.activeElement;
      // Use selected text or all text in the textarea
      text =
        document.getSelection().toString().trim() ||
        document.activeElement.textContent.trim();
    } else {
      // If no active text textarea use any selected text on page
      text = document.getSelection().toString().trim();
    }

    if (!text) {
      alert(
        "No text found."
      );
      return;
    }






    
    if(document.getElementById('outer_div'))
    document.body.removeChild(document.getElementById('outer_div'))


    



    // declaration of all the major elements
    let outer_div = document.createElement('div')
    let cancel_button = document.createElement('div')
    let close_div = document.createElement('div')
    let content_div = document.createElement('div')
    let main_content_text = document.createTextNode(text)
    let bold_btn = document.createElement('button')
    let italic_btn = document.createElement('button')
    let buttons = document.createElement('div')
    let copy_btn = document.createElement('button')
    

    // applying class attribute and setting some attribbites to these elements
    buttons.className = 'buttons'
    content_div.className = 'content_class'
    close_div.className = 'close_div'
    cancel_button.className = 'close_button'
    close_div.style.padding= '2%'
    outer_div.id = 'outer_div'
    content_div.setAttribute('contenteditable', true)
    cancel_button.innerHTML = 'X'
    bold_btn.innerHTML = 'B'
    italic_btn.innerHTML = '𝐼'
    copy_btn.innerHTML = 'C'




    // merging all these elements and form a tree like structure
    buttons.appendChild(bold_btn)
    buttons.appendChild(italic_btn)
    buttons.appendChild(copy_btn)
    close_div.appendChild(buttons)
    close_div.appendChild(cancel_button)
    content_div.append(main_content_text)
    outer_div.appendChild(close_div);
    outer_div.appendChild(content_div);
    document.body.appendChild(outer_div);
    // content_div.style.fontWeight = 'bold'
    
    

  


    // ADDING EVENT LISTENES
    AddEventListenersToTheMainOuterDivToEnableDrag(outer_div)
    AddEventListenersToBoldButton(bold_btn, content_div)
    AddEventListenersToItalicButton(italic_btn, content_div)
    AddEventListenersToCopyButton(copy_btn, content_div)
    cancel_button.addEventListener('click', ()=>{
      outer_div.style.display = 'none'
    })
  
    return;
  }
});
