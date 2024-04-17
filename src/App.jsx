import { useState, useEffect } from "react";
import "./App.css";

function Card({ id, handleClick }) {
    const [imgURL, setImgURL] = useState("");
    const [title, setTitle] = useState("Pokemon");

    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id;
        const fetchPromise = fetch(url);
        fetchPromise
            .then((response) => response.json())
            .then((result) => {
                setImgURL(result.sprites.front_default);
                setTitle(result.name);
            });
    }, [id]);

    return (
        <div className="pokeCard" onClick={() => handleClick(id)}>
            <h3>{title}</h3>
            <img src={imgURL} />
        </div>
    );
}

function generateRandomIDs() {
    let idArr = [];
    for (let i = 0; i < 12; i++) {
        let id = Math.floor(Math.random() * 151) + 1;
        while (idArr.includes(id)) {
            id = Math.floor(Math.random() * 151) + 1;
        }
        idArr.push(id);
    }
    return idArr;
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

function App() {
    // get all the stateful data that will be used in the game

    const [shuffledIDs, setShuffledIDs] = useState(generateRandomIDs());
    const [clickedIDs, setClickedIDs] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // handle interactivity by passing setters
    function handleClick(id) {
        if (clickedIDs.includes(id)) {
            setShuffledIDs(generateRandomIDs());
            setClickedIDs([]);
            setScore(0);
        } else {
            setClickedIDs([...clickedIDs, id]);
            let nextShuffled = [...shuffledIDs];
            shuffle(nextShuffled);
            setShuffledIDs(nextShuffled);
            setScore(score + 1);
            setBestScore(score + 1 > bestScore ? score + 1 : bestScore);
        }
    }

    /* STUFF THAT RENDERS EVERY TIME */
    const cards = shuffledIDs.map((id) => (
        <Card key={id} id={id} handleClick={handleClick} />
    ));

    return (
        <div>
            <div className="score">
                <h3>Score: {score}</h3>
                <h3>Best Score: {bestScore}</h3>
            </div>
            <div className="board">{cards}</div>
        </div>
    );
}

export default App;
