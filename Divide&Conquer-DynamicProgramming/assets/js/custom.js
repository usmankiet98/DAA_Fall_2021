function makeLinearDNA(matrix){
    const linear = [];

    for(let j in matrix){
        for(let i in matrix[j]){
            if(!matrix[j][i]) continue;

            linear[j] = i;
        }
    }

    return linear;
}

document.getElementById('n').oninput = function(e){
    document.querySelector('#n-container > span').innerHTML = 'n : ' + this.value;

    engineA.n = engineB.n = + this.value;

    chessA.renderBoard();
    chessB.renderBoard();
};

document.getElementById('run').onclick = function () {
    const delay = + document.getElementById('delay').value;
    runEvent();
    let maxConflict = null;
    const genTimer = (new Date()).getTime();
    const backTimer = (new Date()).getTime();

    chessA.run(delay, board => {
        if(maxConflict === null){
            maxConflict = engineA.conflictsCount(makeLinearDNA(board));
        }else{
            const conflict = engineA.conflictsCount(makeLinearDNA(board));
        }
    }).then(status => {
        document.querySelector('#DP .status').innerHTML = 'stopped';
        document.querySelector('#DP .exec-time').innerHTML = ((new Date()).getTime() - genTimer) / 1000 + 's';
        stopEvent();
    });
    chessB.run(delay).then(status => {
        document.querySelector('#DnC .status').innerHTML = 'stopped';
        document.querySelector('#DnC .exec-time').innerHTML = ((new Date()).getTime() - genTimer) / 1000 + 's';
        stopEvent();
    });
};

function runEvent(){
    document.querySelectorAll('.status').forEach(el => el.innerHTML = 'running');
    document.querySelectorAll('.exec-time').forEach(el => el.innerHTML = 'NaN');

    for(let id of ['run', 'delay', 'n']){
        document.getElementById(id).disabled = true;
    }
}
function stopEvent(){
    for(let id of ['run', 'delay', 'n']){
        document.getElementById(id).disabled = false;
    }
    for(let id of ['stop']){
        document.getElementById(id).disabled = true;
    }
}

const initialN = 8;
const engineA = new NQueensDPEngine(initialN);
const engineB = new NQueensDivideAndConquerEngine(initialN);

const chessA = new ChessUI(engineA, { parent : document.getElementById('DP-canvas') });
const chessB = new ChessUI(engineB, { parent : document.getElementById('DnC-canvas') });

chessA.renderBoard();
chessB.renderBoard();

document.getElementsByTagName( 'canvas' )[1].style.display = 'none';
