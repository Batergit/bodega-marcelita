import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faRotate } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ItemListadoCategoria = (props) => {
    const [input, cambiarInput] = useState(props.nombre)
    return (
        <Caja>
            <CajaInfo>
                <Imagen src={props.imagen} />
                <InputNombreCategoria type="text" value={input} onChange={(e) => { cambiarInput(e.target.value) }}/>
            </CajaInfo>
            <div>
                <ButtonRefresh onClick={(e) => {
                    e.preventDefault()
                    console.log(input)
                }}>
                    <FontAwesomeIcon icon={faRotate} />
                </ButtonRefresh>
                <ButtonRemove onClick={async(e) => {
                    e.preventDefault()
                    try {
                        await deleteDoc(doc(db, "Categorias", props.id))
                        console.log(props)
                    } catch(error) {
                        console.log(error)
                    }
                }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </ButtonRemove>
            </div>
        </Caja>
    );
}

const Caja = styled.div`
    background: #efefef;
    display: flex;
    padding: 10px 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: #dfdfdf;
    }
    &:focus {
        background: #dfdfdf;
    }
`

const CajaInfo = styled.div`
    display: flex;
    align-items: center;
`

const InputNombreCategoria = styled.input`
    background: none;
    border: none;
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
`

const ButtonRemove = styled.button`
    background: red;
    color: white;
    text-align: center;
    border: none;
    color: white;
    font-size: 20px;
    padding: 10px;
    width: 40px;
    border-radius: 10px;
`

const ButtonRefresh = styled.button`
    background: green;
    color: white;
    text-align: center;
    border: none;
    color: white;
    font-size: 20px;
    padding: 10px;
    width: 40px;
    border-radius: 10px;
    margin: 10px;
`
const Imagen = styled.img`
    height: 60px;
    width: 60px;
    margin-right: 20px;
`
export default ItemListadoCategoria;