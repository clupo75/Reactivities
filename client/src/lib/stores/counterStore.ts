import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 42;
    events: string[] = [
        `Initial count is ${this.count}`
    ];

    constructor() {
        // Make the class and its properties observable
        // and actions callable using makeAutoObservable and only passing this
        makeAutoObservable(this);
    }

    // action to increment the count, 
    // set as an arrow function, so its bound to the class
    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} to ${this.count}`);
    }

    // action to decrement the count, 
    // set as an arrow function, so its bound to the class
    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} to ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}