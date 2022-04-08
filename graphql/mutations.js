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
      PricePerNight
      AdditionalCosts
      FeaturedImage
      username
      StreetName
      Area
      ZipCode
      Island
      lat
      lng
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
      PricePerNight
      AdditionalCosts
      FeaturedImage
      username
      StreetName
      Area
      ZipCode
      Island
      lat
      lng
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
      PricePerNight
      AdditionalCosts
      FeaturedImage
      username
      StreetName
      Area
      ZipCode
      Island
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
