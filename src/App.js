import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
    const [day, setDay] = useState([]);
    const [movie, setMovie] = useState([]);
    const [seats, setSeats] = useState([]);
    const [section, setSection] = useState([]);
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [comprador, setComprador] = useState("");
    const [cpf, setCpf] = useState("");
    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                    <Route path="/assentos/:idSessao" element={<SeatsPage
                        day={day}
                        setDay={setDay}
                        movie={movie}
                        setMovie={setMovie}
                        seats={seats}
                        setSeats={setSeats}
                        section={section}
                        setSection={setSection}
                        assentosSelecionados={assentosSelecionados}
                        setAssentosSelecionados={setAssentosSelecionados}
                        comprador={comprador}
                        setComprador={setComprador}
                        cpf={cpf}
                        setCpf={setCpf}
                    />} />
                    <Route path="/sucesso" element={<SuccessPage
                        day={day}
                        movie={movie}
                        section={section}
                        assentosSelecionados={assentosSelecionados}
                        setAssentosSelecionados={setAssentosSelecionados}
                        comprador={comprador}
                        cpf={cpf} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
