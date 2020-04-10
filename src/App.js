import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imgPerPage = 30;
      const key = '15974490-e31af621ddc6188662bda45f2';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPerPage}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
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
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
      </div>
    </div>
  );
}

export default App;
