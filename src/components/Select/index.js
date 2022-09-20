import React, {useState} from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Container, InputLabel } from './Select.styles';

export default function BasicSelect({ handleChange, value }) {

    const [valueSelected, setValueSelected] = useState(1);
    const onChange = (event) => {
        setValueSelected(event.target.value);
        handleChange(event.target.value);
    }

    return (
        <Container>
            <FormControl fullWidth>
                <InputLabel>Opções:</InputLabel>
                <Select
                    value={valueSelected}
                    onChange={onChange}
                    style={{
                        backgroundColor: 'white'
                    }}
                >
                    <MenuItem value={1}>Somente Data Selecionada</MenuItem>
                    <MenuItem value={2}>Até Data Selecionada</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}