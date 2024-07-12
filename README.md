# Test Assignment: CRUD App development

## Objective

Develop a RESTful service to manage a collection of event records. The service must support Create, Read, and Query operations for event data.
On top of that, in part 2, create a small frontend app to read and wrote this data.

## Environment:

### Backend

- Python version: 3.11
- Django version: 4.2.7
- Django REST framework version: 3.14.0

### Frontent

- Next.js
- Typescript

## Read-Only Files:

- app/tests.py
- manage.py

## Data:

Description of an event data JSON object:

- `id`: the unique ID of the event (Integer)
- `type`: the type of the event: 'PushEvent', 'ReleaseEvent', or 'WatchEvent' (String)
- `public`: whether the event is public, either true or false (Boolean)
- `repo_id`: the ID of the repository the event belongs to (Integer)
- `actor_id`: the ID of the user who created the event (Integer)

Example of an event data JSON object:

```
{
   "type": "PushEvent",
   "public": true,
   "repo_id": 1,
   "actor_id": 1
}

```

## Specifications for the backend

### 1. Create Event

**Endpoint:** `POST /events/`

- **Description:** Adds a new event to the collection.
- **Request Body:** JSON object representing the event (without an `id` property). Assume all fields are valid except for the `type`.
- **Valid Event Types:** `PushEvent`, `ReleaseEvent`, `WatchEvent`
- **Behavior:**
  - If the event type is invalid, respond with status `400`.
  - If the event type is valid:
    - Assign a unique integer `id` to the event (starting from 1 for the first event, 2 for the second, and so on).
    - Respond with status `201` and the created event object (including its `id`).

### 2. Retrieve All Events

**Endpoint:** `GET /events/`

- **Description:** Retrieves all events.
- **Response:** Status `200` with an array of all events ordered by their `id` in ascending order.

### 3. Retrieve Specific Event by ID

**Endpoint:** `GET /events/:event_id/`

- **Description:** Retrieves the event with the specified `event_id`.
- **Behavior:**
  - If the event exists, respond with status `200` and the event object.
  - If the event does not exist, respond with status `404`.

### 4. Retrieve Events by Type

**Endpoint:** `GET /events/?type=:event_type`

- **Description:** Retrieves all events of a specified type.
- **Behavior:**
  - If the event type is invalid, respond with status `400`.
  - If the event type is valid, respond with status `200` and an array of events of that type ordered by their `id` in ascending order.

### 5. Retrieve Events by User ID

**Endpoint:** `GET /users/:user_id/events/`

- **Description:** Retrieves all events created by the specified user.
- **Response:** Status `200` with an array of events created by the user, ordered by their `id` in ascending order.

### 6. Retrieve Events by Repository ID

**Endpoint:** `GET /repos/:repo_id/events/`

- **Description:** Retrieves all events related to the specified repository.
- **Response:** Status `200` with an array of events related to the repository ordered by their `id` in ascending order.

## Specifications for the frontend

- You need to create a simple Next.js application which interacts with your api.
- In the app, you have list of events and their properties
- You can submit an event and if it is valid, then it immediately shows in the list of events. If the event is not valid, an error message shows.
  - You can hardcode couple of users in the frontend application with their details and respective integer ids
  - You can hardcode the repos in you frontend application with some mock details and respective ids.
- You can filter the list of events by the event type.

## Implementation Notes

- Ensure the API follows REST principles.
- Handle invalid input gracefully with appropriate HTTP status codes.
- Maintain clear and organized code to allow easy review and testing.

This task will be evaluated based on the correctness, code quality, and adherence to the provided specifications. Good luck!
