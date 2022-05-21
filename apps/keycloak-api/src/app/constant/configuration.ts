import * as yaml from "js-yaml";
import {readFileSync} from "fs";
import {join} from "path";

const YAML_CONFIG_FILENAME = 'environment.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(YAML_CONFIG_FILENAME), 'utf8')
  ) as Record<string, any>
}
