import {PaginationPayload} from "./pagination.payload";
import {Accounts} from "../../models/account.entity";

export interface AccountsResponsePayload extends PaginationPayload<Accounts> {
  data: Accounts[];
}
