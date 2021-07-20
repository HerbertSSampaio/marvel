import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    cardList: {
        marginTop: 20,
        borderRadius: 10,

        backgroundColor: "#424242",
    },
    card: {
        backgroundColor: "#656565",
    },
    cardName: {
        height: 100,

        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        wordBreak: "break-all",

        overflow: "hidden",
    },
    cardButton: {
        margin: "auto",
        padding: 8,
        borderRadius: 0,

        fontWeight: "bolder",

        backgroundColor: "#e62429",

        clipPath: "polygon(10% 0%, 100% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 100%, 0% 30%)",
    },
    noParticipation: {
        margin: "auto",
        padding: 10,
    }
});
