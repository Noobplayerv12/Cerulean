
window.addEventListener("DOMContentLoaded", (event) => {
  const {createApp} = Vue

  createApp({
      data() {
        return {
          novaTarefa: '',
          tarefas: ['Lavar louça','lavar roupa']
        }
  
        },
        computed:{
  
  
          },
          methods: {
              inserirTarefa(){
                  this.tarefas.push(this.novaTarefa)
              }
      }
    }).mount('#app')
})

