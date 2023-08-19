
import { con } from "./connection.js";


export async function InserirTarefa (tarefa) {
    const comando = 
        ` INSERT INTO TB_TAREFA (DS_TAREFA, NR_ORDEM, BT_FINALZADO, DT_CADASTRO)
                VALUES(?, ?, ?, ?) `

    const [resposta] = await con.query(comando, [tarefa.descricao, tarefa.ordem, tarefa.finalizado, tarefa.datacadastro])
    tarefa.id = resposta.insertId;

    return tarefa;

}


export async function ListarTodasTarefas () {
    const comando = 
        `SELECT * FROM
            TB_TAREFA;`

    const [linhas] = await con.query(comando);
    return linhas;

}


export async function ListarTarefasFinalizadas () {
    const comando = 
        `SELECT * FROM TB_TAREFA
        WHERE BT_FINALZADO = 1`

    const [linhas] = await con.query(comando);
    return linhas;

}


export async function DeletarTarefa (id) {
    const comando = 
        `DELETE FROM TB_TAREFA
        WHERE ID_TAREFA = ?`

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;

}


export async function AlterarTarefa (id, tarefa) {
    const comando = 
        `UPDATE TB_TAREFA
            SET DS_TAREFA           = ?, 
                NR_ORDEM            = ?, 
                BT_FINALZADO        = ?, 
                DT_CADASTRO         = ?
            WHERE ID_TAREFA         = ? `

    const [resposta] = await con.query(comando, [tarefa.descricao, tarefa.ordem, tarefa.finalizado, tarefa.datacadastro, id])
    return resposta.affectedRows
}