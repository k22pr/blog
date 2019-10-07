interface IConfig {
  serverUrl: string;
  serverPort: number;
  imageUrl: string;
}

let serverUrl: string = 'localhost';
let serverPort: number = 1337;

const config: IConfig = {
  serverUrl,
  serverPort,
  imageUrl: `http://${serverUrl}:${serverPort}`,
};

export default config;
