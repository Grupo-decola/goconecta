import React, { useState } from 'react';
import './Cadastro.css'; 

function CadastroPropriedade() {
  const [formData, setFormData] = useState({
    nomePropriedade: '',
    descricao: '',
    endereco: '',
    cidade: '',
    estado: '',
    precoPorNoite: '',
    tipoPropriedade: '',
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para uma API ou backend
    console.log('Dados enviados:', formData);
  };

  
return (
    <div className="form-container">
      <h2>Anuncie sua Propriedade</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome da Propriedade:</label>
        <input type="text" name="nomePropriedade" onChange={handleChange} required />

        <label>Descrição:</label>
        <textarea name="descricao" onChange={handleChange} required />

        <label>Imagem da Propriedade:</label>
        <input type="file" name="imagem" accept="image/*" onChange={handleChange} />

        <label>Endereço:</label>
        <input type="text" name="endereco" onChange={handleChange} required />

        <label>Cidade:</label>
        <input type="text" name="cidade" onChange={handleChange} required />

        <label>Estado:</label>
        <input type="text" name="estado" onChange={handleChange} required />

        <label>Preço por Noite (R$):</label>
        <input type="number" name="precoPorNoite" onChange={handleChange} required />

        <label>Tipo de Propriedade:</label>
        <select name="tipoPropriedade" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="hotel">Hotel</option>
          {/* <option value="apartamento">Apartamento</option>
          <option value="chalé">Chalé</option>
          <option value="fazenda">Fazenda</option> */}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPropriedade;
