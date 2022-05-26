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
    // 사각형
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

    const movingBlocks = document.querySelectorAll(".moving");
    // 이동한 기록이 있는 객체 클래스 초기화
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });
    BLOCKS[type][direction].some((block) => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        // 이동 변화 클래스 부여
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout(() => {
                renderBlocks();
                if (moveType === "top") {
                    seizBlock();
                }
            }, 0);
            return true;
        }
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizBlock() {}

function checkEmpty(target) {
    if (!target) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? (tempMovingItem.direction = 0) : (tempMovingItem.direction += 1);

    renderBlocks();
}

// 이벤트
document.addEventListener("keydown", (e) => {
    console.log(e.keyCode);
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
