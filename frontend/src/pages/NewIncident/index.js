import React from 'react';
import './styles.css';
import { useState } from 'react';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

export default function NewIncident() {
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };
        try {
            await api.post('incidents', data,
                {
                    headers: {
                        Authorization: ongId,
                    }
                });
            history.push('/profile');
        } catch (err) {
            alert('Erro no cadasro')
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt='Be the Hero' />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolve-lo</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para home
                        </Link>
                </section>

                <form onSubmit={handleRegister} >
                    <input placeholder="Titulo"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}

                    />
                    <textarea placeholder="Descriçao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}

                    />

                    <input placeholder="Valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)}

                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}