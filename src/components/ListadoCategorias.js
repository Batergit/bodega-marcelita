import React, {useState, useEffect} from 'react';
import {db, storage} from './../firebase/firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import ItemListadoCategoria from './ItemListadoCategoria';
import {listAll, ref} from 'firebase/storage';

const ListadoCategorias = () => {
    const [categorias, cambiarCategorias] = useState([]);
    const [imageList, setImageList] = useState(new Map())

    useEffect(() => {
        onSnapshot(
            collection(db, 'Categorias'),
            (snapshot) => {
                const imageListRef = ref(storage, "imagenes/")
                listAll(imageListRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        const url = "https://firebasestorage.googleapis.com/v0/b/marcelita-app-c0c01.appspot.com/o/imagenes%2F"+itemRef.name+"?alt=media&token=51dc4dbf-05e9-4041-9b72-5f430c10db53"
                        const name = itemRef.name
                        
                        setImageList(prev => ({
                            ...prev,
                            [name]:url
                        }))
                    });
                })
                .then(() => {
                    const arrayCategorias = snapshot.docs.map((categoria) => {
                        return {...categoria.data(), id:categoria.id}
                    })
                    cambiarCategorias(arrayCategorias)
                })
            }
        )
    }, [])

    return (
        <div>
            <h2>Lista de Categorias</h2>
            <hr />
            {
                categorias.map((categoria) => {
                    
                    return (
                        <>
                            <ItemListadoCategoria
                                key={categoria.id}
                                nombre={categoria.nombre}
                                imagen={imageList[categoria.imagen]}
                                id={categoria.id}
                            />
                        </>
                    )
                })
            }
        </div>
    );
}
 
export default ListadoCategorias;