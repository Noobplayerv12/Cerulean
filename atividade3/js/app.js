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



    

    marcasList.addEventListener("change", function () {

        
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

    buscar_preco.addEventListener("click", function () {
        if (!buscar_preco.attributes.getNamedItem("disabled")) {
            modal_de_busca.classList.remove("hide_modal")
        }
    })

    fechar_modal.addEventListener("click", function () {
        modal_de_busca.classList.add("hide_modal")
    })



});