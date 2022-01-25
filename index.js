const { response } = require("express")
const express = require ('express')
const app = express()
const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'vehicle_rent'
});

mysqlConnection.connect((error)=>{
  if(!error){
    console.log('Database connect!')
  }else{
    console.log(new Error('Database not connect!'))
  }
})

app.use(express.urlencoded({extended: true}))

const vehicle = []

app.post('/inputData', (req, res)=>{

  const data = {
    id : vehicle.length+1,
    merk : req.body.merk,
    tipe : req.body.tipe,
    warna : req.body.warna
  }
  vehicle.push(data)

  let query = mysqlConnection.query('INSERT INTO vehicle SET ?', data, (err, rows, fields)=>{
    if(!err){
      res.send('Data input success!')
    }else{
      console.log(err)
    }
  })
  return(query,vehicle)
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

  let merk = vehicle[idx].merk
  let tipe = vehicle[idx].tipe
  let warna = vehicle[idx].warna

  const temp = []

  const dataUpdate = {
   merk : req.body.merk,
   tipe : req.body.tipe,
   warna : req.body.warna
  }
  temp.push(dataUpdate)

  let sql = mysqlConnection.query('UPDATE vehicle SET modified = ? WHERE id = ?', [dataUpdate,[req.params.id]])
  return(temp, sql)

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