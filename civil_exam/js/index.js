function displayRandompoem() {
    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];
    const container = document.getElementById('poem-container');
    container.innerHTML = `
        <div class="poem-content">${poem.content.replace(/\n/g, '<br>')}</div>
    `;
    console.log("罢 罢 罢");
    console.log("计算机啊 计算机");
}

const poems = [
    {
        content: `苔印阶深，云移影瘦，空庭积叶成丘。七度春蘩，尽随逝水东流。邻园早发新桃色，剩寒枝、独抱清秋。对残阳，数尽归鸿，立断危楼。 
                西风暗换流年谱，把青衫酒渍，谱作离讴。倦眼重开，恍然天地虚舟。少年意气磨棱角，似圆蟾、渐缺银钩。待更深，露冷苍苔，月照空瓯。`
    },
    {
        content: `甚年年洗剑向寒流，锋锷锈成丘。看同袍跃马，轻舟已过，十二层楼。独抱焦桐危坐，弦断更谁收？唯有沙间佩，暗记吴钩。
                七载磨砻痕迹，被西风吹作，半壁苔囚。叹精魂凝处，碧血化萤流。待重寻、鱼龙旧谱，却惊觉、沧海变荒洲。斜阳里，数行新雁，又点清秋。`
    }
];

document.getElementById('poem-container').addEventListener('animationend', function() {
    document.querySelectorAll('body > *').forEach(el => {
        if (el.id !== 'poem-container') {
            el.style.display = '';
        }
    });
    document.body.style.justifyContent = '';
    document.body.style.alignItems = '';
    document.body.style.height = '';
});

displayRandompoem();