class Person {
  constructor(name = "", age = 0, DNI, sex = "M", weight = 0, height = 0) {
    this.name = name;
    this.age = age;
    this.DNI = !!DNI ? DNI : this.createDNI();
    this.sex = sex;
    /* weight in kgs */
    this.weight = weight;
    /* height in mts */
    this.height = height;
    this.withGetterSetter(this);
    this.checkSex();
  }

  withGetterSetter(obj) {
    /* sets all setters and getters for all keys, except DNI in this case */
    // console.log("generating setters and getters for Obj...");
    let keys = Object.keys(obj);
    let result = {};

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      // console.log("result is", result);
      result[key] = obj[key];
      /* we don't need DNI setter for this excercise, since we have createDNI */
      if (key === "DNI") {
        continue;
      }
      (function (k) {
        Object.defineProperty(result, k, {
          get: function () {
            // console.log("getting property:", k);
            return this[k];
          },
          set: function (x) {
            // console.log("setting property:", k);
            this[k] = x;
          },
        });
      })(key);
    }
    return result;
  }

  calculateIMC() {
    let IMC = this.weight / (this.height ^ 2);
    // console.log("weight is...", this.weight);
    // console.log("height is...", this.height);
    // console.log("IMC is...", IMC);
    if (this.IMC < 20) {
      // console.log("underweight person");
      return -1;
    } else if (this.IMC >= 20 || IMC <= 25) {
      // console.log("ideal weight");
      /* there is an error on the IMC: an IMC between 20 and 25 it's an ideal weight, the IMC UNDER 20 is underweight */
      return 0;
    } else {
      // console.log("overweight person");
      return 1;
    }
  }

  isAdult() {
    return this.age > 18 ? 1 : 0;
  }

  checkSex() {
    if (this.sex === "M" || this.sex === "F") {
      return this.sex;
    } else {
      this.sex = "M";
      return this.sex;
    }
  }

  toString() {
    let o = this;
    Object.keys(o).forEach((k) => {
      if (typeof o[k] === "object") {
        return toString(o[k]);
      }

      o[k] = "" + o[k];
    });

    return o;
  }

  createDNI() {
    return parseInt(Math.random() * 1000000000, 10);
  }
}

let nn = new Person();
let carlos = new Person("Carlos", 44, 146648742, "M", 75, 1.74);
let lara = new Person("Lara", 17, 146648743, "T");
console.log("👉🏽 STARTING...");

console.log("🚹🚺 checking sex for all persons...")
console.log(nn.checkSex())
console.log(carlos.checkSex())
console.log(lara.checkSex())

console.log("⚖️ calculating IMC for all persons...")
console.log(nn.calculateIMC());
console.log(carlos.calculateIMC());
console.log(lara.calculateIMC());

console.log("👶🏽/🧑🏽 checking if each person is an adult...")
console.log(nn.isAdult());
console.log(carlos.isAdult());
console.log(lara.isAdult());

console.log("📨 getting all info from persons")
console.log(nn.toString());
console.log(carlos.toString());
console.log(lara.toString());