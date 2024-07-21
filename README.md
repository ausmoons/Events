# CRUD App development

## Instructions on how to run the project

To test the application from events folder run `python manage.py runserver`. You can run test by `python manage.py test app`. To see the admin view -`python manage.py createsuperuser`, `http://localhost:8000/admin/`.
To run frontend go to `cd .\frontend\` , after run `npm run dev`. Tests can be used by running `npx cypress open`. 

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