import readline from 'readline';

import { Health } from '@portfolio-overlap/controllers/health/health';
import { calculateOverlap, handleAddStock, handleCurrentPortfolio } from '@portfolio-overlap/controllers/funds-controller/funds-controller';
import { checkForArguments } from '@portfolio-overlap/utils/utility-functions';

export class Server {

  public start(): void {
    //health check
    const health = new Health();
    health.health();
    this.createInputOutputInterface();
  }

  private createInputOutputInterface(){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rl.prompt();

    rl.on('line', (line) => {
      const input = line.trim().split(' ');

      const command = input[0].toUpperCase();
      const args = input.slice(1);

      switch (command) {
        case 'CURRENT_PORTFOLIO':
          handleCurrentPortfolio(...args);
          break;
        case 'CALCULATE_OVERLAP':
          checkForArguments(args, 1);
          calculateOverlap(args[0]);
          break;
        case 'ADD_STOCK':
          handleAddStock(...args);
          break;
        default:
          console.log(`UNKNOWN COMMAND: ${command}`);
          break;
      }

      rl.prompt();
    }).on('close', () => {
      console.log('Exiting the application \n');
      process.exit(0);
    });

  }
}
