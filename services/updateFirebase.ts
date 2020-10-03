import { db } from '../firebase';
import { message } from 'antd';

export const setDocument = (collection: string, doc: string, object: any): any => {
  db.collection(collection)
    .doc(doc)
    .set(object)
    .then(function () {
      message.success('Document successfully written!');
    })
    .catch(function (error) {
      message.error('Error writing document!');
      console.error('Error writing document: ', error);
    });
};

export const updateObjectField = (collection: string, doc: string, objectField: any): any => {
  db.collection(collection)
    .doc(doc)
    .update(objectField)
    .then(function () {
      message.success('Document successfully written');
    })
    .catch(function (error) {
      message.error('Error writing document!');
      console.error('Error writing document: ', error);
    });
};

export const deleteDocument = (collection: string, doc: string): any => {
  db.collection(collection)
    .doc(doc)
    .delete()
    .then(function () {
      message.success('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
      message.error('Error removing document');
    });
};
