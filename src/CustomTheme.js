import {createMuiTheme} from "@mui/material";

import { adaptV4Theme } from '@mui/material/styles';

export default createMuiTheme(adaptV4Theme({
    palette: {
        mode: 'dark',
        freeuni: {
            light: '#FFE93C',
            main: '#FECF3C',
            dark: '#B2A32A'
        },
        agruni: {
            light: '#4CFA6A',
            main: '#36AF4B',
            dark: '#1E622A'
        }
    }
}));