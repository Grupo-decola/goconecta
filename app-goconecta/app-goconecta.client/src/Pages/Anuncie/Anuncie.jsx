import React from 'react';
import './Anuncie.css'; // Optional: for external styling

function AnuncieSuaPropriedade() {
    return (
        <div className='anuncieContainer' style={{ backgroundColor: '#fff', padding: '2rem', fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <h2 style={{ color: '#DA7818' }}>🏡 Anuncie sua Propriedade e Conquiste Mais Hóspedes!</h2>
            <p>Tem uma casa, apartamento, chalé ou pousada incrível? Transforme seu espaço em uma fonte de renda extra anunciando aqui!</p>
            <ul>
                <li>📍 Alcance milhares de viajantes em busca de hospedagem única.</li>
                <li>💬 Suporte dedicado para te ajudar em cada etapa.</li>
                <li>🔒 Segurança e transparência em todas as reservas.</li>
                <li>📸 Destaque sua propriedade com fotos e descrições personalizadas.</li>
            </ul>
            <h3 style={{ color: '#DA7818' }}>Como funciona:</h3>
            <ol>
                <li>Cadastre sua propriedade com detalhes e imagens.</li>
                <li>Defina disponibilidade, preços e regras da casa.</li>
                <li>Receba reservas e acompanhe tudo pela nossa plataforma.</li>
            </ol>

            <p style={{ marginTop: '1rem' }}>
                👉 <button className="btn-comunidade">Comece agora e faça parte da nossa comunidade de anfitriões!</button>
            </p>

        </div>
    );
}

export default AnuncieSuaPropriedade;
