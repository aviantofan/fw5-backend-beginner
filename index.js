const { response } = require("express")
const express = require ('express')
const app = express()
const mysql = require('mysql')
const bodyparser = require('body-parser')

const mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'vehicle_rent',
  multipleStatement : true
});

mysqlConnection.connect((error)=>{
  if(!error){
    console.log('Database connect!')
  }else{
    console.log(new Error('Database not connect!'))
  }
})

app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}))

const vehicle = []

app.post('/inputData', (req, res)=>{
  let temp = req.body
  let sql = `INSERT INTO vehicle(id, merk, tipe, warna) VALUES (${vehicle})`

  mysqlConnection.query(sql, vehicle, (err, rows, fields)=>{
    if(!err){
      const data = {
        id : vehicle.length+1,
        merk : temp.merk,
        tipe : temp.tipe,
        warna :temp.warna
      }
      vehicle.push(data)
      res.send(rows)
    }else{
      console.log(err)
    }
  })

  return res.json({
    message : 'Input data berhasil!'
  })
})

app.get('/vehicles', (req,res)=>{
  mysqlConnection.query('SELECT * FROM vehicle', (err, rows, fields)=>{
    if(!err){
      res.send(rows)
    }else{
      console.log(err)
    }
  })
})

app.patch('/vehicles/:id', (req,res)=>{
  const {id} = req.params
  const idx = vehicle.findIndex(val => val.id === parseInt(id))
  vehicle[idx].merk = req.body.merk
  vehicle[idx].tipe = req.body.tipe
  vehicle[idx].warna = req.body.warna

  return res.json({
    message: 'Update data berhasil!',
  })
})

app.delete('/vehicles/:id', (req,res)=>{
  mysqlConnection.query('DELETE FROM vehicle WHERE id = ?',[req.params.id], (err, rows, fields)=>{
    if(!err){
      res.send('Delete Success!')
    }else{
      console.log(err)
    }
  })
})

app.listen(5000, ()=>{
  console.log('Success Running!')
})