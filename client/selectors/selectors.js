import { createSelector } from 'reselect';

const getEvents = (state) => state.events;
const getFiltCat = (state) => state.filter.selectedCategory;

export const getFilteredEvents = createSelector(
  [ getEvents, getFiltCat ],
  (events, selectedCategory) => {
    return events.filter(event => {
      if (selectedCategory === 'all') {
        return true;
      } else {
        return (
          selectedCategory === event.primCategory ||
          selectedCategory === event.primSubCategory ||
          selectedCategory === event.secCategory ||
          selectedCategory === event.secSubCategory
        );
      }
    });
  }
);

export const getEventsNumCheck = createSelector(
  [ getFilteredEvents ],
  (filteredEvents) => {
    if (filteredEvents.length > 100) {
      return filteredEvents.slice(0, 100);
    } else {
      return filteredEvents;
    }
  }
);
