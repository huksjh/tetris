const playground = document.querySelector(".playground > ul");
const GAME_ROWS = 20;
const GAME_COLS = 10;

// 변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    // ㅗ
    tree: [
        [
            [1, 0],
            [1, 1],
            [0, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [1, 1],
            [2, 1],
            [1, 2],
        ],
        [
            [1, 2],
            [1, 1],
            [0, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [1, 1],
            [0, 1],
            [1, 2],
        ],
    ],
    // ㅁ
    sq: [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
    ],

    // ㅣ
    line: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    ],
};

const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};

init();
function init() {
    tempMovingItem = { ...movingItem };

    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine();
    }

    renderBlocks();
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
    console.log(tempMovingItem);
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

    BLOCKS[type][direction].some((block) => {
        //console.log("block", block);
        const x = block[0] + left;
        const y = block[1] + top;
        //console.log("playground.childNodes[y]", playground.childNodes[y]);
        //console.log(playground.childNodes[y].childNodes);
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        //console.log("target", target);

        // 여백체크
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout(() => {
                console.log("setTimeout");
                renderBlocks();
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

// 블럭 고정 css 부여
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    //generateNewBlock();
}

function generateNewBlock() {
    movingItem.top = 0;
    movingItem.left = 3;
    tempMovingItem = { ...movingItem };
    renderBlocks();
}

// 블럭검사 target 영역 검사해서 있으면 moving css 없으면 seized 부여 하기위한 검사
function checkEmpty(target) {
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
        default:
            break;
    }
});
