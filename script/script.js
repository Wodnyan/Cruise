const heroContent = document.querySelector(".hero-content");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const burgerLines = document.querySelectorAll(".burger__line");
const headerLogo = document.querySelector(".logo h1");
const sectionDescription = document.querySelectorAll("section .description");
const infoCards = document.querySelectorAll(".card");
burger.addEventListener("click", () => {
    burger.classList.toggle("burger--active");
    document.body.classList.toggle("nav-active");
    nav.classList.toggle("nav-active");
    headerLogo.classList.toggle("js-toggle-white")
})
const options1 = {
    root: null,
    threshold: .15
}
const options2 = {
    root: null,
    threshold: .1
}
let heroObserver = new IntersectionObserver(changeNavOnScroll, options1);
const heroTarget = heroContent;
heroObserver.observe(heroTarget);

function changeNavOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.style.cssText = "height: 60px; color: black; background-color: white";
            burgerLines.forEach(s => s.style.backgroundColor = "black");
        } else {
            header.style.cssText = "height: 80px; color: white; background-color: transparent"
            burgerLines.forEach(s => s.style.backgroundColor = "white");
        }
    })
}

const appearOnScroll = new IntersectionObserver(changeSection, options2);
sectionDescription.forEach(section => {
    appearOnScroll.observe(section);
})

function changeSection(entries) {
    entries.forEach(s => {
        if (!s.isIntersecting) {
            return;
        } else {
            s.target.classList.add("js-toggle-fade");
            appearOnScroll.unobserve(s.target)
        }
    })
}
const cardAppearOnScroll = new IntersectionObserver(changeCards, options2);
infoCards.forEach(s => cardAppearOnScroll.observe(s));

function changeCards(entries) {
    entries.forEach((s, index) => {
        if (!s.isIntersecting) {
            return;
        }
        console.log("im intersecting");
        s.target.classList.add("js-toggle-fade");
        s.target.style.transition = `.5s ease ${index / 5}s`
        cardAppearOnScroll.unobserve(s.target)
    })
}