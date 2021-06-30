const playerSmallAttackValue = 10;
const playerStrongAttackValue = 20;
const monsterAttackValue = 14;
const healValue = 30;
let hasBonusLife = true;
let playerScore = 0;
let monsterscore =0;

let userInput = window.prompt("Enter Max Health","100");
let chosenMaxLife = +userInput;
if ( isNaN(chosenMaxLife)||chosenMaxLife<=0){
    alert("Wrong Entry. Default Input Chosen.");
    chosenMaxLife = 100;
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function gameEnd(){
    let initialHealth = currentPlayerHealth;
    const damagePlayer = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth-= damagePlayer;
    if ( currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialHealth;
        setPlayerHealth(currentPlayerHealth);
        alert('Your Bonus Life saved you!!');

    }
    if ( currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You Win!");
        playerScore++;
    }   else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You Lose!");
        monsterscore++;
        } else if( currentMonsterHealth <=0 && currentPlayerHealth <= 0){
        alert("Its a Draw!")
        }
    if ( currentPlayerHealth<=0 || currentMonsterHealth<=0){
        reset();
    }
}

function attackMonster(attackType){
 let mode;
    if (attackType == 'SMALL'){
        mode = playerSmallAttackValue   ;

     } else if ( attackType == "BIG"){
    mode = playerStrongAttackValue
    }
        const damageMonster = dealMonsterDamage(mode);
        currentMonsterHealth-= damageMonster;
        gameEnd(); 
}

function smallAttack (){
    attackMonster('SMALL')
}

function bigAttack(){
    attackMonster('BIG')
}

function heal(){
    let dynamicHealingValue;
    if( currentPlayerHealth >= chosenMaxLife - healValue){
        alert('Your health will suffice');
        dynamicHealingValue = chosenMaxLife - currentPlayerHealth;
    } else{
        dynamicHealingValue = healValue;
    }
    increasePlayerHealth(dynamicHealingValue);
    currentPlayerHealth += dynamicHealingValue;
    gameEnd();
}

function battleLog(){
    console.log("Player won - " + playerScore);
    console.log("Monster won - " + monsterscore);
}

attackBtn.addEventListener('click',smallAttack);
strongAttackBtn.addEventListener('click',bigAttack);
healBtn.addEventListener('click',heal);
logBtn.addEventListener('click',battleLog)

