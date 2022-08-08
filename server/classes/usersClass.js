class UsersClass {

    constructor () {
        this.people = [];
    }

    addPerson(id, sid){
        let person = { id, sid };

        this.people.push(person);

        return this.people;
    }

    getPerson (id){
        let person = this.people.filter(pers =>  person.id === id )[0];

        return person;
    }

    getPeople(){
        return this.people;
    }
}


module.exports = {
    UsersClass
}