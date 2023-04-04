window.addEventListener("DOMContentLoaded", (event) => {

    const baseUrl = "https://parallelum.com.br/fipe/api/v1/"

    const veiculos = document.querySelectorAll("#vehicles_types li")
    const marcasList = document.querySelector("#vehicles_brand")
    const modeloList = document.querySelector("#vehicles_model")
    const anosList = document.querySelector("#vehicles_year")
    let buscar_preco = document.querySelector(".search_button")
    let modal_de_busca = document.querySelector(".modal")
    let fechar_modal = document.querySelector(".close")
    let endpointMarcas = ""



    veiculos.forEach((element) => {
        if(element.classList.contains("active")){
            endpointMarcas = `${baseUrl}${element.getAttribute('data-type')}/marcas`
            marcasList.removeAttribute("disabled")
            fetch(`${endpointMarcas}`).then((res) => {

                return res.json()

            }).then((data) => {
                
                marcasList.innerHTML = ""
                marcasList.appendChild(document.createElement("option"))
                data.map((marca) => {
                    
                    let listItem = document.createElement("option")
                    listItem.innerText = marca.nome
                    listItem.value = marca.codigo
                    marcasList.appendChild(listItem)

                })
            })
        }
        element.addEventListener("click", function () {
            veiculos.forEach(item => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active")
                    this.classList.add("active")
                    endpointMarcas = `${baseUrl}${this.getAttribute('data-type')}/marcas`
                    marcasList.removeAttribute("disabled")
                    modeloList.setAttribute("disabled", true)
                    anosList.setAttribute("disabled", true)
                    fetch(`${endpointMarcas}`).then((res) => {

                        return res.json()

                    }).then((data) => {
                        marcasList.innerHTML = ""
                        modeloList.innerHTML = ""
                        anosList.innerHTML = ""
                        buscar_preco.setAttribute("disabled", true)
                        marcasList.appendChild(document.createElement("option"))
                        data.map((marca) => {
                            
                            let listItem = document.createElement("option")
                            listItem.innerText = marca.nome
                            listItem.value = marca.codigo
                            marcasList.appendChild(listItem)

                        })
                    })
                }
            })

           



        })

        
    })

listar_marcas()
listar_modelos()

    function listar_marcas(){
        marcasList.addEventListener("change", function () {
            modeloList.innerHTML = "";
            anosList.innerHTML = "";
        
            if (marcasList.value!== "") {
                modeloList.innerHTML = "";
                anosList.innerHTML = "";
                buscar_preco.setAttribute("disabled", true)
                fetch(`${endpointMarcas}/${this.value}/modelos`)
                    .then((resp) => {
    
                        return resp.json()
    
                    }).then((data) => {
    
                        modeloList.appendChild(document.createElement("option"))
                        data.modelos.map((modelo) => {
    
                            let listItem = document.createElement("option")
                            listItem.innerText = modelo.nome
                            listItem.value = modelo.codigo
                            modeloList.appendChild(listItem)
    
                        })
    
                    })
            modeloList.removeAttribute("disabled")
            } else {
                modeloList.setAttribute("disabled", true)
                anosList.setAttribute("disabled", true)
                buscar_preco.setAttribute("disabled", true)
            }
        })

    }

    function listar_modelos(){
        modeloList.addEventListener("change", () => {
            anosList.innerHTML = "";
            if (modeloList.value !== "") {
                fetch(`${endpointMarcas}/${marcasList.value}/modelos/${modeloList.value}/anos`)
                    .then((resp) => {
                        return resp.json()
                    }).then((data) => {
    
                        anosList.appendChild(document.createElement("option"))
    
    
                        data.map((anos) => {
                            let listItem = document.createElement("option")
                            listItem.innerText = anos.nome
                            listItem.value = anos.codigo
                            anosList.appendChild(listItem)
    
                        })
    
                    })
    
                anosList.removeAttribute("disabled")
            } else {
                anosList.setAttribute("disabled", true)
                buscar_preco.setAttribute("disabled", true)
            }
        })
    
        anosList.addEventListener("change", function () {
            buscar_preco.removeAttribute("disabled")
            buscar_preco.classList.add("search_button_show")
    
        })

    }

    

    buscar_preco.addEventListener("click", function () {
        if (!buscar_preco.attributes.getNamedItem("disabled")) {
            modal_de_busca.classList.remove("hide_modal")
        }
        fetch(`${endpointMarcas}/${marcasList.value}/modelos/${modeloList.value}/anos/${anosList.value}`)
                    .then((resp) => {
                        return resp.json()
                    }).then((data) => {
                        console.log(data)
                        let nomeveiculo = document.querySelector(".vehicle_name")
                        let mes_referencia = document.querySelector(".reference_month .value")
                        let codigo_fipe = document.querySelector(".fipe_code .value")
                        let marca = document.querySelector(".brand .value")
                        let ano = document.querySelector(".year .value")
                        let preco = document.querySelector(".price")

                        nomeveiculo.innerText = data['Modelo']
                        mes_referencia.innerText = data['MesReferencia']
                        codigo_fipe.innerText = data['CodigoFipe']
                        marca.innerText = data['Marca']
                        ano.innerText = data['AnoModelo']
                        preco.innerText = data['Valor']

                    })
        
       
    })

    fechar_modal.addEventListener("click", function () {
        modal_de_busca.classList.add("hide_modal")
    })



});