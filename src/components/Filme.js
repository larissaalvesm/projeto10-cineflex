import styled from "styled-components"
import { Link } from "react-router-dom";

export default function Filme(props) {


    return (
        <Link to={`/sessoes/${props.idFilme}`}>
            <MovieContainer data-test="movie">
                <img src={props.filme.posterURL} alt={props.filme.title} />
            </MovieContainer>
        </Link>
    )
}

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`