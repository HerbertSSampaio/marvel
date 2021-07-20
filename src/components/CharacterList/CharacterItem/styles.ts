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
        marginBottom: 10,

        fontSize: 18,
        fontWeight: "bold",
    },
    cardDescription: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        
        overflow: "hidden",
    },
    cardButton: {
        marginLeft: "auto",
        padding: 8,
        borderRadius: 0,

        backgroundColor: "#e62429",

        fontWeight: "bolder",

        clipPath: "polygon(10% 0%, 100% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 100%, 0% 30%)",
    }
});