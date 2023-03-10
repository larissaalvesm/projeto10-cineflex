import styled from "styled-components"
export default function Assento(props) {


    return (
        <>
            <SeatItem
                data-test="seat"
                id={props.assento}
                assentosSelecionados={props.assentosSelecionados}
                disponibilidade={props.assento.isAvailable}
                onClick={() => props.selecionarAssento(props.assento)}
            >
                {props.assento.name}
            </SeatItem>
        </>
    )
}

const SeatItem = styled.div`
                border: ${props =>
        props.disponibilidade === true && props.assentosSelecionados.includes(props.id) ? "1px solid #0E7D71" :
            (props.disponibilidade === false ? "1px solid #F7C52B" :
                "1px solid #7B8B99")
    };
                background-color: ${props => props.disponibilidade === true && props.assentosSelecionados.includes(props.id) ? "#1AAE9E" : (props.disponibilidade === false ? "#FBE192" : "#C3CFD9")};
                height: 25px;
                width: 25px;
                border-radius: 25px;
                font-family: 'Roboto';
                font-size: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `