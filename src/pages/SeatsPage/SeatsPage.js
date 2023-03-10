import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Assento from "../../components/Assento";

export default function SeatsPage() {
    const [day, setDay] = useState([]);
    const [movie, setMovie] = useState([]);
    const [seats, setSeats] = useState([]);
    const [section, setSection] = useState([]);
    const { idSessao } = useParams();
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [comprador, setComprador] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const requis = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        requis.then(resp => {
            setSeats(resp.data.seats);
            setDay(resp.data.day);
            setMovie(resp.data.movie);
            setSection(resp.data);
        });

        requis.catch(erro => {
            console.log(erro.response.data);
        });
    }, [])

    function selecionarAssento(assento) {
        const novosAssentosSelecionados = assentosSelecionados.filter((ass => ass !== assento.id));

        if (assento.isAvailable === false) {
            alert("Esse assento não está disponível.")
        } else if (!assentosSelecionados.includes(assento.id)) {
            setAssentosSelecionados([...assentosSelecionados, assento.id]);
        } else {
            setAssentosSelecionados(novosAssentosSelecionados);
        }

    }

    function reservarAssentos(e) {
        e.preventDefault();

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: assentosSelecionados,
            name: comprador,
            cpf: cpf
        });

        requisicao.then(() => navigate("/sucesso"))


    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(assento => <Assento key={assento.id} assento={assento} assentosSelecionados={assentosSelecionados} selecionarAssento={selecionarAssento} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle disponibilidade="selecionado" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle disponibilidade="disponivel" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle disponibilidade="indisponivel" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reservarAssentos}>

                <label htmlFor="nome">Nome do Comprador:</label>
                <input required type="text" id="nome" value={comprador} onChange={e => setComprador(e.target.value)} />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input required id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} />

                <button type="submit">Reservar Assento(s)</button>


            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt={movie.title} />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {section.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Roboto';
                font-size: 24px;
                text-align: center;
                color: #293845;
                margin-top: 30px;
                padding-bottom: 120px;
                padding-top: 70px;
                `
const SeatsContainer = styled.div`
                width: 330px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                `
const FormContainer = styled.form`
                width: calc(100vw - 40px);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: 20px 0;
                font-size: 18px;
                button {
                    align-self: center;
    }
                input {
                    width: calc(100vw - 60px);
    }
                `
const CaptionContainer = styled.div`
                display: flex;
                flex-direction: row;
                width: 300px;
                justify-content: space-between;
                margin: 20px;
                `
const CaptionCircle = styled.div`
                border: ${props => props.disponibilidade === "disponivel" ? "1px solid #7B8B99" : (props.disponibilidade === "indisponivel" ? "1px solid #F7C52B" : "1px solid #0E7D71")};
                background-color: ${props => props.disponibilidade === "disponivel" ? "#C3CFD9" : (props.disponibilidade === "indisponivel" ? "#FBE192" : "#1AAE9E")};
                height: 25px;
                width: 25px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `
const CaptionItem = styled.div`
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 12px;
                `

const FooterContainer = styled.div`
                width: 100%;
                height: 120px;
                background-color: #C3CFD9;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 20px;
                position: fixed;
                bottom: 0;

                div:nth-child(1) {
                box-shadow: 0px 2px 4px 2px #0000001A;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                margin: 12px;
                img {
                    width: 50px;
                height: 70px;
                padding: 8px;
        }
    }

                div:nth-child(2) {
                    display: flex;
                flex-direction: column;
                align-items: flex-start;
                p {
                    text-align: left;
                &:nth-child(2) {
                    margin-top: 10px;
            }
        }
    }
                `