import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { postRecord } from "../../service/service";
import UserContext from "../../contexts/UserContext";

import Render from "./Render";


export default function AddIncome () {
    const { userData } = useContext(UserContext);
    const [form, setForm] = useState({
        date: new Date().toLocaleDateString('pt-br'),
        type:'entrada'
    });

    const navigate = useNavigate();

    function updateForm ({ name, value }) {
        setForm({ ...form, [name]: value });
    };

    function handleForm (event) {
        event.preventDefault();

        if (isNaN(form.price)) {

            window.alert('Preço inválido');
        } else {

            postRecord(userData, form);

            navigate('/records');
        }
    };

    const dataPage = {
        title:'Nova entrada',
        dataForm: {
            updateForm,
            handleForm,
            inputs: [
                {
                    placeholder:"Valor",
                    name:'price',
                    type:'text'
                },
                {
                    placeholder:"Descrição",
                    name:'details',
                    type:'text'
                }
            ],
            button: 'Salvar entrada'
        }
    };

    return (
        <Render {...dataPage}/>
    );
}