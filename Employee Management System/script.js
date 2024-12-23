let form = document.getElementById("form");
let employees= [];

form.addEventListener("submit",(event) => {
    event.preventDefault();
    let employee={
        name:form.name.value,
        empId:form.empId.value,
        designation:form.designation.value,
        company:form.company.value,
        email:form.email.value,
    };
    console.log(employee);

     addEmployee(employee);
     form.reset();

});

function addEmployee(employee){
    for(let i=0;i<employees.length;i++)
    {
        if(employee.empId === employees[i].empId){
            alert(`"Empolyee with employee ID: ${employee.empId} already exists"`);
            return;
        }
    }
        let tr = document.createElement("tr");
        tr.innerHTML=`<td>${employee.empId}</td>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.company}</td>
                        <td>${employee.designation}</td>
                        <td><button onclick="deleteEmployee(this)">Delete</button></td>`;
        tr.setAttribute("data-empId",`${employee.empId}`);
        console.log(tr);
        let tbody = document.querySelector("table > tbody");
        tbody.appendChild(tr);
        employees.push(employee);    
    }

    function deleteEmployee(referBtn){
        let parentTd = referBtn.parentNode;
        let parentTr = parentTd.parentNode;
        let empIdToBeDeleted = parentTr.getAttribute("data-empId");
        console.log(empIdToBeDeleted)

        for(let i=0;i<employees.length;i++)
        {
            if(employees[i].empId === empIdToBeDeleted)
            {
                employees.splice(i,1);
                break;
            }
        }
        parentTr.remove();

    }