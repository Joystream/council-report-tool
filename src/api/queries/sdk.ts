import { GraphQLClient } from "graphql-request";

import { ORION_URL } from "@/config";

import { getSdk } from "./__generated__/gql";
import { getSdk as getOrionSdk } from "./__generated__/orion.generated";
import { client } from "./client";

export const sdk = getSdk(client);

export const orionSdk = getOrionSdk(new GraphQLClient(ORION_URL));
