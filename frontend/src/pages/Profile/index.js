import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from "../../assets/logo.svg";


export default function Profile (){
    const [incident, setIncident] = useState ([]);

    const history = useHistory (); 

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

   

   /*Função que serve para disparar uma função em determinado momento do componente. ex: assim que é mostrado em tela
    2 pars: qual função vc quer q execute, quando vc quer q seja executada

    2:array de depenpencia,ou seja toda vez que as informações do array mudarem ele irá executar novamente.

    rota profile pra pegar todos os incidents
    depois passa a ong q está logada
    usa o estado do componente pra gravar os resultados deles
   */
   useEffect(() => {
       api.get('profile',{
           headers: {
               Authorization: ongId,
           }
       }).then(response =>{
           setIncident(response.data);
       })
   }
   ,[ongId]);

  async function handleDeletIncident (id){
       try {
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
            /*varredura no array incident para remove-lo da tela
            manter apenas os incidents != de deletado*/
            setIncident(incident.filter(incident => incident.id != id));
       }catch (err){
           alert('Erro ao deletar caso. Tente novamente.');
       }
   }


   function handleLogout (){
    localStorage.clear();

    history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new" >Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
              {incident.map(incident => (
                  /*key é utilizado para identificar o item caso seja necessario fazer alterações*/
                  <li key={incident.id}>
                    <strong>Caso: </strong>
                    <p>{incident.title}</p>

                    <strong>Descrição: </strong>
                    <p>{incident.description}</p>

                    <strong>Valor: </strong>
                    <p>{Intl.NumberFormat('pt-br',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeletIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                 </li>
              ))}
            </ul>
        </div>
    ); 
}