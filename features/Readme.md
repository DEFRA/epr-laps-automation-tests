Introduction
This Readme demonstrates a complete setup using:

- WebdriverIO (WDIO) for browser automation
- Lighthouse for performance and accessibility audits
- Cucumber for BDD-style testing
- TypeScript for type safety and modern JS development
- VSCode as the development environment
  Pre-Requisite
  Make sure you have the following installed:
  • Node.js (v18+ recommended)
  • npm
  • VSCode
  Installation
- Clone the Repository
- git clone <your-repo-url>
- cd <your-project-name>
  Install WebdriverIO & Test runner
- npm install --save-dev @wdio/cli
- npx wdio config
  Install Lighthouse
- npm install --save-dev lighthouse chrome-launcher
  Install additional required packages
- npm install --save-dev \
  @wdio/cucumber-framework \
  @wdio/local-runner \
  @wdio/spec-reporter \
  @wdio/chromedriver-service \
  @wdio/lighthouse-service \
  typescript ts-node \
  @types/node \
  cucumber \
  @types/cucumber \

Running the Tests

- npx wdio run wdio.conf.ts
