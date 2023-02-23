import { GiphyFetch } from "@giphy/js-fetch-api";
import {
    Gif,
    Grid,
} from "@giphy/react-components";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import ResizeObserver from "react-resize-observer";

const giphyFetch = new GiphyFetch("FQBF3KgCdeUz6qNCJIYAKj4Kn3u1809v");

type GripDemoProps = {
    onGifClick: any
}

function GridDemo(props: GripDemoProps) {
    const { onGifClick } = props
    
    const [search, setSearch] = useState('');
    const handleSearchChange = (event: any) => {
        setSearch(event.target.value);
    }

    const fetchGifs = (offset: number) =>
        giphyFetch.search(search, {offset})
    const [width, setWidth] = useState(window.innerWidth);
    return (
        <>
            <div>
                <h4>
                    Search Grid
                    <img src="./logo.gif" width="200" alt="Powered by GIPHY" />
                </h4>
                <div className="col mb-4">
                    <input id="ta-search" className='form-control w-100' placeholder="Type search text here" value={search} onChange={handleSearchChange}></input>
                </div>
            </div>
            <Grid
                key={search}
                onGifClick={onGifClick}
                fetchGifs={fetchGifs}
                width={width}
                columns={3}
                gutter={20}
            />
            <ResizeObserver
                onResize={({ width }) => {
                    setWidth(width);
                }}
            />
        </>
    );
}

function App() {
    const [modalGif, setModalGif] = useState();
    return (
        <>
            <GridDemo
                onGifClick={(gif: any, e: any) => {
                    console.log("gif", gif);
                    e.preventDefault();
                    setModalGif(gif);
                }}
            />
            {modalGif && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0, 0, 0, .8)"
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        setModalGif(undefined);
                    }}
                >
                    <Gif gif={modalGif} width={200} />
                </div>
            )}
        </>
    );
}

const rootElement: any = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
