import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    root: {
        marginTop: 10,
        marginBottom: 10,
    },
    content: {
        height: 100,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardDescription: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
    },
    cardButton: {
        fontWeight: "bolder",
        marginLeft: "auto",

        backgroundColor: "#e62429",
        padding: 8,
        borderRadius: 0,
        clipPath: "polygon(10% 0%, 100% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 100%, 0% 30%)",
    }
});