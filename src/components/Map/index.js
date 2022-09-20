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


export default function Map({date, optionSelected}) {

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
        console.log();
        let filteredResult = [];
        if(optionSelected === 2)
           filteredResult = dataCovid.filter((item) => item.location === country && new Date(item.date).getTime() <= date.getTime());
        else
           filteredResult = dataCovid.filter((item) => item.location === country && item.date === date.toLocaleDateString('en-CA'));

        let arrayDataFiltered = [];
        variants.forEach((item) => {
            let sum = 0;
            filteredResult.forEach((itemFiltered) => {
                if (itemFiltered.variant === item)
                    sum = sum + itemFiltered.num_sequences;
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
                                geographies.map((geo, index) => (
                                    <Geography
                                        
                                        fill="#FFF"
                                        key={index}
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
                                        onMouseOver={() => {
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