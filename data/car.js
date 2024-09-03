class Car {
  brand;
  model;
  speed;
  constructor(brand, model, speed) {
    this.brand = brand;
    this.model = model;
    this.speed = speed;
  }
  displayInfo() {
    console.log(`${this.brand} ${this.model} ${this.speed} km/h`);
  }
  go() {
    return this.speed += 5;
    
  }
  brake() {
    return this.speed -= 5;
    
  }
}
const car1 = new Car("Toyota", "Corolla", 0);

const car2 = new Car("Tesla", "Model 3", 0);
console.log(car1);
console.log(car2);
car1.displayInfo();
// car2.displayInfo();
car1.go();

