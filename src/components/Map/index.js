import { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
    ZoomableGroup
} from "react-simple-maps";

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { api } from "../../services/api";
import geos from "../../utils/geos.json";
import { Container } from "./Map.styles";

export default function Map() {

    const [dataCovid, setDataCovid] = useState([]);
    const [variants, setVariants] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    const [country, setCountry] = useState('');

    useEffect(() => {
        api.get('/covidData').then((response) => {
            let responseData = response.data;
            setDataCovid(responseData);
            let arrayAux = [];
            responseData.forEach((item) => {
                if (item.variant != 'non_who' && (arrayAux.includes(item.variant) === false))
                    arrayAux.push(item.variant);
            });
            setVariants(arrayAux);
        });
    }, []);

    const getData = (country) => {
        console.log(country);
        let filteredResult = dataCovid.filter((item) => item.location === country && item.date === '2021-07-12');
        console.log(filteredResult.length);
        let arrayDataFiltered = [];
        variants.forEach((item) => {
            let sum = 0;
            filteredResult.forEach((ite) => {
                if (ite.variant == item)
                    sum = sum + ite.num_sequences;
            });
            if (sum != 0) {
                let dataCountryCovid = {
                    total: sum,
                    variant: item
                }
                arrayDataFiltered.push(dataCountryCovid);
            }

        });
        setDataToShow(arrayDataFiltered);
        console.log(arrayDataFiltered);

    }


    const PopperList = () => {
        return (

            <Popper>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    {country}
                </Box>
            </Popper>
        )
    }

    return (
        <Container>
            <Tooltip followCursor title={country} placement="top-start">
                <ComposableMap data-tip="" >
                    <ZoomableGroup zoom={1}>
                        <Geographies geography={geos}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography fill="#FFF"
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: "#FFF",
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "blue",
                                                outline: "none"
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            const { name } = geo.properties;
                                            setCountry(`${name}`);
                                            getData(name);
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </Tooltip>
        </Container>
    )
}