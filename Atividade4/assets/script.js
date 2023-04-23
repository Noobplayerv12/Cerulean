window.addEventListener("DOMContentLoaded", (event) => {

  const { createApp } = Vue
    
  createApp({

    data(){
      return {
        novaTarefa: '',
        tarefas: []
      }
    },

    computed:{
      tarefaExiste(){
      return !!this.tarefas.find(tarefa => tarefa == this.novaTarefa)
      }
    },

    methods:{
      inserirTarefa(){
        if(this.novaTarefa && !this.tarefaExiste){
          this.tarefas.push(this.novaTarefa)
          this.novaTarefa = ''
        }
      },
    }

  }).mount('#app')

  
})
