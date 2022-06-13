import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { RoomSearchResult } from "./rooms-search-result.dto";
import { RoomsRequestPayload } from "../payload/request/rooms.payload";
import { Rooms } from "../models";

@Injectable()
export default class RoomsSearchService {
  index = "rooms";

  constructor(private readonly elasticSearchService: ElasticsearchService) {
  }

  async indexRoom(room: Rooms) {
    return this.elasticSearchService.index<RoomSearchResult, Rooms>({
      index: this.index,
      body: {
        id: room.id,
        name: room.name,
        description: room.description
      }
    });
  }

  async search(text: string) {
    const { body } = await this.elasticSearchService.search<RoomSearchResult>({
      index: this.index,
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  name: `*${text}*`
                }
              },
              {
                wildcard: {
                  description: `*${text}*`
                }
              }
            ]
          }
        }
      }
    });
    console.log(body);
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
