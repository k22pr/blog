interface IConfig {
   serverUrl: string;
   serverPort: number;
}
const config: IConfig = {
   serverUrl: "localhost",
   serverPort: 1337,
};

export default config;
