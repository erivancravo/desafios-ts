const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === +req.params.id);
  if (user) {
    res.json({ user: user });
  } else {
    res.status.json({ message: "Achamo o menor" });
  }
});

app.post("/users", (req, res) => {
  const { username, email, password, avatar } = req.body;
  if (!username || !email || !password || !avatar) {
    return res
      .status(400)
      .send({ message: "Preencha todos os campos meu nobre" });
  } else {
    const newUser = { id: users.length + 1, username, email, password, avatar };
    users.push(newUser);
    res
      .status(201)
      .json({ message: "Cadastramo o menor meu nobre", user: newUser });
  }
});

app.put("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === +req.params.id);

  if (user) {
    Object.assign(user, req.body);
    res.json({ message: "menor alterado com sucesso", user });
  } else {
    res.status(404).json({ message: "Usuário não encontrado meu nobre" });
  }
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === +req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "removemos ele meu nobre" });
  } else {
    users.status(404).json({ message: "não achamo o menor meu nobre" });
  }
});

app.listen(PORT, () => console.log(`O servidor ta na porta ${PORT} meu nobre`));
