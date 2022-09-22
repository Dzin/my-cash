import { TextField } from "@mui/material";
import { useState } from "react";


export default function SearchInput({ handleInput }) {
    const [input, setInput] = useState("");

    return (
        <TextField
            size="small"
            label="Pesquisar"
            onChange={(e) => {
                    handleInput(e.target.value);
                    setInput(e.target.value);
                }
            }
            value={input}
        />
    )
}