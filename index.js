const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(require('./source/routes'))

app.listen(5000, ()=>{
    console.log('App listening on port 5000')
})

// app.patch('/vehicles/:id', (req,res)=>{
//   const {id} = req.params
//   const idx = vehicle.findIndex(val => val.id === parseInt(id))

//   vehicle[idx].merk = req.body.merk
//   vehicle[idx].tipe = req.body.tipe
//   vehicle[idx].warna = req.body.warna

//   let sql = mysqlConnection.query('UPDATE vehicle SET modified = ? WHERE id = ?',id , (err, rows, fields)=>{
//     if(!err){
//       res.send(rows)
//     }else{
//       console.log(err)
//     }
//   })  
//   return(sql, idx)
// })