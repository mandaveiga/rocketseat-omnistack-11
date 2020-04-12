import React from 'react';
import { useState } from 'react';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            history.push('/profile');

        } catch (err) {
            alert("falha");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}

                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes" style={{ marginLeft: 50 }} />
        </div>

    );
}