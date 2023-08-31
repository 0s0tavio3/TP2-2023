const express = require('express')

const fs = require('fs')

const app = express()


app.use(express.urlencoded({ extended: true }))

app.use(express.json())


app.get('/app/:email', (require, reset) => {

reset.send({lista: fs.readdirSync('./').filter(e => e.includes('.json') && e.includes('@')) })

})


app.post('/app', (require, reset) => {

fs.writeFileSync(require.body.email+'.json', JSON.stringify(require.body))

reset.send({email: require.body.email})

})


app.put('/app/:email', (require, reset) => {

reset.send(JSON.parse(fs.readFileSync(require.body.email+'.json')))

})


app.delete('/app/:email', (require, reset) => {

fs.unlinkSync(require.body.email+'.json')

reset.send('Eliminação completa')

})

app.listen(8080)