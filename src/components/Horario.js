// @ts-nocheck
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Form, FormCheck } from 'react-bootstrap';

const Horario = () => {
    const[apertura, setApertura] = useState(true)
    const[labelInterruptor, setLabelInterruptor] = useState("Abrir Tienda")

    useEffect(() => {
        onSnapshot(
            collection(db, 'Horario'),
            (snapshot) => {
                setApertura(snapshot.docs[0].data()["Apertura"])
            }
        )
    }, [])

    return (
        <div>
            <h2>Estado Apertura de la tienda</h2>
            <hr />
            <label>
                {labelInterruptor}
                <input
                    type="checkbox"
                    value={apertura}
                    onClick={(e) => {
                        e.preventDefault()
                        updateDoc(doc(db, "Horario", "IxTQeeEAkbsIUXrP9m3W"), {
                            Apertura: !apertura
                        })
                    }}
                />
            </label>
                
        </div>
    );
}

export default Horario;