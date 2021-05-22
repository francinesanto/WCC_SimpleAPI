const moment = require('moment');
const conexao = require('../infra/conexao');

class Agendamento {

    listagem(resp){
        const sql = 'SELECT  * FROM agendamentos';

        conexao.query(sql,(error,results) =>{
            if(error){
                resp.status(400).json(error)
            }
            resp.status(201).json(results);
        });
    };

    buscaPorId(id,resp){
        const sql = 'SELECT * FROM agendamentos WHERE id = ?';
        conexao.query(sql,id,(error, result) =>{
            if(error){
                resp.status(400).json(error);
            }
            resp.status(201).json(result)
        });
    }

    inserir(agendamento, resp){
        const sql = `INSERT INTO agendamentos SET ?`;

        const data_servico = moment(agendamento.data_servico).format('YYYY-MM-DD');
        const data_agendamento = moment().format('YYYY-MM-DD');

        const agendamentoComData = {...agendamento,data_agendamento,data_servico};
        const ehDataValida = moment(agendamento.data_servico).isSameOrAfter(data_agendamento);
        const ehNomeValido =  agendamento.nome_cliente.length > 2;

        const validaçoes = [
            {
                nome:" data_servico",
                valido: ehDataValida,
                mensagem:"Data do agendamento deve ser igual ou superior a data de hoje"
            },
            {
                nome:"nome_cliente",
                valido: ehNomeValido,
                mensagem:"O nome do cliente deve ter ao menos 3 dígitos"
            }
        ];

        const errors= validaçoes.filter(campo => !campo.valido);

        if(errors.length > 0){
            return resp.status(400).json(errors)        
        }
        conexao.query(sql, agendamentoComData, (error, results) => {
            if (error){
                throw Error
            };
            resp.status(201).json(results);

        });


    }
}

module.exports = new Agendamento;