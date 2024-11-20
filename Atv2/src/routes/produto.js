const express = require("express")
const router = express.Router()
const Produto = require("../models/produto")

router.post("/", async (req, res) => {
    const dados = req.body

    try {
        const novoProduto = new Produto(dados)
        const produtoSalvo = await novoProduto.save()

        res.status(201).send(produtoSalvo)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao criar produto" })
    }
});

router.get("/", async (req, res) => {
    try {
        const produtos = await Produto.find()
        res.send(produtos)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao obter produtos" })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const produto = await Produto.findById(id)
        if (!produto) {
            return res.status(404).send("Produto não encontrado")
        }

        res.send(produto)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao obter produto" })
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const dadosAtualizados = req.body

        const produtoAtualizado = await Produto.findByIdAndUpdate(id, dadosAtualizados, {
            new: true,
            runValidators: true
        });

        if (!produtoAtualizado) {
            return res.status(404).send("Produto não encontrado")
        }

        res.send(produtoAtualizado)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao atualizar produto" })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const produtoExcluido = await Produto.findByIdAndDelete(id)
        if (!produtoExcluido) {
            return res.status(404).send("Produto não encontrado")
        }

        res.send("Produto deletado com sucesso")
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao deletar produto" })
    }
});

module.exports = router