import { format } from "path";

const fetchSuggestion = async() =>{

    const todos = formatTodosForAI(columns);
    const response = await fetch('/api/generateSummary',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({todos}),
    });
    const GPTdata = await response.json();

    const { content } = GPTdata;
    return content;
}