import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import MessagueCard from './messagueCard';

const Message = () => {
    const [recibidos, setRecibidos] = useState([]);
    const [enviados, setEnviados] = useState([]);
    const [page, setPage] = useState('true'); //true recibidos, false enviados
    

  
    const id = parseInt(Cookies.get('roomieId'));

    useEffect(()=>{

        const fetchMessages = async () =>{
            try{
                const response = await axios.get(`http://localhost:8080/Mensajes/Recibidos/${id}`);//mensajes recibidos
                const sendResponse = await axios.get(`http://localhost:8080/Mensajes/Enviados/${id}`);//mensajes enviados

                const sendMessage = sendResponse.data;
                const message  = response.data;

                setEnviados(sendMessage);
                setRecibidos(message);
                

            }catch(error){
                console.error("Error al obtener los mensajes",error);
            }
        }
        fetchMessages();
    },[]);

    const toggleEdit = (estado)=>{
        setPage(estado);
    }

    return (
        <section className="flex flex-wrap gap-4 p-4">
            <div className="flex gap-10">
                <button 
                    className= { page ? "bg-[#7B4B94]  text-white font-bold py-2 px-4 rounded-lg" :"  text-white font-bold py-2 px-4 rounded-lg bg-[#007a9a]"} 
                    onClick={()=>toggleEdit(true)}
                >
                    Recibidos
                </button>
                <button 
                   className= { page ? "bg-[#007a9a]  text-white font-bold py-2 px-4 rounded-lg" :"  text-white font-bold py-2 px-4 rounded-lg bg-[#7B4B94]"} 
                    
                    onClick={() => toggleEdit(false)}
                >
                    Enviados
                </button>
            </div>

          
            {page ? (
                <>
                    {recibidos.map((message)=>(
                    <MessagueCard
                    key={message.Id}
                    Id={message.Id}
                    Emisor ={message.EmisorId}
                    Receptor = {message.ReceptorId}
                    Asunto = {message.Asunto}
                    Contenido = {message.Contenido}
                    FechaHoraEnvio = {message.FechaHoraEnvio}
                    Estado= {message.Estado}
                />
                ))}
                </>
            ):(
                <>
                {enviados.map((message)=>(
                    <MessagueCard
                        key={message.Id}
                        Id={message.Id}
                        Emisor ={message.ReceptorId}
                        Receptor = {message.EmisorId}
                        Asunto = {message.Asunto}
                        Contenido = {message.Contenido}
                        FechaHoraEnvio = {message.FechaHoraEnvio}
                        Estado={message.Estado}
                    />
                ))}
                </>
            )}
        </section>
    );
};

export default Message;
