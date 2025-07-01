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

    // Purpose
    this.nlpManager.addDocument('en', 'Purpose', 'prd.purpose');
    this.nlpManager.addDocument('en', 'Develop the world’s first quantum-powered, fully autonomous game engine', 'prd.purpose');

    // Target Users
    this.nlpManager.addDocument('en', 'Target Users', 'prd.targetUsers');
    this.nlpManager.addDocument('en', 'Indie developers', 'prd.targetUsers');

    // Key Features & Enhancements
    this.nlpManager.addDocument('en', 'Key Features & Enhancements', 'prd.features');

    // Success Metrics
    this.nlpManager.addDocument('en', 'Success Metrics', 'prd.successMetrics');

    // Requirements
    this.nlpManager.addDocument('en', 'Requirements', 'prd.requirements');

    // Execution Phases
    this.nlpManager.addDocument('en', 'Execution Phases', 'prd.executionPhases');

    // Full List of 70+ Enhancements
    this.nlpManager.addDocument('en', 'Full List of 70+ Enhancements', 'prd.enhancements');

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
            console.log(`Section: ${response.intent}`);
        }
    }
    console.log("NLP processing complete.");
  }

  update(deltaTime) {
    // TODO: Implement AI logic, such as decision making, pathfinding, etc.
  }
}

module.exports = AICore;
