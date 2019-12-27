import axios from 'axios'

export class Store1{

    public getData(){
        axios.get("/api/test")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}