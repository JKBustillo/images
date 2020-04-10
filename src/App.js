import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imgPerPage = 30;
      const key = '15974490-e31af621ddc6188662bda45f2';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPerPage}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);

      setTotalPaginas(Math.ceil(resultado.totalHits / imgPerPage));

      // Mover para arriba
      document.querySelector('.jumbotron').scrollIntoView({ behavior: 'smooth' });
    }
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalPaginas) return;

    setPaginaActual(nuevaPaginaActual);
  }

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

        { (paginaActual === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >Anterior &laquo;</button>
        )}

        { (paginaActual === totalPaginas) ? null: (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
