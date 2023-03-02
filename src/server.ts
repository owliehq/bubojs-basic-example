import { app, Get } from "@bubojs/api";
import { TinyHttpAdapter } from "@bubojs/tinyhttp";

export const startServer = async () => {
  try {
    const adapter = new TinyHttpAdapter();
    app.initHttpModule(adapter);
  } catch (error) {
    console.log(`An error Occurred during server startup ${error}`);
  }
};

class Default {
  @Get()
  helloworld() {
    return "Hello world";
  }
}

await startServer();
