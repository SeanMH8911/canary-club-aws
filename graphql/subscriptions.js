/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRental = /* GraphQL */ `
  subscription OnCreateRental($username: String) {
    onCreateRental(username: $username) {
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
export const onUpdateRental = /* GraphQL */ `
  subscription OnUpdateRental($username: String) {
    onUpdateRental(username: $username) {
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
export const onDeleteRental = /* GraphQL */ `
  subscription OnDeleteRental($username: String) {
    onDeleteRental(username: $username) {
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
