import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStorageDataObjectsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  where?: Types.InputMaybe<Types.StorageDataObjectWhereInput>;
}>;


export type GetStorageDataObjectsQuery = { __typename: 'Query', storageDataObjects: Array<{ __typename: 'StorageDataObject', createdAt: any, size: string }> };

export type GetStorageDataObjectsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StorageDataObjectWhereInput>;
}>;


export type GetStorageDataObjectsCountQuery = { __typename: 'Query', storageDataObjectsConnection: { __typename: 'StorageDataObjectConnection', totalCount: number } };

export type GetStorageBucketsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StorageBucketWhereInput>;
}>;


export type GetStorageBucketsQuery = { __typename: 'Query', storageBuckets: Array<{ __typename: 'StorageBucket', dataObjectsCount: string, dataObjectsSize: string, createdAt: any }> };


export const GetStorageDataObjectsDocument = gql`
    query GetStorageDataObjects($offset: Int, $limit: Int, $where: StorageDataObjectWhereInput) {
  storageDataObjects(
    limit: $limit
    offset: $offset
    where: $where
    orderBy: createdAt_ASC
  ) {
    createdAt
    size
  }
}
    `;

/**
 * __useGetStorageDataObjectsQuery__
 *
 * To run a query within a React component, call `useGetStorageDataObjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStorageDataObjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStorageDataObjectsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetStorageDataObjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetStorageDataObjectsQuery, GetStorageDataObjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStorageDataObjectsQuery, GetStorageDataObjectsQueryVariables>(GetStorageDataObjectsDocument, options);
      }
export function useGetStorageDataObjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStorageDataObjectsQuery, GetStorageDataObjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStorageDataObjectsQuery, GetStorageDataObjectsQueryVariables>(GetStorageDataObjectsDocument, options);
        }
export type GetStorageDataObjectsQueryHookResult = ReturnType<typeof useGetStorageDataObjectsQuery>;
export type GetStorageDataObjectsLazyQueryHookResult = ReturnType<typeof useGetStorageDataObjectsLazyQuery>;
export type GetStorageDataObjectsQueryResult = Apollo.QueryResult<GetStorageDataObjectsQuery, GetStorageDataObjectsQueryVariables>;
export const GetStorageDataObjectsCountDocument = gql`
    query GetStorageDataObjectsCount($where: StorageDataObjectWhereInput) {
  storageDataObjectsConnection(where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetStorageDataObjectsCountQuery__
 *
 * To run a query within a React component, call `useGetStorageDataObjectsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStorageDataObjectsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStorageDataObjectsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetStorageDataObjectsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetStorageDataObjectsCountQuery, GetStorageDataObjectsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStorageDataObjectsCountQuery, GetStorageDataObjectsCountQueryVariables>(GetStorageDataObjectsCountDocument, options);
      }
export function useGetStorageDataObjectsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStorageDataObjectsCountQuery, GetStorageDataObjectsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStorageDataObjectsCountQuery, GetStorageDataObjectsCountQueryVariables>(GetStorageDataObjectsCountDocument, options);
        }
export type GetStorageDataObjectsCountQueryHookResult = ReturnType<typeof useGetStorageDataObjectsCountQuery>;
export type GetStorageDataObjectsCountLazyQueryHookResult = ReturnType<typeof useGetStorageDataObjectsCountLazyQuery>;
export type GetStorageDataObjectsCountQueryResult = Apollo.QueryResult<GetStorageDataObjectsCountQuery, GetStorageDataObjectsCountQueryVariables>;
export const GetStorageBucketsDocument = gql`
    query GetStorageBuckets($where: StorageBucketWhereInput) {
  storageBuckets(where: $where) {
    dataObjectsCount
    dataObjectsSize
    createdAt
  }
}
    `;

/**
 * __useGetStorageBucketsQuery__
 *
 * To run a query within a React component, call `useGetStorageBucketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStorageBucketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStorageBucketsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetStorageBucketsQuery(baseOptions?: Apollo.QueryHookOptions<GetStorageBucketsQuery, GetStorageBucketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStorageBucketsQuery, GetStorageBucketsQueryVariables>(GetStorageBucketsDocument, options);
      }
export function useGetStorageBucketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStorageBucketsQuery, GetStorageBucketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStorageBucketsQuery, GetStorageBucketsQueryVariables>(GetStorageBucketsDocument, options);
        }
export type GetStorageBucketsQueryHookResult = ReturnType<typeof useGetStorageBucketsQuery>;
export type GetStorageBucketsLazyQueryHookResult = ReturnType<typeof useGetStorageBucketsLazyQuery>;
export type GetStorageBucketsQueryResult = Apollo.QueryResult<GetStorageBucketsQuery, GetStorageBucketsQueryVariables>;