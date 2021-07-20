import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    cardList: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#424242",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#656565",
    },
    cardTitle: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        wordBreak: "break-all",
        overflow: "hidden",
        height: 100,
    },
    cardButton: {
        fontWeight: "bolder",
        margin: "auto",
        padding: 8,
        borderRadius: 0,
        clipPath: "polygon(10% 0%, 100% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 100%, 0% 30%)",
        backgroundColor: "#e62429",
    },
    noParticipation: {
        margin: "auto",
        padding: 10,
    }
});
