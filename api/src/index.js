import { getProvider } from './ethers';
import app from './app';

/**
 * Bootstrap the application. Start express.
 */
const main = async () => {
  try {
    getProvider();

    app.listen(80);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
