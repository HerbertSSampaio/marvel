import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    buttonList: {
        width: "100%",

        marginTop: 20,
        marginBottom: 20,
    },
    normal: {
        margin: 4,
        padding: 10,
        border: "none",

        backgroundColor: "#656565",
        color: "#fff",

        fontWeight: "bold",

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