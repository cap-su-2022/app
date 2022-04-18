import {RoomsService} from "../rooms.service";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Rooms} from "../../models/rooms.entity";
import {Repository} from "typeorm";
import {DeleteResult} from "typeorm/browser";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<Rooms>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  delete: jest.fn(id => id),
  // ...
}));

describe('RoomService', () => {
  let roomService: RoomsService;
  let roomRepository: MockType<Repository<Rooms>>;

  const roomID = '123456789';

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [],
      providers: [RoomsService,
        {
          provide: getRepositoryToken(Rooms),
          useValue: repositoryMockFactory,
        }],
    }).compile();

    roomService = app.get<RoomsService>(RoomsService);
    roomRepository = app.get(getRepositoryToken(Rooms));

  });

  describe('deleteById', () => {
    it('should successfully delete the room with the provided id', async () => {
      const expected = await roomService.deleteById(roomID);
      roomRepository.delete.mockReturnValue({});

    console.log(expected);
      expect(expected).toEqual(Promise.resolve());
    });
  });
})
