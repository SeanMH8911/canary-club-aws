/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRental = /* GraphQL */ `
  query GetRental($id: ID!) {
    getRental(id: $id) {
      id
      title
      description
      MaxNumberOfGuest
      MaxNumberOfAdults
      MaxNumberOfChildren
      NumberOfBedrooms
      NumberOfBaths
      RoomSize
      address {
        StreetName
        Area
        ZipCode
        Island
      }
      location {
        lat
        lon
      }
      PricePerNight
      AdditionalCosts
      username
      createdAt
      updatedAt
    }
  }
`;
export const listRentals = /* GraphQL */ `
  query ListRentals(
    $filter: ModelRentalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRentals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        MaxNumberOfGuest
        MaxNumberOfAdults
        MaxNumberOfChildren
        NumberOfBedrooms
        NumberOfBaths
        RoomSize
        address {
          StreetName
          Area
          ZipCode
          Island
        }
        location {
          lat
          lon
        }
        PricePerNight
        AdditionalCosts
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUsername = /* GraphQL */ `
  query PostsByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRentalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        MaxNumberOfGuest
        MaxNumberOfAdults
        MaxNumberOfChildren
        NumberOfBedrooms
        NumberOfBaths
        RoomSize
        address {
          StreetName
          Area
          ZipCode
          Island
        }
        location {
          lat
          lon
        }
        PricePerNight
        AdditionalCosts
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
