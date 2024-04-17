# Stores


## Why are there multiple stores?

### TLDR;

**PERFORMANCE**

### Longer answer
The `EventStore` is there to create a separate store for the events
which update ALL OF THE TIME. If the `allEvents` and `displayEvents` were in the 
common store it would make it very likely that we would eventually cause massive
re-rendering in components that don't need to be re-rendered.


## EVENT STORE

The event store is the place you can expect to find things related directly to the
telemetry event data. This includes the list of events to be displayed and
filters related to the events. 

These items are included in this store because they are updated very frequently. If you 
are adding any new property that does not expect to update every time we receive a new
event, it should be placed in the setting store.

### Referencing the Event Store

There are a few helper hooks that can be used to access the event store. This is
to make it as easy as possible to use, and to limit the subscription to the 
data needed.

```javascript
const allEvents = useAllEvents();
const displayEvents = useDisplayEvents();
const filters = useFilters();
```

These are the most common collections you may need and how to access them.


## SETTING STORE

This store holds everything else. The values here should **not** update frequently.
If you are adding something that updates frequently, it should be placed in the
event store.

### Referencing the Setting Store

It is easier to reference items in the settings store as you can simply
destructure the store object.

```javascript
const { eventForDetails } = useSettings();
```

The difference here is that since things don't change often in the 
settings store (by design), any accidental re-renders will have far less impact.


## ACTIONS

The final aspect of stores here that is a bit unique is the actions. The actions
are intentionally external to the stores. This is to make it easier to test the actions, 
as well as to keep clear separation of concerns.

It is understood that it's a bit of a pain to have to write an action as a separate
file -- we grumble about that too. But actions are not created often, so this 
is a small price to pay for the benefits of testing and separation of concerns.