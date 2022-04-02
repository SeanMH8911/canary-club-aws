/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRental = /* GraphQL */ `
  mutation CreateRental(
    $input: CreateRentalInput!
    $condition: ModelRentalConditionInput
  ) {
    createRental(input: $input, condition: $condition) {
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
export const updateRental = /* GraphQL */ `
  mutation UpdateRental(
    $input: UpdateRentalInput!
    $condition: ModelRentalConditionInput
  ) {
    updateRental(input: $input, condition: $condition) {
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
export const deleteRental = /* GraphQL */ `
  mutation DeleteRental(
    $input: DeleteRentalInput!
    $condition: ModelRentalConditionInput
  ) {
    deleteRental(input: $input, condition: $condition) {
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
