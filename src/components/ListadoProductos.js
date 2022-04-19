import React, {useState, useEffect} from 'react';
import {db, storage} from './../firebase/firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import {listAll, ref} from 'firebase/storage';

const ListadoProductos = () => {
    const [productos, cambiarProductos] = useState([]);
    const [imageList, setImageList] = useState(new Map())

    useEffect(() => {
        onSnapshot(
            collection(db, 'Productos'),
            (snapshot) => {
                const imageListRef = ref(storage, "productos/")
                listAll(imageListRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        const url = "https://firebasestorage.googleapis.com/v0/b/marcelita-app-c0c01.appspot.com/o/productos%2F"+itemRef.name+"?alt=media&token=51dc4dbf-05e9-4041-9b72-5f430c10db53"
                        const name = itemRef.name
                        
                        setImageList(prev => ({
                            ...prev,
                            [name]:url
                        }))
                    });
                })
                .then(() => {
                    const arrayProductos = snapshot.docs.map((producto) => {
                        return {...producto.data(), id:producto.id}
                    })
                    cambiarProductos(arrayProductos)
                })
            }
        )
    }, [])

    return (
        <div>
            <h2>Lista de Categorias</h2>
            <hr />

            {productos.map((producto) => {
                return <p>{producto.nombre}</p>
            })}
            
        </div>
    );
}
 
export default ListadoProductos;