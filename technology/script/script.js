const videoBtn = document.querySelector('.play-button');
const bgVideo = document.querySelector('.background__video');
const playBtnIcons = Array.from(videoBtn.children[0].children);
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
videoBtn.addEventListener('click', handleButton);

async function handleButton() {
    const btn = videoBtn.querySelector('.__button');
    if (bgVideo.paused) {
        playVideo();
        playBtnIcons.forEach(element => {
            element.classList.remove('fa-play')
            element.classList.add('fa-pause')
        });
        btn.classList.add('__button--paused')
    } else {
        await bgVideo.pause();
        playBtnIcons.forEach(element => {
            element.classList.remove('fa-pause')
            element.classList.add('fa-play')
        });
        btn.classList.remove('__button--paused')
    }
}
async function playVideo() {
    try {
        await bgVideo.play()
    } catch (err) {
        console.log(err);
    }
}
let observer = new IntersectionObserver(changeNav, {
    root: null,
    threshold: .15
});
observer.observe(hero);

function changeNav(entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.classList.add('isIntersecting')
        } else {
            header.classList.remove('isIntersecting')
        }
    })
}