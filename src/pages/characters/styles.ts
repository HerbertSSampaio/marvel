import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    root: {
        marginTop: 40,
        marginBottom: 10,
    },
    header: {
        backgroundColor: "#424242",
        borderRadius: 10,
    },
    session: {
        marginTop: 60,
        marginBottom: 60,
    },
    cardList: {
        marginTop: 20,
        backgroundColor: "#424242",
        width: "100%",
        borderRadius: 10,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#656565",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardDescription: {
        height: 100,
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        wordBreak: "break-all",
        overflow: "hidden",
    },
    cardButton: {
        fontWeight: "bolder",
        margin: "auto",

        backgroundColor: "#e62429",
        padding: 8,
        borderRadius: 0,
        clipPath: "polygon(10% 0%, 100% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 100%, 0% 30%)",
    }
});