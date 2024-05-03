import { GraphQLClient } from "graphql-request";

import { QN_URL } from "@/config";

export const client = new GraphQLClient(QN_URL);
