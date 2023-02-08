import { addNote } from './fct.js';

//all notes----------------------------------------------

const getNotes:note[]|null=JSON.parse(localStorage.getItem('notes') as string).notes

export interface note{
    name:string
    text:string
    degree:number
    hue:number
}

let allNotes:note[]=getNotes?getNotes:[{name:'New Note',text:'type here',degree:5,hue:50}]


//elements import---------------------------------------------

const full=document.querySelector('.allNotes') as HTMLDivElement
let addEle:HTMLDivElement|null=document.querySelector('.addNote')
let dltEle:NodeListOf<HTMLDivElement>|null=document.querySelectorAll('.delete')
let allNotesEle:NodeListOf<HTMLDivElement>=document.querySelectorAll('.note')

//generate props------------------------------------------------

function gProps():{degree:number,hue:number}{
    const degree=10-Math.ceil(Math.random()*20)
    const hue=Math.ceil(Math.random()*355)
    return{degree,hue}
}

//display---------------------------------------------------------

export function displayNotes():void{
    full.innerHTML=''
    if(allNotes.length==0){
        addNote(full,'note',0,'New Note','type here',gProps())
    }else{
        let i=0
        allNotes.forEach(ele=>{
            const{name,text,degree,hue}=ele
            addNote(full,'note',i,name,text,{degree,hue})
            i++
        })
    }
    // if(allNotes.length<10){
        addNote(full,'addNote',-1,'New Note','type here',gProps())
        addEle=document.querySelector('.addNote') as HTMLDivElement
    // }
    dltEle=document.querySelectorAll('.delete') as NodeListOf<HTMLDivElement>
    addEle?.addEventListener('click',newNote)
    allNotesEle=document.querySelectorAll('.note') as NodeListOf<HTMLDivElement>
    dltEle.forEach(ele=>{
        ele?.addEventListener('mouseover',(e)=>dltHover(e,'2px solid red','7px','9px'))
        ele?.addEventListener('mouseleave',(e)=>dltHover(e,'','8px','10px'))
        ele?.addEventListener('click',dlt)
    })
    allNotesEle.forEach(ele=>{
        ele.childNodes[0].addEventListener('input',(e)=>changeNote(e,'name'))
        ele.childNodes[1].addEventListener('input',(e)=>changeNote(e,'text'))
    })
    localStorage.setItem('notes',JSON.stringify({notes:allNotes}))
}

//add Note-------------------------------------------------------

function newNote(e:Event){
    // if(allNotes.length>9)return
    const{degree,hue}=gProps()
    allNotes.push({name:'New Note',text:'type here',degree,hue})
    displayNotes()
}

//delete----------------------------------------------------------

function dltHover(e:Event,border:string,padding:string,top:string):void{
    const div=e.target as HTMLDivElement
    const ele:HTMLDivElement=allNotesEle[parseInt(div.id)]
    ele.style.setProperty('border',border)
    ele.style.setProperty('padding',padding)
    div.style.setProperty('border',border)
    div.style.setProperty('top',top)
    div.style.setProperty('right',top)
}

function dlt(e:Event):void{
    const div=e.target as HTMLDivElement
    allNotes=allNotes.filter(n=>allNotes.indexOf(n)!==parseInt(div.id))
    displayNotes()
}

//change note----------------------------------------------------

function changeNote(e:Event,mode:'name'|'text'){
    const div=e.target as HTMLTextAreaElement
    allNotes[parseInt(div.id)][mode]=div.value
    localStorage.setItem('notes',JSON.stringify({notes:allNotes}))
}

