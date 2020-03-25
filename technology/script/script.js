const videoBtn = document.querySelector('.play-button');
const bgVideo = document.querySelector('.background__video');
const playBtnIcons = Array.from(videoBtn.children[0].children);
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
//carousel variables
const carouselContainer = document.querySelector('.carousel');
const carouselBtnContainer = document.querySelector('.carousel-button-container');
const carouselItem = carouselContainer.querySelectorAll('.carousel__item');
const carouselBtns = Array.from(document.querySelectorAll('.carousel__button'));
const carouselItemWidth = carouselItem[0].getBoundingClientRect().width + 50; //Because of the margin
carouselContainer.style.transform = `translateX(-${carouselItemWidth}px)`;
//Bubble
const bubble = document.querySelector('.bubble');

function handleBtn(target) {
    const el = target.getBoundingClientRect();
    bubble.style.left = `${el.left}px`;
    bubble.style.width = `${el.width}px`
    bubble.style.height = `${el.height}px`
}
handleBtn(carouselBtns[0])
//carousel cvent listener
carouselBtnContainer.addEventListener('click', (e) => {
    const target = e.target.classList.contains('carousel__button');
    if (!target) return;
    const targetIndex = carouselBtns.indexOf(e.target);
    const prevBtn = carouselBtnContainer.querySelector('.is-active');
    const currentBtn = carouselBtns[targetIndex];
    prevBtn.classList.remove('is-active');
    currentBtn.classList.add('is-active');
    carouselBtns[targetIndex].classList.add('isActive');
    const amountToMove = carouselItemWidth * targetIndex;
    handleBtn(carouselBtns[targetIndex]);
    carouselContainer.style.transform = `translateX(-${amountToMove}px)`;

})
videoBtn.addEventListener('click', handleVideoButton);
//video player
async function handleVideoButton() {
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
//Changes nav on scroll
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