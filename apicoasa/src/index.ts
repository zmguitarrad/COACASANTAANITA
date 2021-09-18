import { createConnection, ConnectionOptions } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import routes from "./routes/index";
import * as path from 'path';

const PORT = process.env.PORT || 3000;

const connectionDB: ConnectionOptions = {
  type: "postgres",
  url: "postgres://lmoibtqyrewrbq:e5d2d4c329e7306da4edbff86f6514f0523744ec281a23477c61ba46a585151e@ec2-44-194-183-115.compute-1.amazonaws.com:5432/d3s8rs1pjsat6r",
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false
  },
  entities: [path.resolve(__dirname, 'entity/**/*{.ts,.js}')],
  cli: {
    entitiesDir: "entity"
  }
}

createConnection(connectionDB)
  .then(async () => {
    // create express app
    const app = express();

    // middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use("/", routes);
    //Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
