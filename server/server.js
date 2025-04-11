//#region Requires
const express = require('express');
const app = express();
const http = require('http').Server(app);
const server = require('socket.io')(http);
const fs = require('fs');
//#endregion

//#region Global server variables

const defaultBoard = getInitialBoard();
const rooms = [];
const matches = [];

//#endregion

//#region Server handlers

server.on('connection', client => {
    console.log(`Player connected: ${client.id}`);

    // Matchmaking handler
    client.on('findMatch', () => {
        console.log(`Player ${client.id} is searching for a match`);
        waitingPlayers.push(client.id);

        // Debug print current queue
        console.log(`Current waiting players:`, waitingPlayers);

        // When at least 2 players are waiting, create matches
        while (waitingPlayers.length >= 2) {
            const player1 = waitingPlayers.shift();
            const player2 = waitingPlayers.shift();
            const matchID = generateMatchId();

            console.log(`Matched players: ${player1} and ${player2} in room ${matchID}`);

            // Notify both players
            server.to(player1).emit('matchFound', matchID);
            server.to(player2).emit('matchFound', matchID);
        }
    });

    client.on('disconnect', () => {
        console.log(`Player disconnected: ${client.id}`);
        const index = waitingPlayers.indexOf(client.id);
        if (index !== -1) {
            waitingPlayers.splice(index, 1);
            console.log(`Removed player ${client.id} from queue`);
        }
    });

    // Keep all your existing game-related handlers:
    client.on('inMatch', matchID => {
        client.join(matchID);
        client.matchID = matchID;
        const isBlack = matches.indexOf(matchID) === -1;
        if (!isBlack) matches.push(matchID);
        server.to(client.id).emit('assignSides', isBlack, defaultBoard);
    });

    //#region In-game

    //Send the move to the other client
    client.on('move', move => {

        client.to(client.matchID).broadcast.emit('move', move);
    });

    //Chat system
    client.on('message', msg => {
        client.to(client.matchID).broadcast.emit('message', msg);
    });

    //#endregion
});

//#endregion

//#region Helper methods

//Gets the initial board information from a JSON file, it includes all the square notations and the location of all pieces:
function getInitialBoard() {
    return JSON.parse(fs.readFileSync(__dirname + '/board.json', 'utf8'));
}

//#endregion
function generateMatchId() {
    return Math.random().toString(36).substring(2, 8);
}
//#region Http & Handle new games

function addPage(matchID) {
    app.get(`/${matchID}`, (req, res) => {
        res.sendFile(__dirname + '/public/match.html');
    });
}

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

http.listen(process.env.PORT || 3000);

//#endregion