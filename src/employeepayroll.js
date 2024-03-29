let isUpdate = false;
let employeePayrollobj = {};
window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
   name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue('.text-error', "");
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      setTextValue('.text-error', "");
    }
    catch (e) {
      setTextValue('.text-error', e);
    }
  });

  const date = document.querySelector('#date');
  date.addEventListener('input', function() {
    let startDate = getInputValueById('#day') + " " +getInputValueById('#month')+" "+getInputValueById('#year');
    try {
      (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
      setTextValue('.date-error', " ");
    } catch (e) {
      setTextValue('.date-error', e);
    }
  });
  


const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
  output.textContent = salary.value;
  });
  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  
   try {
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
      window.location.replace(site_properties.home_page);
  } catch (e) {
      return;
  }
}

  const setEmployeePayrollObject = () => {
    employeePayrollobj._name = getInputValueById('#name');
    employeePayrollobj._profileImage = getSelectedValues('[name=profile]').pop();
    employeePayrollobj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollobj._department = getSelectedValues('[name=department]');
    employeePayrollobj._salary = getInputValueById('#salary');
    employeePayrollobj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day')+" " +getInputValueById('#month')+" "+getInputValueById('#year');
    const dateString = date;
const dateParts = dateString.split(" ");
const day = parseInt(dateParts[0]);
const month = parseInt(dateParts[1]) - 1; // Months are zero-based (0 - 11)
const year = parseInt(dateParts[2]);

const temp = new Date(year, month, day);
    employeePayrollobj._startDate = temp;
  }

  function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
      let employeePayrollData = employeePayrollList.
                                  find(employeeData => employeeData._id == employeePayrollobj._id);
      if(!employeePayrollData) {
        employeePayrollList.push(createEmployeePayrollData());
      }else {
        const index = employeePayrollList
                              .map(employeeData => employeeData._id)
                              .indexOf(employeePayrollData._id);
              employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollData._id));

      }                            
        
    } else {
        employeePayrollList = [createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  }

  const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeePayrollId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData
  }
  const setEmployeePayrollData = (employeePayrollData) => {
    try {
      employeePayrollData.name = employeePayrollobj._name;
    } catch (e) {
      setTextValue('.text-error', e);
      throw e;
    }
    employeePayrollData.profileImage = employeePayrollobj._profileImage;
    employeePayrollData.gender = employeePayrollobj._gender;
    employeePayrollData.department = employeePayrollobj._department;
    employeePayrollData.salary = employeePayrollobj._salary;
    employeePayrollData.notes = employeePayrollobj._notes;
  
  try{
    employeePayrollData.startDate = employeePayrollobj._startDate;  
                    //  new Date(Date.parse());
  } catch (e) {
    setTextValue('.date-error', e);
    throw e;
  }
    alert(employeePayrollData.toString());

  }
   const createNewEmployeePayrollId = () => {
    let employeeID = localStorage.getItem("EmployeeID");
    employeeID = !employeeID ? 1 : (parseInt(employeeID)+1).toString();
    localStorage.setItem("EmployeeID", employeeID);
    return employeeID
  }

  const createEmployeePayroll = () => {
      let employeePayrollData = new EmployeePayrollData();
      try {
          employeePayrollData.name = getInputValueById('#name');
      } catch (e) {
          setTextValue('.text-error', e);
          throw e;
      }

      employeePayrollData.profileImage = getSelectedValues('[name=profile]').pop();
      employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
      employeePayrollData.department = getSelectedValues('[name=department]');
      employeePayrollData.salary = getInputValueById('#salary');
      employeePayrollData.note = getInputValueById('#notes');
      let date = getInputValueById('#year')+"-"+getInputValueById('#month')+"-"+getInputValueById('#day');
      employeePayrollData.date = Date.parse(date);
      alert(employeePayrollData.toString());
      return employeePayrollData; 
  }
      const getSelectedValues = (propertyValue) => {
          let allItems = document.querySelectorAll(propertyValue);
          let selItems = [];
          
          allItems.forEach(item => {
              if(item.checked) selItems.push(item.value);
          });
          return selItems;
      };
      const getInputValueById = (id) => {
          let value = document.querySelector(id).value;
          return value;
      };

      const getInputElementValue = (id) => {
          let value = document.getElementById(id).value;
          return value;
      };
      




const setForm = () => {
  setValue('#name', employeePayrollobj._name);
  setSelectedValues('[name=profile]', employeePayrollobj._profileImage);
  setSelectedValues('[name=gender]', employeePayrollobj._gender);
  setSelectedValues('[name=department]', employeePayrollobj._department);
  setValue('#salary', employeePayrollobj._salary);
  setValue('#notes', employeePayrollobj._notes);
  let date = stringifyDate(employeePayrollobj._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if(Array.isArray(value)) {
      if(value.includes(item.value)){
        item.checked = true;
      }
    }
    else if (item.value == value)
        item.checked = true;
  });
}


const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary');
  setValue('#notes', '');
  setSelectedIndex('#day', 0);
  setSelectedIndex('#month', 0);
  setSelectedIndex('#year', 0);
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedIndex = (id , index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}
const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate) return;
  employeePayrollobj = JSON.parse(employeePayrollJson);
  setForm();
}