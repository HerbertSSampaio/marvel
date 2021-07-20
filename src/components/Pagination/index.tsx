import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles';

interface PaginationProps {
    pages: number[],
    activePage: number,
    totalItens: number,
    setCurrentPage: (number: number) => void;
    setIsLoading: (boolean: boolean) => void;
}

export default function Pagination({ pages, activePage, totalItens, setIsLoading, setCurrentPage }:PaginationProps) {
    const classes = useStyles();

    function handleButton(pageNumber): void {
        setCurrentPage(pageNumber);
        setIsLoading(true);
    }

    return (
        <>
            <Grid className={classes.root}>
                {pages.map((number) => 
                    <button 
                        key={number} 
                        onClick={() => handleButton(number+1)}
                        className={`${classes.normal} ${(activePage === number+1) ? classes.active : null }`}
                    >
                            {number+1}
                    </button> 
                    )}
            </Grid>
            <Grid className={classes.root}>
                <Typography variant="body1" className={classes.range}>
                    {(activePage - 1) * 60} - {((activePage * 60) > totalItens) ? totalItens : activePage * 60} of {totalItens}
                </Typography>

            </Grid>
        </>
    )
}

