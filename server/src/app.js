const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

var dbAdress = '/home/src-reloc/agohier/git/mobileprivacyprofiler-server/run/database/MobilePrivacyProfilerDB-v1.db'
var sqlite3 = require('sqlite3').verbose()
var db

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.post('/Users', (req, res) => {
    db = startConnection (dbAdress)
    db.all(
        'SELECT * FROM mobilePrivacyProfilerDB_metadata WHERE true',
        [],
        (error, row) =>
            (res.send(row))
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})

app.post('/Devices', (req, res) => {
    db = startConnection (dbAdress)
    console.log('Bluetooth devices requested. UserId : '+req.body.UserId)
    var userId = ''+req.body.UserId
    db.all(
        'SELECT _id, name, type, mac FROM bluetoothDevice WHERE userId= ?',
        [userId],
        function(error, rows) {
            res.send(rows)
        }
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})

app.post('/Battery', (req, res) => {
    db = startConnection (dbAdress)
    console.log('Battery stats requested. UserId : '+req.body.UserId)
    var userId = ''+req.body.UserId
    db.all(
        'SELECT _id, level, isPugged, plugType, date FROM batteryUsage WHERE userId= ?',
        [userId],
        function(error, rows) {
            res.send(rows)
        }
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})

app.post('/LogCalls', (req, res) => {
    db = startConnection (dbAdress)
    console.log('LogCalls stats requested. UserId : '+req.body.UserId)
    var userId = ''+req.body.UserId
    db.all(
        'SELECT _id, phoneNumber, date, duration, callType FROM phoneCallLog WHERE userId= ?',
        [userId],
        function(error, rows) {
            res.send(rows)
        }
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})

app.post('/ContactName', (req, res) => {
    db = startConnection (dbAdress)
    console.log('ContactName requested. UserId : '+req.body.UserId)
    let userId = ''+req.body.UserId
    db.all(
        'SELECT c.displayName, cpn.phoneNumber\n' +
        'FROM contact as c, contactPhoneNumber as cpn\n' +
        'WHERE c.userId = ?\n' +
        ' and c.android_id = cpn.contact_id\n' +
        ' and cpn.userId = ?' ,
        [userId,userId],
        function(error, rows) {
            res.send(rows)
        }
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})

app.listen(process.env.PORT || 8081)

function startConnection(dbAdress) {
    return new sqlite3.Database(dbAdress, sqlite3.OPEN_READONLY, testConnection)
}
/* Control db connection */
function testConnection (errorObject) {
    if (errorObject == null) {
        console.log('Connection successful')
    } else {
        console.log(errorObject.toString())
    }
}