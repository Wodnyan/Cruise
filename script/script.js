// https://www.google.com/search?q=fade+in+on+scroll&oq=fade+in+on+scroll+&aqs=chrome..69i57.7677j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_rpEwXoePFIetrgTo3LnABQ27
const heroContent = document.querySelector(".hero-content");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const burgerLines = document.querySelectorAll(".burger__line");
const headerLogo = document.querySelector(".logo h1");
const sectionDescription = document.querySelectorAll("section .description");
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

function changeSection(entries, observer) {
    entries.forEach(s => {
        if (!s.isIntersecting) {
            return;
        } else {
            s.target.classList.add("js-toggle-fade")
            appearOnScroll.unobserve(s.target)
        }
    })
}