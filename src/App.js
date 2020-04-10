import React, { useState, useEffect } from 'react';
import Form from './components/Form';

function App() {
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imgPerPage = 30;
      const key = '15974490-e31af621ddc6188662bda45f2';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPerPage}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setBusqueda(resultado.hits);
    }
    consultarAPI();
  }, [busqueda]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Form
          setBusqueda={setBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
