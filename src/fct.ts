// create element ------------------------------------------

function createEle(cls:string,ele:string):HTMLElement{
    const div=document.createElement(ele) as HTMLElement
    div.classList.add(cls)
    return div
}

// add note ------------------------------------------

export function addNote(div:HTMLDivElement,noteType:string,id:number,name:string,text:string|null,props:{degree:number,hue:number}):void{   
    const par=div.appendChild(createEle('fullNote','div'))
    const child=createEle(noteType,'div')
    let nameEle:HTMLTextAreaElement|HTMLHeadElement
    if(noteType!=='addNote'){
        const textEle=createEle('text','textarea')
        nameEle=createEle('name','textarea')
        nameEle.innerText=name
        textEle.innerText=text as string
        textEle.setAttribute('spellcheck','false')
        nameEle.setAttribute('spellcheck','false')
        nameEle.setAttribute('maxlength','20')
        child.appendChild(nameEle)
        child.appendChild(textEle)
        child.style.setProperty('transform',`rotate(${props.degree}deg)`)
        child.style.setProperty('background',`hsl(${props.hue}, 50%, 80%)`)
        const dltEle=createEle('delete','div')
        dltEle.id=String(id)
        nameEle.id=String(id)
        textEle.id=String(id)
        child.appendChild(dltEle)
    }else{
        nameEle=createEle('name','h1')
        nameEle.innerText="Add Note"
        child.appendChild(nameEle)
    }
    child.id=noteType==='addNote'?'addNote':String(id)
    par.appendChild(child)
}

