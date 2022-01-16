const axios = require('axios')
const getData = async (url, connection, callback) => {
    try {
        const response = await axios.get(url)
        const data = response.data.data
        console.log(data);
        
        let promises=[]
        data.map((item) => {
            promises.push(createEmployee(item,connection))

        })
        Promise.all(promises).then(res=>{
            callback(null,res)
        }).catch(err=>{
            callback(err);
        })

    } catch (error) {
        console.log(error)
    }

}
function createEmployee(item,connection){
    return new Promise((resolve,reject)=>{
        let sql = `INSERT INTO employee 
        (
            id, employee_name, 	employee_salary, employee_age, profile_image
        )
        VALUES
        (
            ?, ?, ?, ?, ?
        )`;
    connection.query(sql, [item.id, item.employee_name, item.employee_salary, item.employee_age, item.employee_image], function (err, data) {
        if (err) {
            console.log(err + 'Error');
            reject(err)
        } else {
            console.log('success');
            resolve(data)
        }
    });
})

}
function updateEmp(item,connection){
    return new Promise((resolve,reject)=>{
        let sql = `UPDATE  employee set 
      employee_name=?, 	employee_salary=?, employee_age=?, profile_image=? where id=?`;
    connection.query(sql, [item.employee_name, item.employee_salary, item.employee_age, item.employee_image,item.id], function (err, data) {
        if (err) {
            console.log(err + 'Error');
            reject(err)
        } else {
            console.log('success');
            resolve(data)
        }
    });
})

}


function readEmployee(connection){
    return new Promise((resolve,reject)=>{
        let sql = `Select * from employee`;
       
    connection.query(sql, function (err, data) {
        if (err) {
            console.log(err + 'Error');
            reject(err)
        } else {
            console.log('success');
            resolve(data)
        }
    });
})

}


function deleteEmp(empId,connection){
    return new Promise((resolve,reject)=>{
        let sql = `Delete  from employee where id=?`;
       
    connection.query(sql,[empId], function (err, data) {
        if (err) {
            console.log(err + 'Error');
            reject(err)
        } else {
            console.log('success');
            resolve(data)
        }
    });
})

}



module.exports = {getData,createEmployee,readEmployee,updateEmp,deleteEmp}