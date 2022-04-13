var levels = require(`../gamedata/gamedata.json`).levels;

export default (props) => {
    var levelData = [];
    let linkStyle = {};
    let levelComplete;
    let selectedIndex;

    for(var i = 0; i<levels.length; i++) {

        //Put as many ● as difficulty/2 (scaled from 10 to 5) and ○ as the rest up to 5
        var numberOfFullCircles = Math.ceil(levels[i].difficulty / 2);
        var numberOfEmptyCircles = 5 - numberOfFullCircles;
        var emptyCircle = '○';
        var fullCircle = '●';
        var difficulty = '';
        for(var j=0; j<numberOfFullCircles; j++) {
            difficulty+=fullCircle;
        }

        for(var k=0; k<numberOfEmptyCircles; k++) {
            difficulty+=emptyCircle;
        }

        if(props?.activeLevel) {
            if(props.activeLevel.deployedAddress === levels[i].deployedAddress) {
              linkStyle.textDecoration = 'underline'
              selectedIndex = i;
            }
        }
  
        // Level completed
        levelComplete = props.player?.completedLevels[levels[i].deployedAddress] > 0

        var object = {
            name: levels[i].name,
            src: `../../imgs/Level${levels[i].deployId}.png`,
            difficulty: difficulty,
            deployedAddress: levels[i].deployedAddress,
            completed: levelComplete,
            id: levels[i].deployId,
            creationDate: levels[i].created
        }

        levelData.push(object);
    }

    return [levelData,levelData[selectedIndex]];
}
