import React from "react";
import Map from "../../components/Map";
import {
    Container,
    ContainerText,
    ContainerSlider,
    SubTitle,
    Title
} from "./CovidMap.styles";
import DateSlider from "../../components/Slider";
import { useState } from "react";


export default function CovidMap() {

    const [currentDate, setCurrentDate] = useState(null);

    const handleChange = (value) => {
        setCurrentDate(value);
    }

    return (
        <Container>
            <ContainerText>
                <Title >Covid Daily Cases</Title>
                <SubTitle >Veja dados dos números de casos de COVID por país, dia e variante.</SubTitle>
            </ContainerText>
            <ContainerSlider>
                    <DateSlider value={currentDate} onChange={handleChange} max={new Date('2022-1-10')} min={new Date('2020-4-4')} />
                    {currentDate ? currentDate.toLocaleDateString('en-CA') : "Selecione uma data"}
            </ContainerSlider >
            <Map  date={currentDate} />
        </Container>
    )
}