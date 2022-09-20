import React from "react";
import Map from "../../components/Map";
import {
    Container,
    ContainerText,
    ContainerSlider,
    ContainerOptions,
    SubTitle,
    Title
} from "./CovidMap.styles";
import DateSlider from "../../components/Slider";
import { useState } from "react";
import BasicSelect from "../../components/Select";


export default function CovidMap() {

    const [currentDate, setCurrentDate] = useState(null);
    const [valueSelected, setValueSelected] = useState(1);

    const handleChange = (value) => {
        setCurrentDate(value);
    }

    const onChange = (value) => {
        setValueSelected(value);
    }
    return (
        <Container>
            <ContainerText>
                <Title >Covid Daily Cases</Title>
                <SubTitle >Veja dados dos números de casos de COVID por país, dia e variante.</SubTitle>
            </ContainerText>
            <ContainerOptions>
                <ContainerSlider>
                    <DateSlider value={currentDate} onChange={handleChange} max={new Date('2022-1-10')} min={new Date('2020-4-4')} />
                    {currentDate ? currentDate.toLocaleDateString('en-CA') : "Selecione uma data"}
                </ContainerSlider >
                <BasicSelect handleChange={onChange} value={valueSelected} />
            </ContainerOptions>
            <Map optionSelected={valueSelected} date={currentDate} />
        </Container>
    )
}