import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetChannelsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ChannelOrderByInput> | Types.ChannelOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetChannelsQuery = { __typename: 'Query', channels: Array<{ __typename: 'Channel', activeVideosCounter: number, description?: string | null, isPublic?: boolean | null, isCensored: boolean, id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, language?: { __typename: 'Language', id: string, iso: string } | null, ownerMember?: { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } } | null, coverPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null }> };

export type GetChannelsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
}>;


export type GetChannelsCountQuery = { __typename: 'Query', channelsConnection: { __typename: 'ChannelConnection', totalCount: number } };

export type GetCreatorPayoutRewardQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelRewardClaimedEventWhereInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCreatorPayoutRewardQuery = { __typename: 'Query', channelRewardClaimedEvents: Array<{ __typename: 'ChannelRewardClaimedEvent', amount: string, channelId: string, inBlock: number, channel: { __typename: 'Channel', title?: string | null, cumulativeRewardClaimed?: string | null } }> };

export type GetCreatorPayoutRewardTotalCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelRewardClaimedEventWhereInput>;
}>;


export type GetCreatorPayoutRewardTotalCountQuery = { __typename: 'Query', channelRewardClaimedEventsConnection: { __typename: 'ChannelRewardClaimedEventConnection', totalCount: number } };

export type GetChannelCreationDateQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
}>;


export type GetChannelCreationDateQuery = { __typename: 'Query', channels: Array<{ __typename: 'Channel', createdAt: any }> };

export type FullChannelFieldsFragment = { __typename: 'Channel', activeVideosCounter: number, description?: string | null, isPublic?: boolean | null, isCensored: boolean, id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, language?: { __typename: 'Language', id: string, iso: string } | null, ownerMember?: { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } } | null, coverPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null };

export type BasicMembershipFieldsFragment = { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } };

export type BasicChannelFieldsFragment = { __typename: 'Channel', id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null };

export type StorageDataObjectFieldsFragment = { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeChannelPayoutsPayload' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } };

export const StorageDataObjectFieldsFragmentDoc = gql`
    fragment StorageDataObjectFields on StorageDataObject {
  id
  createdAt
  size
  isAccepted
  ipfsHash
  storageBag {
    id
  }
  type {
    __typename
  }
}
    `;
export const BasicChannelFieldsFragmentDoc = gql`
    fragment BasicChannelFields on Channel {
  id
  title
  createdAt
  rewardAccount
  channelStateBloatBond
  avatarPhoto {
    ...StorageDataObjectFields
  }
}
    ${StorageDataObjectFieldsFragmentDoc}`;
export const BasicMembershipFieldsFragmentDoc = gql`
    fragment BasicMembershipFields on Membership {
  id
  handle
  metadata {
    avatar {
      ... on AvatarObject {
        avatarObject {
          ...StorageDataObjectFields
        }
      }
      ... on AvatarUri {
        avatarUri
      }
    }
    about
  }
}
    ${StorageDataObjectFieldsFragmentDoc}`;
export const FullChannelFieldsFragmentDoc = gql`
    fragment FullChannelFields on Channel {
  ...BasicChannelFields
  activeVideosCounter
  description
  isPublic
  isCensored
  language {
    id
    iso
  }
  ownerMember {
    ...BasicMembershipFields
  }
  coverPhoto {
    ...StorageDataObjectFields
  }
}
    ${BasicChannelFieldsFragmentDoc}
${BasicMembershipFieldsFragmentDoc}
${StorageDataObjectFieldsFragmentDoc}`;
export const GetChannelsDocument = gql`
    query GetChannels($where: ChannelWhereInput, $orderBy: [ChannelOrderByInput!], $offset: Int, $limit: Int) {
  channels(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
    ...FullChannelFields
  }
}
    ${FullChannelFieldsFragmentDoc}`;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelsCountDocument = gql`
    query GetChannelsCount($where: ChannelWhereInput) {
  channelsConnection(where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetChannelsCountQuery__
 *
 * To run a query within a React component, call `useGetChannelsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetChannelsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsCountQuery, GetChannelsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsCountQuery, GetChannelsCountQueryVariables>(GetChannelsCountDocument, options);
      }
export function useGetChannelsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsCountQuery, GetChannelsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsCountQuery, GetChannelsCountQueryVariables>(GetChannelsCountDocument, options);
        }
