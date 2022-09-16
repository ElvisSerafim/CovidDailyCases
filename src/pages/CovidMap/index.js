import React from "react";
import Map from "../../components/Map";
import { Container, ContainerText, SubTitle, Title } from "./CovidMap.styles";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function CovidMap() {

    return (
        <Container>
            <ContainerText>
                <Title >Covid Daily Cases</Title>
                <SubTitle >Veja dados dos números de casos de COVID por país, dia e variante.</SubTitle>
            </ContainerText>
            <Slider />
            <Map />
        </Container>
    )
}