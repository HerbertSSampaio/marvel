import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
    },
    normal: {
        fontWeight: "bold",

        backgroundColor: "#656565",
        color: "#fff",

        border: "none",
        margin: 4,
        padding: 10,
        cursor: "pointer",
    },
    active: {
        backgroundColor: "#e62429",
    },
    range: {
        fontSize: 20,
        fontWeight: "bold",
    }
});