class EnhancementsLoader {
  constructor() {
    this.enhancements = [];
    console.log("Enhancements Loader initialized.");
  }

  load() {
    // TODO: Implement logic to dynamically load all enhancement modules from the /enhancements directory.
    console.log("Loading enhancements...");
  }

  update(deltaTime) {
    for (const enhancement of this.enhancements) {
      enhancement.update(deltaTime);
    }
  }
}

module.exports = EnhancementsLoader;
