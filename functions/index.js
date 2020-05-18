const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
  .document("products/{id}")
  .onCreate((snap, context) => {
    const current = snap.data();

    const docId = context.params.id;
    const name = current.name;
    const productRef = admin.firestore().collection("products").doc(docId);
    return productRef.update({
      message: `Nice ${name}! - Love Cloud function.`,
    });
  });