export type GetChannelsCountQueryHookResult = ReturnType<typeof useGetChannelsCountQuery>;
export type GetChannelsCountLazyQueryHookResult = ReturnType<typeof useGetChannelsCountLazyQuery>;
export type GetChannelsCountQueryResult = Apollo.QueryResult<GetChannelsCountQuery, GetChannelsCountQueryVariables>;
export const GetCreatorPayoutRewardDocument = gql`
    query GetCreatorPayoutReward($where: ChannelRewardClaimedEventWhereInput, $offset: Int, $limit: Int) {
  channelRewardClaimedEvents(where: $where, limit: $limit, offset: $offset) {
    amount
    channel {
      title
      cumulativeRewardClaimed
    }
    channelId
    inBlock
  }
}
    `;

/**
 * __useGetCreatorPayoutRewardQuery__
 *
 * To run a query within a React component, call `useGetCreatorPayoutRewardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatorPayoutRewardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatorPayoutRewardQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCreatorPayoutRewardQuery(baseOptions?: Apollo.QueryHookOptions<GetCreatorPayoutRewardQuery, GetCreatorPayoutRewardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreatorPayoutRewardQuery, GetCreatorPayoutRewardQueryVariables>(GetCreatorPayoutRewardDocument, options);
      }
export function useGetCreatorPayoutRewardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreatorPayoutRewardQuery, GetCreatorPayoutRewardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreatorPayoutRewardQuery, GetCreatorPayoutRewardQueryVariables>(GetCreatorPayoutRewardDocument, options);
        }
export type GetCreatorPayoutRewardQueryHookResult = ReturnType<typeof useGetCreatorPayoutRewardQuery>;
export type GetCreatorPayoutRewardLazyQueryHookResult = ReturnType<typeof useGetCreatorPayoutRewardLazyQuery>;
export type GetCreatorPayoutRewardQueryResult = Apollo.QueryResult<GetCreatorPayoutRewardQuery, GetCreatorPayoutRewardQueryVariables>;
export const GetCreatorPayoutRewardTotalCountDocument = gql`
    query GetCreatorPayoutRewardTotalCount($where: ChannelRewardClaimedEventWhereInput) {
  channelRewardClaimedEventsConnection(where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetCreatorPayoutRewardTotalCountQuery__
 *
 * To run a query within a React component, call `useGetCreatorPayoutRewardTotalCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatorPayoutRewardTotalCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatorPayoutRewardTotalCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCreatorPayoutRewardTotalCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCreatorPayoutRewardTotalCountQuery, GetCreatorPayoutRewardTotalCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreatorPayoutRewardTotalCountQuery, GetCreatorPayoutRewardTotalCountQueryVariables>(GetCreatorPayoutRewardTotalCountDocument, options);
      }
export function useGetCreatorPayoutRewardTotalCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreatorPayoutRewardTotalCountQuery, GetCreatorPayoutRewardTotalCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreatorPayoutRewardTotalCountQuery, GetCreatorPayoutRewardTotalCountQueryVariables>(GetCreatorPayoutRewardTotalCountDocument, options);
        }
export type GetCreatorPayoutRewardTotalCountQueryHookResult = ReturnType<typeof useGetCreatorPayoutRewardTotalCountQuery>;
export type GetCreatorPayoutRewardTotalCountLazyQueryHookResult = ReturnType<typeof useGetCreatorPayoutRewardTotalCountLazyQuery>;
export type GetCreatorPayoutRewardTotalCountQueryResult = Apollo.QueryResult<GetCreatorPayoutRewardTotalCountQuery, GetCreatorPayoutRewardTotalCountQueryVariables>;
export const GetChannelCreationDateDocument = gql`
    query GetChannelCreationDate($limit: Int, $offset: Int, $where: ChannelWhereInput) {
  channels(limit: $limit, offset: $offset, orderBy: createdAt_ASC, where: $where) {
    createdAt
  }
}
    `;

/**
 * __useGetChannelCreationDateQuery__
 *
 * To run a query within a React component, call `useGetChannelCreationDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelCreationDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelCreationDateQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetChannelCreationDateQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelCreationDateQuery, GetChannelCreationDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelCreationDateQuery, GetChannelCreationDateQueryVariables>(GetChannelCreationDateDocument, options);
      }
export function useGetChannelCreationDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelCreationDateQuery, GetChannelCreationDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelCreationDateQuery, GetChannelCreationDateQueryVariables>(GetChannelCreationDateDocument, options);
        }
export type GetChannelCreationDateQueryHookResult = ReturnType<typeof useGetChannelCreationDateQuery>;
export type GetChannelCreationDateLazyQueryHookResult = ReturnType<typeof useGetChannelCreationDateLazyQuery>;
export type GetChannelCreationDateQueryResult = Apollo.QueryResult<GetChannelCreationDateQuery, GetChannelCreationDateQueryVariables>;