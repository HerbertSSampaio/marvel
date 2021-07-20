import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import { useStyles } from "./styles";

type Participation = {
    id: number;
    title: string;
    thumbnail: string;
    details: string;
}

interface CharacterParticipationListProps {
    participations: Participation[];
}

export default function CharacterParticipationList({ participations }: CharacterParticipationListProps) {
    const classes = useStyles();

    return (
        (participations.length === 0) ? (
            <Grid 
                container 
                spacing={4} 
                className={classes.cardList}
            >
                <Typography variant="body1" className={classes.noParticipation}>
                    No Participations
                </Typography>
            </Grid>
        ) : (
            <Grid container spacing={4} className={classes.cardList}>
                {participations.map((participation) => (
                    <Grid 
                        key={participation.id} 
                        item 
                        xs={6} 
                        sm={3} 
                        md={2}
                    >
                        <Card className={classes.card}>
                            <div>
                                <CardMedia>
                                    <Image 
                                        src={participation.thumbnail} 
                                        width="300" 
                                        height="450" 
                                        alt={participation.title} 
                                    />
                                </CardMedia>
                            </div>
                            <div>
                                <CardContent className={classes.cardTitle}>
                                    <Typography variant="body2">
                                        {participation.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        href={participation.details} 
                                        target="_blank" 
                                        variant="contained" 
                                        color="secondary" 
                                        className={classes.cardButton}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    )
}