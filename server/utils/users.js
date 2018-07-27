//store everything related to the Users data structure
[{
    id:'/#sdfhsdfhsfdh',
    name:'Andres',
    room:'The Office Fans'
}]


class Users {
    //this will be empty to initilize the users array
    constructor () {
      this.users = [];
    }

    addUser(id, name, room) {
      var user = {id, name, room}
      this.users.push(user);
      return user;
    }

    removeUser(id) {
        //return user that was removed
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }
        // var users = this.users.filter(user => user.id !== id);
        return user;
    }

    getUser(id) {
        //return and find user by id
        return this.users.filter((user) => user.id === id)[0];
    
    }

    getUserList(room){
        //filter the array to make sure each user has the room equal to the one specified
        var users = this.users.filter((user) => user.room === room);

        //use map, we now have a list of users who do match the criteria, TAKE THE ARRAY OF OBJECTS AND CONVERT TO STRINGS,
        //USING MAP, all we care abou is getting that list of names
        //this will have the name, id and room property, but all we want is the name prop
        var namesArray = users.map((user) => user.name);

        return namesArray;
        //before using write a test case to make sure it works
    }
}


module.exports = {Users};
//if an object is used as new User, new Person always be capitalized

// class Person {
//     //constructor function is a special function specific to a class, gets called by default

//     constructor(name, age) {
//         //this refers to the instance, we can set a property on this individual person
//         this.name = name,
//         this.age = age
//     }

//     //methods can be any function

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Silas', 25);
// var desc = me.getUserDescription();

// console.log(desc);

// console.log('this.name', me.name);
// console.log('this.age', me.age);





//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUSerlist(room)

//use ES6 Classes instead of this
// var users = [];

// var addUser = (id, name, room) => {
//     users.push({})
// }

// modules.export = {addUsers};