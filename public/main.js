
var app = new Vue({
    el: '#app',
    data: {
        message: null,
        chats: [],
        diasXsemana: 0,
        chosenFood: "",
        foodList: [],
    },
    methods: {

        enviarMensaje: function () {
            firebase.database().ref("1").push({
                comida: app.message,
                //dias_por_semana: app.diasXsemana,
            })
            app.message = null;
            app.diasXsemana = null;

        },

        pickFood: function () {
            chosenFood = "";
            foodList = [];

            firebase.database().ref("1").off('child_added')
            firebase.database().ref("1").on('child_added', function (dataSnapshot) {
            app.chats.push(dataSnapshot.val());
            });

            for (i=0; i< this.chats.length; i++){
                this.foodList.push(this.chats[i].comida);
            }
            this.chosenFood = this.foodList[Math.floor(Math.random() * this.foodList.length)] 
            this.chats = [];
            
        },


        leerMensaje: function () {
            firebase.database().ref("1").off('child_added')
            firebase.database().ref("1").on('child_added', function (dataSnapshot) {
                app.chats.push(dataSnapshot.val());
            });
            this.chats = [];
        },
        configurarFirebase: function () {
            var firebaseConfig = {
                apiKey: "AIzaSyA1PiRWTr_8lwW93_2laHRYKitc3y7nUts",
                authDomain: "food-picker-63cd1.firebaseapp.com",
                databaseURL:"https://food-picker-63cd1-default-rtdb.firebaseio.com",
                projectId: "food-picker-63cd1",
                storageBucket: "food-picker-63cd1.appspot.com",
                messagingSenderId: "1068806393648",
                appId: "1:1068806393648:web:2239d22f6fb534765502f5"
              };
              // Initialize Firebase
              firebase.initializeApp(firebaseConfig);



        },
    },
});

app.configurarFirebase();