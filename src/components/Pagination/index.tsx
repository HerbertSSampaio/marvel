import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles';

interface PaginationProps {
    pages: number[],
    activePage: number,
    totalItens: number,
    handlePage: (number: number) => void;
}

export default function Pagination({ pages, activePage, totalItens, handlePage }:PaginationProps) {
    const classes = useStyles();

    return (
        <Container>
            <Grid 
                container 
                justifyContent="center" 
                className={classes.buttonList}
            >
                {pages.map((number) => 
                    <button 
                        key={number} 
                        onClick={() => handlePage(number+1)}
                        className={`${classes.normal} ${(activePage === number+1) ? classes.active : null }`}
                    >
                            {number+1}
                    </button> 
                    )}
            </Grid>
            <Grid container justifyContent="center">
                <Typography variant="body1" className={classes.range}>
                    {(activePage - 1) * 60} - {((activePage * 60) > totalItens) ? totalItens : activePage * 60} of {totalItens}
                </Typography>
            </Grid>
        </Container>
    )
}

