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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: String) {
    onCreateUser(id: $id) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: String) {
    onUpdateUser(id: $id) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: String) {
    onDeleteUser(id: $id) {
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
