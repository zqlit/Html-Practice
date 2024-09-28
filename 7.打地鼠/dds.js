const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-game');
const difficultySelect = document.getElementById('difficulty'); // 添加难度选择元素

let score = 0;
let timerId = null;
let hitCount = 0; // 记录连续点击的次数
let difficulty = 'superHard'; // 默认难度

// 初始化游戏板
function initGame() {
    for (let i = 0; i < 16; i++) {
        let mole = document.createElement('div');
        mole.classList.add('mole');
        mole.addEventListener('click', handleClick);
        gameBoard.appendChild(mole);
    }
}

// 开始游戏
function startGame() {
    clearInterval(timerId);
    score = 0;
    hitCount = 0; // 重置连续点击次数
    scoreDisplay.textContent = `您的分数: ${score}`;
    timerId = setInterval(spawnMole, 1000);
}

// 处理点击事件
function handleClick(event) {
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        hitCount++; // 增加连续点击次数
        score += hitCount; // 分数增加
        scoreDisplay.textContent = `您的分数: ${score}`;

        // 更换图片
        event.target.style.backgroundImage = "url('boom.gif')"; // 点击后更换为新图片

        // 两秒后恢复初始样式
        setTimeout(() => {
            event.target.style.backgroundImage = "url('hole.gif')"; // 恢复为初始图片
        }, 5000);
    }
}

// 生成地鼠
function spawnMole() {
    const moles = document.querySelectorAll('.mole');
    let randomCount;

    // 根据难度选择生成数量
    if (difficulty === 'superEasy') {
        randomCount = 1; // 超级简单：每次生成1个地鼠
    } else {
        randomCount = Math.floor(Math.random() * 2) + 2; // 超级困难：生成2到3个地鼠
    }

    const activeMoles = [];

    while (activeMoles.length < randomCount) {
        const randomIndex = Math.floor(Math.random() * moles.length);
        const randomMole = moles[randomIndex];

        if (!randomMole.classList.contains('active') && !activeMoles.includes(randomMole)) {
            activeMoles.push(randomMole);
            randomMole.classList.add('active');
            randomMole.style.backgroundImage = "url('kun.png')"; // 显示初始图片
        }
    }

    // 设置定时器恢复地鼠状态
    setTimeout(() => {
        activeMoles.forEach(mole => {
            mole.classList.remove('active');
            mole.style.backgroundImage = "url('hole.gif')"; // 恢复为初始图片
        });
    }, 1000);
}

// 绑定开始游戏按钮的点击事件
startButton.addEventListener('click', () => {
    difficulty = difficultySelect.value; // 获取选择的难度
    startGame();
});

// 初始化游戏
initGame();
