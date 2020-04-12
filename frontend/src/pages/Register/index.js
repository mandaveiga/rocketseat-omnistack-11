import React from 'react';
import { useState } from 'react';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';


import './styles.css';


export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);

        } catch (err) {
            alert('Erro no cadasro')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt='Be the Hero' />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                             Não tenho cadastro
                            </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}

                    />
                    <input tupe="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                    <input placeholder="whatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}

                    />

                    <div className="input-group">
                        <input placeholder="cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}

                        />
                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}

                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}