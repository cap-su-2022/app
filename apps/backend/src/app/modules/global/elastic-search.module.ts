import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Environment } from "@app/constants";

const GlobalElasticSearchModule = ElasticsearchModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    node: "http://localhost:9200",
    auth: {
      username: configService.get(Environment.elasticsearch.username),
      password: configService.get(Environment.elasticsearch.password)
    }
  }),
  inject: [ConfigService]
});

export default GlobalElasticSearchModule;
