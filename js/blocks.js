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
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        [
            [2, -1],
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
        ],
        [
            [1, -1],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
    ],
    lzee: [
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [1, 0],
            [1, 1],
            [0, 0],
            [0, -1],
        ],
        [
            [1, 0],
            [0, 0],
            [1, -1],
            [2, -1],
        ],
        [
            [1, -1],
            [1, 0],
            [2, 0],
            [2, 1],
        ],
    ],

    rzee: [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, -1],
            [1, 0],
            [0, 0],
            [0, 1],
        ],
        [
            [1, 0],
            [2, 0],
            [0, -1],
            [1, -1],
        ],
        [
            [1, 0],
            [2, 0],
            [2, -1],
            [1, 1],
        ],
    ],

    ll: [
        [
            [2, 0],
            [2, 1],
            [1, 1],
            [0, 1],
        ],
        [
            [1, 0],
            [1, 1],
            [2, 2],
            [1, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
    ],
    rl: [
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [2, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
            [2, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
            [0, 2],
        ],
    ],
};
export default BLOCKS;
