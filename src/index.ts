import { Application } from "./app";

function bootstrap() {
  const application = new Application();
  application.init();
  application.start();
}

bootstrap();
