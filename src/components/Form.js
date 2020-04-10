import React, { useState } from 'react';
import Error from './Error';

const Form = ({ setBusqueda }) => {
    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    // Search images
    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if(termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // Send termino to App
        setBusqueda(termino);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen. Ej: Fútbol, Café"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agrega un término de búsqueda" /> : null}
        </form>
    );
}
 
export default Form;