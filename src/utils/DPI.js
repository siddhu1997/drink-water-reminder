class DPI {
    constructor() {
      this.injector = {};
    }
  
    factory(name, resolverFn) {
      this.injector[name] = resolverFn();
    }
  
    get(name) {
      if (this.injector[name]) {
        return this.injector[name];
      }
      throw Error(`DPI: ${name} not found`);
    }
  }
  
module.exports = new DPI();