import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default {
    socket,
    
    findMatch() {
      socket.emit('findMatch');
    },
    
    onMatchFound(callback) {
      socket.on('matchFound', callback);
    },
    
    removeListeners() {
      socket.off('matchFound');
      socket.off('disconnect');
    }
  };















// export default {
//   socket,
  
//   // Matchmaking methods
//   findMatch() {
//     socket.emit('findMatch');
//   },
  
//   onMatchFound(callback) {
//     socket.on('matchFound', callback);
//   },

//   // Game methods (keep existing)
//   inMatch(matchID) {
//     socket.emit('inMatch', matchID);
//   },
  
//   sendMove(move) {
//     socket.emit('move', move);
//   },
  
//   onMove(callback) {
//     socket.on('move', callback);
//   },

//   // Cleanup
//   removeListeners() {
//     socket.off('matchFound');
//     socket.off('move');
//   }
// };