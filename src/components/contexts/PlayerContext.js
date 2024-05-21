import React from 'react';

const PlayerContext = React.createContext({
    playedIndex: null,
});

export function PlayerContextProvider({ children }) {
    const [playedIndex, setPlayedIndex] = React.useState(null);

    return (
        <PlayerContext.Provider value={{ playedIndex, setPlayedIndex }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const player = React.useContext(PlayerContext);

    if (!player) throw new Error('Is not in the Provider');

    return player;
}

export default PlayerContext;
