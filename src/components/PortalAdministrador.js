import React, {useState} from 'react';
import styled from 'styled-components';
import MenuAdmin from './MenuAdmin';
import ListadoCategorias from './ListadoCategorias';
import AgregarCategorias from './AgregarCategorias';
import AgregarProducto from './AgregarProducto';
import ListadoProductos from './ListadoProductos';
import Horario from './Horario';

const PortalAdministrador = () => {
    const [opcion, setOpcion] = useState("Horario")
    return (
        <ContenedorApp>
            <h1>Portal de Administrador</h1>
            <hr />
            <MenuAdmin setOpcion={setOpcion} />

            <ContenedorTareas>
                {
                opcion === "Productos" ?
                    <>
                        <AgregarProducto />
                        <ListadoProductos />
                    </>
                :opcion === "Categorías" ?
                    <>
                        <AgregarCategorias />
                        <ListadoCategorias />
                    </>
                :
                    <>
                        <Horario />
                    </>
                }
                
            </ContenedorTareas>
        </ContenedorApp>
    );
}

const ContenedorApp = styled.div`
    width: 70%;
    margin: auto;
    h1 {
        margin: 10px 0;
    }
    hr {
        margin-bottom: 20px;
    }
`
const ContenedorTareas = styled.div`
    border: 1px solid #c3c3c3;
    padding: 30px;
    
    h2 {
        margin:0;
    }
`

export default PortalAdministrador;