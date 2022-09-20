import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
`;

export const Title = styled.h3`
    font-weight: 700;
    font-size: 1.75em;
    margin: 0;
`;

export const SubTitle = styled.h3`
    font-weight: 700;
    font-size:1.25em;
    text-align: center;
`;

export const ContainerText = styled.div`
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 70%;
`;

export const ContainerSlider = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const ContainerOptions = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;