import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';
import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('incidents', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [incidents]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
        } catch (err) {
            alert('Erro ao deletar');
        }
    }
    function handleLogoute() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongNome}</span>

                <Link className='button' to="/incident/new" >Cadastrar novo caso</Link>
                <button onClick={handleLogoute} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.titulo}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.descricao}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.valor)}</p>
                        <button onClick={() => handleDelete(incident.ID)} type="button">
                            <FiTrash2 size={20} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}