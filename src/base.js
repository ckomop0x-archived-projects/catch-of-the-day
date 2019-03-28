import Rebase from 're-base'
import firebase from 'firebase/app';
import 'firebase/database'

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcIAUbVmpiK_Ptz1BZudpp4pgb6zEjhOM",
  authDomain: "catch-of-the-day-ckomop0x.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ckomop0x.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database())

export default base;
