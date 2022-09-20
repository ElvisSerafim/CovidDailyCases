import { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { 
    Container, 
    TooltipContainer,
     DataText 
} from "./Map.styles";
import Tooltip from '@mui/material/Tooltip';
import { api } from "../../services/api";
import geos from "../../utils/geos.json";


export default function Map({date}) {

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
                if (item.variant !== 'non_who' && (arrayAux.includes(item.variant) === false))
                    arrayAux.push(item.variant);
            });
            setVariants(arrayAux);
        });
    }, []);

    const getData = (country) => {
        console.log(date.toLocaleDateString('en-CA'));
        let filteredResult = dataCovid.filter((item) => item.location === country && item.date === date.toLocaleDateString('en-CA'));
        let arrayDataFiltered = [];
        variants.forEach((item) => {
            let sum = 0;
            filteredResult.forEach((ite) => {
                if (ite.variant === item)
                    sum = sum + ite.num_sequences;
            });
            if (sum !== 0) {
                let dataCountryCovid = {
                    total: sum,
                    variant: item
                }
                arrayDataFiltered.push(dataCountryCovid);
            }

        });
        setDataToShow(arrayDataFiltered);
    }

    return (
        <Container>
            <Tooltip
                followCursor
                title={country.length === 0 ?
                    "" : 
                    <div>
                        <DataText> {country} </DataText>
                        {dataToShow.map((item) => {
                            return (
                                <TooltipContainer>
                                    <DataText> {item.variant.concat(": ", item.total)}</DataText>
                                </TooltipContainer>
                            )
                        })}
                    </div>
                }
                placement="right-start"
            >
                <ComposableMap data-tip="" >
                    <ZoomableGroup zoom={1}>
                        <Geographies geography={geos}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography 
                                        fill="#FFF"
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

                                        onMouseLeave={() => {
                                            setCountry("");
                                            setDataToShow([]);
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