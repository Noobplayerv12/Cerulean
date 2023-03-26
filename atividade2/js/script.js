const botao = document.querySelector("#botao")
const texto = document.querySelector("#texto")
const ul = document.querySelector("ul")
const li = document.querySelectorAll("li")


function cria_lista_de_tarefas(){
    if(texto.value){
        ul.classList.remove("d-none")
        var li = document.createElement("li")
        li.classList.add('list-group-item')
        ul.appendChild(li).append(texto.value)
        li.addEventListener("click", function(){

           if(!li.classList.contains("active")){
               li.classList.add("active")
           }else{
               li.classList.remove("active")
           }
       })
       texto.value = ""
   }

}

botao.addEventListener("click", function(){
   
   cria_lista_de_tarefas()
 
    
 })
 
 
 texto.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        cria_lista_de_tarefas()
    }
 })
 






