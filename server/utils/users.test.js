const expect = require('expect');
const {Users} = require('./users');



describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name:'Mike',
            room:'Node Course'
        }, {
            id: '2',
            name:'Bob',
            room:'React Course'
        }, {
            id: '3',
            name:'Julie',
            room:'Node Course'
        }]
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id:'123',
            name:'Silas',
            room:'The Office Fans'
        }

        var resUser = users.addUser(user.id, user.name, user.room);
        //the first user refers to the users var above, the other is the users array
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    })

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Bob']);
    })

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

        // var finalArray = users.removeUser('1');
        // expect(finalArray).toEqual([{
        //     id: '2',
        //     name:'Bob',
        //     room:'React Course'
        // }, {
        //     id: '3',
        //     name:'Julie',
        //     room:'Node Course'
        // }]);
    })
    //pass in ID not in seed array
    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        
        expect(user).toEqual(undefined);
        expect(users.users.length).toBe(3);
        
        // var finalArray = users.removeUser('sdfgw');
        // expect(finalArray).toEqual([{
        //     id: '1',
        //     name:'Mike',
        //     room:'Node Course'
        // }, {
        //     id: '2',
        //     name:'Bob',
        //     room:'React Course'
        // }, {
        //     id: '3',
        //     name:'Julie',
        //     room:'Node Course'
        // }]);
    })

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    })
    //pass in ID not in seed array
    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toEqual(undefined);
    })

})