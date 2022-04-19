import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase/firebaseConfig';
import {ref, uploadBytes} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AgregarCategorias = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const [nombreCategoria, setNombreCategoria] = useState('')
    const uploadImagen = () => {
        if(imageUpload == null) return;
        const nombreImagen = nombreCategoria.toLowerCase().replace(" ", "")
        const imageRef = ref(storage, `imagenes/${nombreImagen}`)

        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Categoría Subida!!")
        })
        .then(() => {
            addDoc(collection(db, "Categorias"), {
                nombre: nombreCategoria,
                imagen: nombreImagen
            })
        })
            
    }
    return (
        <div>
            <h2>Agregar Categorías</h2>
            <hr />
            <form>
                <label>
                    <Input 
                        type="text" 
                        placeholder='Nombre Categoría' 
                        value={nombreCategoria} 
                        onChange={(e) => setNombreCategoria(e.target.value)} 
                    />
                </label>
                
                <LabelInputImagen>
                    <FontAwesomeIcon icon={faImage} />
                    <InputImagen type="file" onChange={(e) => setImageUpload(e.target.files[0])} />

                </LabelInputImagen>

                <Boton onClick={(e) => {
                    e.preventDefault()
                    uploadImagen()
                }}><FontAwesomeIcon icon={faAnglesRight}/></Boton>
            </form>
        </div>
    );
}

const Input = styled.input`
    margin-bottom: 30px;
    margin-right: 10px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #000042;
    font-size: 16px;
    width: 40%;
    height: 20px;
    color: #454545;
`

const InputImagen = styled.input`
    display: none;
`

const LabelInputImagen = styled.label`
    margin-right: 10px;
    background: #266ce2;
    border-radius: 5px;
    border: 1px solid #000042;
    display: inline-block;
    width: 50px;
    text-align: center;
    padding: 10px;
    color: #000042;
`

const Boton = styled.button`
    background: #44c39d;
    height: 40px;
    border-radius: 5px;
    border: 1px solid black;
    color: #004200;
`
 
export default AgregarCategorias;