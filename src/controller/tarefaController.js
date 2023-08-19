
import { AlterarTarefa, DeletarTarefa, InserirTarefa, ListarTarefasFinalizadas, ListarTodasTarefas } from "../repository/tarefaRepository.js";

import { Router } from "express";


const server = Router();


server.post('/tarefa', async (req, resp) => {

    try {

        const tarefaParaInserir = req.body;

        if (!tarefaParaInserir.descricao)
            throw new Error('Descrição da tarefa obrigatória')

        if (tarefaParaInserir.ordem == undefined || tarefaParaInserir.ordem < 0)
        throw new Error('Ordem da tarrefa obrigatória')

        if (tarefaParaInserir.finalizado == undefined)
        throw new Error('Tarefa finalizada obrigatória')

        if (!tarefaParaInserir.datacadastro)
        throw new Error('Data da tarefa obrigatória obrigatória')

        const tarefaInserida = await InserirTarefa(tarefaParaInserir);

        resp.send(tarefaInserida)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})


server.get('/tarefa', async (req, resp) => {
    try {

        const resposta = await ListarTodasTarefas();

        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/tarefa/finalizado', async (req, resp) => {
    try {
        
        const resposta = await ListarTarefasFinalizadas();

        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.delete('/tarefa/:id', async (req, resp) => {
    try {

        const {id} = req.params
        const resposta = await DeletarTarefa(id);

        if(resposta != 1)
            throw new Error ('Tarefa não pode ser removida.')

        resp.status(204).send()

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.put('/tarefa/:id', async (req, resp) => {

    try {

        const {id} = req.params;
        const tarefa = req.body;

        if (!tarefa.descricao)
            throw new Error('Descrição da tarefa obrigatória')

        if (tarefa.ordem == undefined || tarefa.ordem < 0)
        throw new Error('Ordem da tarrefa obrigatória')

        if (tarefa.finalizado == undefined)
        throw new Error('Tarefa finalizada obrigatória')

        if (!tarefa.datacadastro)
        throw new Error('Data da tarefa obrigatória')

        const resposta = await AlterarTarefa(id, tarefa);

        if(resposta != 1)
            throw new Error('Filme não pode ser alterado')

        resp.status(204).send()

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})



export default server;