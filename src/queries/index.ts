import gql from 'graphql-tag';

export const GET_EVENTS = gql`
  query($category: String, $skip: Int!, $take: Int!) {
    public {
      getAllEvents(category: $category, skip: $skip, take: $take) {
        events {
          id
          name
          location
          category
          date
          time
          description
        }
      }
    }
  }
`;

export const GET_EVENT = gql`
  query($id: String!) {
    public {
      getEvent(id: $id) {
        id
        name
        location
        category
        date
        time
        description
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation(
    $name: String!
    $description: String!
    $category: String!
    $location: String!
    $time: String!
    $date: String!
  ) {
    client {
      createEvent(
        name: $name
        description: $description
        category: $category
        location: $location
        time: $time
        date: $date
      ) {
        message
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $phoneNumber: String!
    $city: String!
    $country: String!
  ) {
    client {
      updateProfile(
        firstname: $firstname
        lastname: $lastname
        phoneNumber: $phoneNumber
        city: $city
        country: $country
      ) {
        message
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query {
    client {
      getUserProfile {
        firstname
        lastname
        phoneNumber
        city
        country
      }
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation(
    $eventId: String!
    $name: String!
    $address: String!
    $telephone: String!
    ) {
    public {
      createContact(
        eventId: $eventId
        name: $name
        address: $address
        telephone: $telephone
        ) {
        message
      }
    }
  }
`;
