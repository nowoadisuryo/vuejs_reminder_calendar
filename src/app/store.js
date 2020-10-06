import { data } from "./seed.js";

export const store = {
  state: {
    data,
  },
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ details: eventDetails, edit: false });
  },
  editEvent(dayId, eventDetails) {
    this.resetEdit();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  resetEdit() {
    this.state.data.map((dayObj) => {
      dayObj.events.map((event) => {
        event.edit = false;
      });
    });
  },
  updateEvent(dayId, eventDetails, newEventDetails) {
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);

    return dayObj.events.find(
      (event) => event.details === eventDetails
    );
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);

    const eventIndex = dayObj.events.findIndex(
      (event) => event.details === eventDetails
    );

    dayObj.events.splice(eventIndex, 1);
  },
};
