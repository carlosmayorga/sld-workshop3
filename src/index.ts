// Start writing Firebase Functions
// References:  https://firebase.google.com/docs/functions/typescript
//              https://firebase.google.com/docs/firestore/quickstart#node.js_1
//              https://github.com/firebase/snippets-node/blob/e502959428f538efc34a6f0c1e2b9a2dae7e328a/firestore/main/index.js#L138-L145

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';


// Configuration to connect to firebase
const serviceAccount = require('./secure/fb-functions-utp-sld-ws-firebase-adminsdk-a4s9c-82757a3993.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fb-functions-utp-sld-ws.firebaseio.com"
});
const db = admin.firestore();


//---> Using Native Firebase Functions
//####################################
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {
        structuredData: true
    });
    response.json(`Hello World from Firebase Functions`);

});

export const getUsers = functions.https.onRequest(async (request, response) => {

    const docsSnapshot = await db.collection('users').get();
    const listOfUsers = await docsSnapshot.docs.map(doc => doc.data());

    response.json(listOfUsers);
});

//##################
//---> Using Express
//##################
const app = express();
app.use(cors({
    origin: true
}));

app.post('/hello/:name', async (req, res) => {
    const name = req.params.name;

    res.status(200)
        .json({
            ok: true,
            message1: `Hello ${name}`,
            message2: `Can you imagine the possibilities with a Cloud Functions Architecture ?`
        });
});

app.get('/users', async (req, res) => {
    const docsSnapshot = await db.collection('users').get();
    const listOfUsers = await docsSnapshot.docs.map(doc => doc.data());

    res.json(listOfUsers);

});

app.post('/users', async (req, res) => {

    console.log(req.body);

    const data = {
        name: req.body.name,
        last_name: req.body.last_name,
        address: req.body.address
    }

    const resp = await db.collection('users').add(data);

    res.json({
        response: 0,
        description: `Usuario creado 😁 con id ${resp.id}`
    }).status(201)



});

exports.apiv1 = functions.https.onRequest(app);
