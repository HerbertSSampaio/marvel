import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#e62429',
        },
        background: {
            default: '#202020',
        },
    },
});

export default theme;