const { createApp } = Vue

createApp({
    data() {
      return {
        novaTarefa: "",
        tarefas: ["Comprar pão", "comprar leite", "Comprar feijão"]
      }
    },
    methods: {
      cadastrarNovaTarefa() {
        if (this.novaTarefa != "") {
          // Verifica se a tarefa já existe no array
          if (!this.tarefas.includes(this.novaTarefa)) {
            this.tarefas.push(this.novaTarefa);
          }
          this.novaTarefa = "";
        }
      }
    }
  }).mount("#app");