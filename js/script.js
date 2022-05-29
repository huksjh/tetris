import BLOCKS from "./blocks.js";
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".gameText");
const GAME_ROWS = 20;
const GAME_COLS = 10;

// 변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};

init();
function init() {
    tempMovingItem = { ...movingItem };

    // 라인생성
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine();
    }
    renderBlocks();
    //generateNewBlock();
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < GAME_COLS; j++) {
        const metrix = document.createElement("li");
        ul.prepend(metrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType = "") {
    const { type, direction, top, left } = tempMovingItem;
    // console.log(tempMovingItem);
    const movingBlocks = document.querySelectorAll(".moving");
    // 이동한 기록이 있는 객체 클래스 초기화
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });
    //console.log(BLOCKS[type][direction].length);
    /*for (let i = 0; i < BLOCKS[type][direction].length; i++) {
        let block = BLOCKS[type][direction][i];
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout(() => {
                console.log("setTimeout");
                //renderBlocks();
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0);
            //return true;
            break;
        }
    }*/
    console.log(moveType);

    BLOCKS[type][direction].some((block) => {
        //console.log("block", block);
        const x = block[0] + left;
        const y = block[1] + top;
        //console.log("playground.childNodes[y]", playground.childNodes[y]);

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        //console.log("target", target);

        // 여백체크
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            if (moveType == "reTry") {
                gameOverShow();
                return false;
            }
            setTimeout(() => {
                renderBlocks("reTry");
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0);

            return true;
        }
    });

    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 게임오버
function gameOverShow() {
    clearInterval(downInterval);
    gameText.style.display = "flex";
}

// 블럭 고정 css 부여
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });

    checkMatch();
}

// 라인 검사
function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach((child) => {
        let matched = true;
        // rows li 안에 ul li 자식들 구해서 돌기
        // li 안에 seized 블럭 css 가 한개라도 없으면
        // 라인 지우기 실패 처리
        child.children[0].childNodes.forEach((li) => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        });
        // seized가 전부 있다면 라인 지우기
        // 새로운 라인 생성
        if (matched) {
            child.remove();
            prependNewLine();
        }
    });

    generateNewBlock();
}

function generateNewBlock() {
    // clearInterval(downInterval);
    // downInterval = setInterval(() => {
    //     moveBlock("top", 1);
    // }, duration);

    let blockArray = Object.entries(BLOCKS);
    let rand_type = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[rand_type][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    renderBlocks();
}

// 블럭검사 target 영역 검사해서 있으면 moving css 없으면 seized 부여 하기위한 검사
function checkEmpty(target) {
    console.log(target);
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

/**
 * 블럭 이동 - 키보드 액션 감지
 * @param {*} moveType left, top
 * @param {*} amount 이동 +- 카운트
 */
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    // 블럭 새로고침
    renderBlocks(moveType);
}

// 키 상단버튼 모양 변경이벤트
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? (tempMovingItem.direction = 0) : (tempMovingItem.direction += 1);

    // 블럭 새로고침
    renderBlocks();
}

// 스페이스바 누를때
function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, 10);
}

// 이벤트
document.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 37: //왼쪽
            moveBlock("left", -1);
            break;
        case 39: //오른쪽
            moveBlock("left", 1);
            break;
        case 38: //상단키 - 회전
            changeDirection();
            break;
        case 40: //하단 - 다운
            moveBlock("top", 1);
            break;

        case 32: //스페이스바
            dropBlock();
            break;
        default:
            break;
    }
});
