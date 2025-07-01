const fs = require('fs');
const path = require('path');
const { NlpManager } = require('node-nlp');

class AICore {
  constructor() {
    console.log("AI Core initialized.");
    this.prd = null;
    this.nlpManager = new NlpManager({ languages: ['en'], forceNER: true });
    this.trainNLP().then(() => {
        this.parsePRD();
    });
  }

  async trainNLP() {
    console.log('Training NLP model...');

    // 1. Train for Intent Recognition (Section Identification)
    this.nlpManager.addDocument('en', 'Purpose', 'prd.purpose');
    this.nlpManager.addDocument('en', 'Target Users', 'prd.targetUsers');
    this.nlpManager.addDocument('en', 'Key Features & Enhancements', 'prd.features');
    this.nlpManager.addDocument('en', 'Success Metrics', 'prd.successMetrics');
    this.nlpManager.addDocument('en', 'Requirements', 'prd.requirements');
    this.nlpManager.addDocument('en', 'Execution Phases', 'prd.executionPhases');
    this.nlpManager.addDocument('en', 'Full List of 70+ Enhancements', 'prd.enhancements');

    // 2. Train for Named Entity Recognition (NER)
    // Features
    this.nlpManager.addNamedEntityText('feature', 'procedural universe generator', ['en'], ['Procedural universe generator']);
    this.nlpManager.addNamedEntityText('feature', 'dynamic weather/climate simulator', ['en'], ['Dynamic weather/climate simulator']);
    this.nlpManager.addNamedEntityText('feature', 'haptic feedback API', ['en'], ['Haptic feedback API']);

    // Requirements
    this.nlpManager.addNamedEntityText('requirement', 'accept PRD', ['en'], ['Accept PRD -> generate assets/code/game']);
    this.nlpManager.addNamedEntityText('requirement', 'seamless testing', ['en'], ['Seamless testing/play in-engine']);
    this.nlpManager.addNamedEntityText('requirement', 'export to all platforms', ['en'], ['Export to all platforms']);

    await this.nlpManager.train();
    console.log('NLP model trained.');
  }

  async parsePRD() {
    const prdPath = path.join(__dirname, '../../PRD.md');
    try {
      this.prd = fs.readFileSync(prdPath, 'utf8');
      console.log("PRD parsed successfully.");
      await this.processPRD();
    } catch (error) {
      console.error("Error parsing PRD:", error);
    }
  }

  async processPRD() {
    if (!this.prd) return;

    console.log("Processing PRD with NLP...");
    const sections = this.prd.split('## ');
    for (const section of sections) {
        if (section.trim() === '') continue;
        const response = await this.nlpManager.process('en', section);
        if (response.intent && response.score > 0.7) {
            console.log(`\nSection: ${response.intent}`);
            if (response.entities.length > 0) {
                console.log('  Entities:');
                response.entities.forEach(entity => {
                    console.log(`    - ${entity.entity}: ${entity.sourceText}`);
                });
            }
        }
    }
    console.log("\nNLP processing complete.");
  }

  update(deltaTime) {
    // TODO: Implement AI logic, such as decision making, pathfinding, etc.
  }
}

module.exports = AICore;
