import { currentUser } from "@clerk/nextjs";
let wins = 0;
let losses=0;
let draws=0;
let totalGames=0;
let winPercentage=0;
let lossPercentage=0;
let drawPercentage=0;
let expectedAverge=0;
let Leaderboard = [];

function statLogic(){
    //get wins and losses from backend
    //wins = backend.wins
    //losses = backend.losses
    //draws = backend.draws
    wins=5;
    losses=3;
    draws=2;
    totalGames = wins + losses + draws;
    winPercentage = (wins/totalGames)*100;
    lossPercentage = (losses/totalGames)*100;
    drawPercentage = (draws/totalGames)*100;
    //leaderboard = backend.leaderboard
    //leaderboard = {name: "player1", wins: 5, profile pic url: "url"}
    //order from highest to lowest wins top 10
}
export default async function Statistics() {
    const user = await currentUser();
    statLogic();
    if (!user) return (<div>Not Logged In</div>)

  return(
    
  <div className="min-h-screen bg-base-200 justify-center">
  <a href="/game-type" className= "btn btn-outline">Back</a>
  <div className="flow-root"> 
  <div className="flex justify-center"> <img width="25" height="25" src={user?.profileImageUrl}></img>{user?.firstName}</div>
    <div className="float-left">  
    <div>Total Games:{totalGames}</div>
    <div>
    <div>Wins:{wins}|{winPercentage}%<progress className="progress progress-accent w-56" value={winPercentage} max="100"></progress></div>
    <div>Losses:{losses}|{lossPercentage}%<progress className="progress progress-accent w-56" value={lossPercentage} max="100"></progress></div>
    <div>Draws:{draws}|{drawPercentage}%<progress className="progress progress-accent w-56" value={drawPercentage} max="100"></progress></div>
    </div>
    </div>

   

    <div className="float-right">Leaderboard</div>
</div>

  </div>
  //add a button to go back to /game-type
    //discuss with whole team  in order to determine what statistics we want to display and how we want to display them
    //add a button to clear statistics/restart wins and losses(maybe? NON MVP)
    //add a refresh button to refresh the statistics(NON MVP)
    //discuss with backedn devs on how to retrieve wins and losses from the backend 
);
}
