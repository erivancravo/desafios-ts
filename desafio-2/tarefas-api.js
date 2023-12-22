const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Conectar ao banco de dados MongoDB

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.ab4t7fk.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectou ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
  }
};

// Chamada da função
connectDatabase();

// Definir o modelo para as tarefas
const tarefaSchema = new mongoose.Schema({
  titulo: String,
  concluida: Boolean,
});

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

// Rotas CRUD

// Listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await Tarefa.find(); // Correção aqui
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar uma nova tarefa
app.post("/tarefas", async (req, res) => {
  try {
    const { titulo } = req.body;
    const novaTarefa = await Tarefa.create({ titulo });
    res.status(201).json(novaTarefa);
    console.log("heeey");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obter uma tarefa por ID
app.get("/tarefas/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    res.json(tarefa);
  } catch (error) {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
});

// Atualizar uma tarefa por ID
app.put("/tarefas/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndUpdate(
      req.params.id,
      { concluida: req.body.concluida },
      {
        new: true,
      }
    );
    res.json(tarefa);
  } catch (error) {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
});

// Deletar uma tarefa por ID
app.delete("/tarefas/:id", async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "Tarefa não encontrada" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
