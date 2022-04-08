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
      PricePerNight
      AdditionalCosts
      FeaturedImage
      username
      StreetName
      Area
      ZipCode
      Island
      lat
      lon
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
        PricePerNight
        AdditionalCosts
        FeaturedImage
        username
        StreetName
        Area
        ZipCode
        Island
        lat
        lon
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
        PricePerNight
        AdditionalCosts
        FeaturedImage
        username
        StreetName
        Area
        ZipCode
        Island
        lat
        lon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      FirstName
      Surname
      dateOfBirth
      phoneNumber
      country
      streetAddress
      city
      county
      postCode
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        FirstName
        Surname
        dateOfBirth
        phoneNumber
        country
        streetAddress
        city
        county
        postCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
