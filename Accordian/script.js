const accordians = document.getElementsByClassName("accordian");

console.log(accordians);

for(let i=0;i<accordians.length;i++){
    accordians[i].addEventListener('click', () => {
        console.log(accordians[i]);
        accordians[i].classList.toggle('active');
    })
}