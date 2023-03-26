const botao = document.querySelector("#botao")
const texto = document.querySelector("#texto")
const ul = document.querySelector("ul")
const li = document.querySelectorAll("li")


botao.addEventListener("click", function(){
   
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
 
    
 })
 
 
 texto.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
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
 })
 






