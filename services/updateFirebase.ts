import { db } from '../firebase';

export const setDocument = (collection: string, doc: string, object: any) => {
  db.collection(collection)
    .doc(doc)
    .set(object)
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const updateObjectField = (collection: string, doc: string, objectField: any) => {
  db.collection(collection)
    .doc(doc)
    .update(objectField)
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const deleteDocument = (collection: string, doc: string) => {
  db.collection(collection)
    .doc(doc)
    .delete()
    .then(function (data) {
      console.log('Document successfully deleted!', data);
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};
