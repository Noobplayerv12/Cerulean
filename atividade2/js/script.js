const botao = document.querySelector("#botao")
const texto = document.querySelector("#texto")
const ul = document.querySelector("ul")
const li = document.querySelectorAll("li")

function cria_lista_de_tarefas(){

    if(texto.value){

        ul.classList.remove("d-none")
        let li = document.createElement("li")
        li.classList.add('list-group-item')
        ul.insertBefore(li, ul.firstChild).append(texto.value)
        
        seleciona_tarefas_da_lista(li)
        
       texto.value = ""
   }
   
}

function seleciona_tarefas_da_lista(lista){
    
    lista.addEventListener("click", function(){

        lista.classList.toggle("active")     
    })

}

botao.addEventListener("click", function(){
   
   cria_lista_de_tarefas()   
 })
 
 
 texto.addEventListener("keypress", function(e){
    
    if(e.key === "Enter"){

        cria_lista_de_tarefas()
    }
 })
 






