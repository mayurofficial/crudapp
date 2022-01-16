
const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8000;
const url = "http://dummy.restapiexample.com/api/v1/employees"
const connection = require('./connection.js')
const {getData,createEmployee,readEmployee,updateEmp,deleteEmp} = require('./getData')
getData(url, connection,(val)=>{console.log(val)})


app.get('/getData', (req, res) => {
    request('http://dummy.restapiexample.com/api/v1/employees', (req, res) => {
        for (let i = 0; i < body.length; i++) {
            console.log(`id is: ${body.id}`);
        }
    })

})

app.post('/create', (req, res) => {
    // {
    //     id: 22,
    //     employee_name: 'Yuri Berry',
    //     employee_salary: 675000,
    //     employee_age: 40,
    //     profile_image: ''
    // }
    let newEmployee = {
        employee_name: req.body.employee_name,
        employee_salary: req.body.employee_salary,
        employee_age: req.body.employee_age,
        profile_image: req.body.profile_image
    }
    if (typeof (newEmployee.employee_name) === 'string' && typeof(newEmployee.employee_salary) === 'number' && typeof(newEmployee.employee_age) === 'number'){
        createEmployee(newEmployee,connection).then(resp=>{
            res.send(newEmployee)
        })
        .catch((err)=>{
                res.send(err)
        })
        
    } 
    else{
        res.send(`Invalid employee object`)
    }
})
app.get('/read', (req, res) => {
    readEmployee(connection).then(emps=>{
        res.send(emps)
    }).catch(err=>{
        res.send(err)
    })
})
app.put('/update', (req, res) => {
    let newEmployee = {
        id: req.body.id,
        employee_name: req.body.employee_name,
        employee_salary: req.body.employee_salary,
        employee_age: req.body.employee_age,
        profile_image: req.body.profile_image
    }
    if (typeof (newEmployee.employee_name) === 'string' && typeof(newEmployee.employee_salary) === 'number' && typeof(newEmployee.employee_age) === 'number'){
        updateEmp(newEmployee,connection).then(resp=>{
            res.send(newEmployee)
        })
        .catch((err)=>{
                res.send(err)
        })
        
    } 
    else{
        res.send(`Invalid employee object`)
    }
})
app.delete('/delete/:id', (req, res) => {
    let empId= req.params['id'];
    deleteEmp(empId,connection).then(resp=>{
        res.send("deletion succesful")
        console.log(resp, empId);
    }).catch(err=>{
        res.send(err);
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})