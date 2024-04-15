//archivo de indice

const express = require ('express');
const send = require('send');
const app = express();

//uso librería json
app.use(express.json());

//Arreglo 
const estudiantes = [
    {id:1, name:'Michael', language:'python',age:25, enroll:true},
    {id:2, name:'Piba', language:'Java',age:25, enroll:true},
    {id:3, name:'Ron', language:'C++',age:27, enroll:false},
    {id:4, name:'Veronica', language:'python',age:24, enroll:true},
    {id:5, name:'Geordy', language:'php',age:15, enroll:false},

];

//creacion de api
//obtener respuesta index
app.get ('/',(req, res)=>
{
    res.send('Node Js api')
});


//lista de estudiantes
app.get ('/api/students',(req, res)=>
{
    res.send(estudiantes);
});

//lista por id
app.get ('/api/students/:id',(req, res)=>
{
    //obtener el arreglo
    const student = estudiantes.find (c=> c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('No Encontrado');
    else res.send(student);
});

//Agregar estudiante
app.post('/api/students', (req, res)=>
{
    const student ={
        id: estudiantes.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll ==='true')
    };

    //guardar
    estudiantes.push(student);
    res.send(student)
})

//borrar estudiantes
app.delete ('/api/students/:id',(req, res)=>
{
    const student = estudiantes.find(c=>c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado')

    //indice 
    const index = estudiantes.indexOf(student);
    estudiantes.splice(index,1);
    res.send(estudiantes);
})

//puerto
const port = process.env.port||80;
app.listen(port,()=> console.log (`Escuchando en puerto ${port}.....`));
