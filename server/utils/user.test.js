const expect = require('expect');

const {Users} = require('./user');

describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'Angga',
      room: 'The Office Fans'
    }
    var response = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should return name for node course',()=>{
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike','Julie']);
  });

  it('Should return name for react course',()=>{
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user',()=>{
    //removing Jen
    var removedUser = users.removeUser('2');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',()=>{
    var removedUser = users.removeUser('123');
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user',()=>{
    var user = users.getUser('1');
    expect(user).toBe(users.users[0]);
  });

  it('should not find a user',()=>{
    var user = users.getUser('123');
    expect(user).toBeFalsy();
  });
});
