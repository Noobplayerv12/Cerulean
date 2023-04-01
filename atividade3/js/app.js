window.addEventListener("DOMContentLoaded", (event) => {

    const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
    const endpointMarcas = `${baseUrl}carros/marcas`

    const marcasList = document.querySelector("#vehicles_brand")
    const modeloList = document.querySelector("#vehicles_model")
    const anosList = document.querySelector("#vehicles_year")
    buscar_preco = document.querySelector(".search_button")
    modal_de_busca = document.querySelector(".modal")
    fechar_modal = document.querySelector(".close")

    marcasList.removeAttribute("disabled")
    fetch(endpointMarcas)
        .then((res)=>{
            
            return res.json()
            
        }).then((data)=> {

            data.map((marca)=>{

                let listItem = document.createElement("option")
                listItem.innerText = marca.nome
                listItem.value = marca.codigo
                marcasList.appendChild(listItem)
        
            })
        })
    
    marcasList.addEventListener("change", function () {

        modeloList.innerHTML = "";
        anosList.innerHTML = "";
        fetch(`${endpointMarcas}/${this.value}/modelos`)
            .then((resp) => {

                return resp.json()

            }).then((data) => {

                modeloList.appendChild(document.createElement("option"))
                data.modelos.map((modelo)=>{

                    let listItem = document.createElement("option")
                    listItem.innerText = modelo.nome
                    listItem.value = modelo.codigo
                    modeloList.appendChild(listItem)

                })

            })
            modeloList.removeAttribute("disabled")
    })

    modeloList.addEventListener("change", () => {

        anosList.innerHTML = "";

        fetch(`${endpointMarcas}/${marcasList.value}/modelos/${modeloList.value}/anos`)
            .then((resp) => {
                return resp.json()
            }).then((data) => {

                anosList.appendChild(document.createElement("option"))
                

                data.map((anos)=>{
                    let listItem = document.createElement("option")
                    listItem.innerText = anos.nome
                    listItem.value = anos.codigo
                    anosList.appendChild(listItem)
                   
                })

            })

           anosList.removeAttribute("disabled")
          
    })  

    anosList.addEventListener("change", function(){
        
    buscar_preco.classList.add("search_button_show")
    
       
    })

    buscar_preco.addEventListener("click", function(){
        modal_de_busca.classList.remove("hide_modal")
        
    })
    
    fechar_modal.addEventListener("click", function(){
        window.location.reload()
    })
    
 

});