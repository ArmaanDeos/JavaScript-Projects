const left = document.querySelector(".leftImg");
const right = document.querySelector(".rightImg");
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".image");
const bottom = document.querySelector(".bottom")


let slideNum = 1;
// ! Method 1
// right.addEventListener("click",()=>{

//     if(slideNum < images.length){
//         slider.style.transform = `translate(-${slideNum * 800}px)`
//         slideNum++;
//     }else{
//         slider.style.transform = `translate(0px)`
//         slideNum = 1;
//     }
   
// });





// ! Method 2
const length = images.length;

const nextSlide = ()=>{
    slider.style.transform = `translate(-${slideNum * 800}px)`
    slideNum++;
}

const firstSlide = ()=>{
    slider.style.transform = `translate(0px)`
    slideNum = 1;
}

const lastSlide = ()=>{
    slider.style.transform = `translate(-${(length - 1) * 800}px)`
    slideNum = length;
}

const prevSlide = ()=>{
    slider.style.transform = `translate(-${(slideNum - 2) * 800}px)`
    slideNum--;
};


for(let i = 0; i < length; i++){
    const div = document.createElement("div");
    div.className = "button";
    bottom.appendChild(div);
}

const buttons = document.querySelectorAll(".button");
buttons[0].style.backgroundColor = "white";


const resetBg = ()=>{
    buttons.forEach((button) =>{
        button.style.backgroundColor = "transparent";
    })
}

buttons.forEach((button,i) =>{
    button.addEventListener("click", ()=>{
        resetBg();
        slider.style.transform = `translate(-${i * 800}px)`;
        slideNum = i + 1;
        button.style.backgroundColor = "white";

    })
});

const changeColor = ()=>{
    resetBg();
    buttons[slideNum - 1].style.backgroundColor = "white";
}


right.addEventListener("click", ()=>{
    slideNum < length ? nextSlide() : firstSlide();
    changeColor();
    // buttons[slideNum - 1].style.backgroundColor = "white";

})

left.addEventListener("click",()=>{
slideNum > 1 ? prevSlide() : lastSlide();
changeColor();
// buttons[slideNum - 1].style.backgroundColor = "white";
})

// creating bottom div
