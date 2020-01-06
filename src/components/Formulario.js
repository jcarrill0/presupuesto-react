import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';

const Formulario = (props) => {

    const { guardarGasto, guardarCrearGasto } = props;

    // state 
    const [nombreGasto, guardarNombreGasto] = useState('');
    const [cantidadGasto, guardarCantidadGasto] = useState('');
    const [error, guardarError] = useState(false);

    // Cuando se agrega el gasto
    const agregarGasto = e => {
        e.preventDefault();

        // Validar
        if(cantidadGasto < 1  || isNaN(cantidadGasto) || cantidadGasto === '') {
            guardarError(true);
            return;
        } 

        // Construir objeto de gasto
        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()
        }

        // Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);    

        // Eliminar alerta
        guardarError(false);

        // resetear el form
        guardarNombreGasto('');
        guardarCantidadGasto('');
    }

    return ( 
        <form 
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje='Ambos campos son necesarios o Presupuesto Incorrecto' /> : null}

            <div className="campo">
                <label htmlFor="">Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    onChange = {e => guardarNombreGasto(e.target.value)}
                    value={nombreGasto}
                />
            </div>
            <div className="campo">
                <label htmlFor="">Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    onChange = {e => guardarCantidadGasto(parseInt(e.target.value, 10))} 
                    value={cantidadGasto}
                />
            </div>
            <input type="submit" className="button-primary u-full-width" value="Agregar Gasto"/>
        </form>
     );
}
 
export default Formulario;