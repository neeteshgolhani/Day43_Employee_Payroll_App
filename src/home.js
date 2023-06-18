window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
  });

const createInnerHtml = () => {

const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
let innerHtml = `${headerHtml}`;
let employeePayrollData = createEmployeePayrollJSON()[0];
 innerHtml = `${headerHtml}


<tr> 
<td><img class="profile" alt="" src="${employeePayrollData._profileImage}"></td> 
<td>${employeePayrollData._name}</td> 
<td>${employeePayrollData._gender}</td> 
<td>${getDeptHtml(employeePayrollData._department)}</td>
<td>${employeePayrollData._salary}</td>
<td>${employeePayrollData._startDate}</td>
<td> 
    <img id="1" name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="./Images/delete-black-18dp.svg">
    <img id="1" name="${employeePayrollData._id}" alt="edit" onclick="update(this)" src="./Images/create-black-18dp.svg"> 
</td> 
</tr> 
 `;
  
   
document.querySelector('#table-display').innerHTML = innerHtml;
}


const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Prathamesh Adam',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '01 April 2019',
            _note: '',
            _id: new Date().getTime,
            _profileImage:'./Images/Ellipse -3.png'
        },
        {
            _name: 'Samarth Mutkiri',
            _gender: 'male',
            _department: [
                'Sales',
                'Finance'
            ],
            _salary: '400000',
            _startDate: '01 April 2018',
            _note: '',
            _id: new Date().getTime,
            _profileImage:'../Images/Ellipse -2.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-lable'>${dept}</div>`
    }
    return deptHtml
}
