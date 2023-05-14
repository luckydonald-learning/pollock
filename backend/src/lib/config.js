import path from "path";
import yaml_config from "node-yaml-config";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = yaml_config.load(path.join(__dirname, '../../config/common.yml'));

export default config;
