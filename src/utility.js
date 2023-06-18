const stringifyDate = (date) => {
    const options = {day : 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" : 
                    new Date(Date.parse(date)).toLocalDatesString('en-GB', options);
    return newDate; 
}

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(employeeData => employeeData._id == node.id)
    if (!employeePayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_employee_payroll_page);
}