import React, { useState } from 'react';
import './Cadastro.css';
import axios from "axios";
import {api} from "@/api.js"; 

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
    
    let formDataCompiled = {
      Name: formData.nomePropriedade,
      Description: formData.descricao,
      Rating: 0,
      Region: `${formData.cidade}/${formData.estado}`,
      Address: formData.endereco,
    }
    
    api.post('Hotels', formDataCompiled)
      .then(r => {
        if (r.status === 201) {
          console.log("Propriedade cadastrada com sucesso!");
        }
        else {
          console.error("Erro ao cadastrar propriedade:", r.statusText);
        }
      }
    );
  };

  
return (
    <div className="form-container">
      <h2>Anuncie sua Propriedade</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPropriedade;
