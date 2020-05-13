# CodersBoard Backend

## Know how

Short and useful tutorials for developers.

### Add new projection using EventStore engine
To be familiar with projections please read following EventStore documentation chapters:
- [Getting Started | Step 3 - Projections](https://eventstore.com/docs/getting-started/projections/index.html?tabs=tabid-1%2Ctabid-4%2Ctabid-http-api%2Ctabid-create-proj-bash%2Ctabid-8%2Ctabid-update-proj-http%2Ctabid-reset-http%2Ctabid-read-stream-http%2Ctabid-update-proj-config-http%2Ctabid-read-projection-events-renamed-http%2Ctabid-enablebycategory-http%2Ctabid-projections-count-per-stream-http%2Ctabid-read-partition-http)
- [Projections](https://eventstore.com/docs/projections/index.html)

If you are not familiar with EventStore at all is recommended to start from the very beginning: [Getting Started | Step 1 - Install, run, and write your first event](https://eventstore.com/docs/getting-started/index.html?tabs=tabid-1%2Ctabid-dotnet-client%2Ctabid-dotnet-client-connect%2Ctabid-4)

Shortly, projection is an interpretation of events. You can interpret certain events on different ways.
For example, if the temperature is 25C is a real fact - en event. Nobody can reject it, because it just happened.
But one person can say that is cold, another is warm. So those two people made in their minds projection of the reality with
different outcome, having the same income. And yes, in sens of projections it's totally eligible.

**Add brand-new projection:**
1. Select a directory when you want to keep a projections' sources. For example: `resources/inviting-applicants/read-side/projection/eventstore`.
2. In this directory create one more, which will be the name of the new projection, for example: `current-pending-invitations`.
The name should reflect what is the projection outcome. In this case we will interpret ApplicantInvitation events in order to say which 
applications are pending (not cancelled, nor accepted).
3. In created director during step 2 add one more which will be named by version of the projection. For first version use `v1`.
4. In version folder add JavaScript file named `query.projection.js`. This file should follow EventStore conventions and describe the projection query.
How to create a proper query is described here [User defined projections](https://eventstore.com/docs/projections/user-defined-projections/index.html).
You can find examples 
5. Please make an attention to follow CodersBoard project convention for state of the query. The state's format should compile with type ProjectionState.
Every projection should fill it incrementally by command handlers. 
    ```.ts
    declare type ProjectionState<ContentType = any> = {
      content: ContentType,
      metadata: {
        lastUpdated: Date,
        processedEventsCount: ProcessedEventsCount
      }
    }
    ```
6. You can also add `config.json` file in order to configure some projection details. But fell free to skip it in simple scenarios.
7. Import `EventStoreProjectionsModule` module from `@coders-board-library/eventstore-projections`. This will expose API to managing projections.
8. During importing, you should configure desired projections names and directory where projections are stored, like shown below.
Those projections will be supported during application runtime.
    ```ts
    import {
      EventStoreProjectionsModule,
    } from "@coders-board-library/eventstore-projections"; 
    import {ProjectionName} from "./projection-name";
    
    EventStoreProjectionsModule.register(
            {
              eventStore: {
                baseURL: process.env.EVENTSTORE_URL,
                auth: {
                  username: process.env.EVENTSTORE_USERNAME,
                  password: process.env.EVENTSTORE_PASSWORD
                }
              },
              projectionsDir: './resources/inviting-applicants/read-side/projection/eventstore',
              projections: [
                  ProjectionName.fromProps({id: 'projection1', version: 1}),
                  ProjectionName.fromProps({id: 'projection1', version: 2}),
                  ProjectionName.fromProps({id: 'projection2', version: 1}),
                  ProjectionName.fromProps({id: 'projection5', version: 3})
              ]
            }
        )
    ```
9. Every projection should be available to see in EventStore UI.


**Update projection / Add new version**
In order to keep compatibility with older versions you should never change projection which is on production.
//TODO: Rethink versioning - major / minor - if is braking change or not / if require reset

**FAQ**
1. Why don't use TypeScript for projections' queries? 
_Typescript cannot be used, because of that the EventStore supports only js files, and it will end with compile errors._

2. Why there are code duplications between projection files?
_The projection body is passed in request to EventStore and it doesn't support imports etc. PRs which will allow it by packing imported files into one query are welcome._


3. Why I need to configure projection names during module importing. Why directory conventions isn't enough?
_Feel free to add implementation which will find all projections and handle it in proper way. It's planned for next releases._