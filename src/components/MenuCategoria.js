import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { listAll, ref } from 'firebase/storage';
import styled from 'styled-components';

const MenuCategoria = () => {
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
        <>
            <h3>Productos:</h3>
            <br />
            <ContenedorProductos>
                {productos.map((producto) => {
                    return <Producto>
                        <div className='sectionIMG'>
                            <img src={imageList[producto.imagen]} />
                        </div>
                        <div className='sectionTittle bold'>{producto.nombre}</div>
                        <div className='sectionTittle'>{
                            producto.stock === true ? <> [Con Stock]</>
                            : <> [Sin Stock]</>
                        }</div>
                    </Producto>
                })}

                
            </ContenedorProductos>
            
            
        </>
    );
}

const ContenedorProductos = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Producto = styled.div`
    width: 100%;
    height: 200px;
    padding: 5px;
    margin-bottom: 20px;

    .sectionIMG {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        height: 70%;
        margin-bottom: 10px;
    }

    .bold {
        font-weight: bold;
    }

    img {
        height: 100%;
    }

    .sectionTittle {
        padding: 5px;
        text-align: center;
    }
`

export default MenuCategoria;