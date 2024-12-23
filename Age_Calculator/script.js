let ageCalBtn = document.getElementById("calculateAge");

ageCalBtn.addEventListener('click', calculateAge);

function calculateAge(){
    const date = document.getElementById("date").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
  
    const currentDate = new Date();
    const DOB = new Date(`${month}/${date}/${year}`);
    let time = currentDate.getTime() - DOB.getTime();
    let totalDays = Math.round(time/(1000*60*60*24));
    console.log(totalDays);
    let years = Math.floor(totalDays / 365);
    totalDays = Math.floor(totalDays % 365);
    let months = Math.floor(totalDays / 30.44);
    let days = Math.floor(totalDays % 30.44);

    let result = document.querySelector("#ageContainer > p");
    result.innerText = `${years}years ${months}months ${days}days`;
  }


