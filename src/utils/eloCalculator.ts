export  const calculateEloChange = (
  player1Rating: number, 
  player2Rating: number, 
  player1Result: number, // 1 for win, 0.5 for draw, 0 for loss
  kFactor = 32
) => {
  // Calculate expected outcome
  const expectedPlayer1 = 1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
  const expectedPlayer2 = 1 / (1 + Math.pow(10, (player1Rating - player2Rating) / 400));

  // Calculate new ratings
  const player1NewRating = Math.round(player1Rating + kFactor * (player1Result - expectedPlayer1));
  const player2NewRating = Math.round(player2Rating + kFactor * ((1 - player1Result) - expectedPlayer2));

  return { player1NewRating, player2NewRating };
};
 