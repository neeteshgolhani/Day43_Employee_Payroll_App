class EmployeePayrollData {

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is Incorrect";
    }

    get profileImage() {
        return this._profileImage;
    }

    set profileImage(profileImage) {
        this._profileImage = profileImage;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;

    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        let datee = new Date();
        if(startDate<=datee)
        {
        this._startDate = startDate;
        }
        else{
            const startDateValue = new Date(startDate);
            const timeDiff = Math.abs(startDateValue.getTime() - datee.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 30) {
               throw 'Start date is beyond 30 days';
            } else {
               this._startDate = startDateValue;
            }
        }
    }
    
    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }


    toString() {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" : 
                                this.startDate.toLocaleDateString("en-GB", options);
        return "Id = " + this.id + ", Name = " + this.name + ", Profile Image = " + this.profileImage + ", Gender = " + this.gender + ", Department = " + this.department + ", Salary = " + this.salary + ", Start Date = " + employeeDate + ", Notes = " + this.notes;
    }
}
