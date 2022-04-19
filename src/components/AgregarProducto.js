// @ts-nocheck
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase/firebaseConfig';
import {ref, uploadBytes} from 'firebase/storage';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const AgregarProducto = () => {
    const [categorias, setCategorias] = useState([])
    const [imageUpload, setImageUpload] = useState(null)
    const [nombreProducto, setNombreProducto] = useState('')
    const [marcaProducto, setMarcaProducto] = useState('')
    const [sizeProducto, setSizeProducto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categoriaProducto, setCategoriaProducto] = useState('')
    const subirProducto = () => {
        if(imageUpload == null) return;
        const nombreImagen = nombreProducto.replaceAll(' ', '').toLowerCase()
        const imageRef = ref(storage, `productos/${nombreImagen}`)

        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Categoría Subida!!")
        })
        .then(() => {
            addDoc(collection(db, "Productos"), {
                nombre: nombreProducto,
                imagen: nombreImagen,
                marca: marcaProducto,
                size: sizeProducto,
                descripcion: descripcion,
                categoria: categoriaProducto,
                stock: true,
            })
        })
    }

    useEffect(() => {
        onSnapshot(collection(db, "Categorias"),
        (snapshot) => {
            const arrayCategorias = snapshot.docs.map((categoria) => {
                return {...categoria.data(), id:categoria.id}
            })
            setCategorias(arrayCategorias)
        })
    }, [])

    return (
        <div>
            <h2>Agregar Producto</h2>
            <br />
            <hr />
            <form>
                <Input 
                    type="text" 
                    placeholder='Nombre Producto' 
                    value={nombreProducto} 
                    onChange={(e) => setNombreProducto(e.target.value)}
                />

                <Input 
                    type="text" 
                    placeholder='Marca Producto' 
                    value={marcaProducto} 
                    onChange={(e) => setMarcaProducto(e.target.value)}
                />

                <Input 
                    type="text" 
                    placeholder='Tamaño Producto' 
                    value={sizeProducto} 
                    onChange={(e) => setSizeProducto(e.target.value)} 
                />

                <Select onChange={(e) => setCategoriaProducto(e.target.value)}>
                    {categorias.map((element) => {
                        return <option key={element.id} value={element.nombre}>{element.nombre}</option>
                    })}
                </Select>

                
                <br />
                <Input 
                    type="text" 
                    placeholder='Descripción' 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                />

                <LabelInputImagen>
                    <FontAwesomeIcon icon={faImage} />
                    <InputImagen type="file" onChange={(e) => setImageUpload(e.target.files[0])} />

                </LabelInputImagen>

                <Boton onClick={(e) => {
                    e.preventDefault()
                    subirProducto();
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
    height: 20px;
    color: #454545;
    width: 20%;
`

const Select = styled.select`
    color: #454545;
    height: 40px;
    border: 1px solid black;
    border-radius: 3px;
    margin-right: 10px;
    font-size: 16px;
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
 
export default AgregarProducto;