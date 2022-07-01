import Vue from 'vue'
import Vuex from 'vuex'
import {ADD_EVENT,SELECT_EVENT,DELETE_EVENT} from './EventTypes'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    events: [],
    selectedEvent : {
      
    }
  },
  getters: {
      getSelectedEvent(state){
        return state.selectedEvent
      }

  },
  mutations: {
    ADD_EVENT(state, ev) {        
      state.events.push(ev)
    },
    SELECT_EVENT(state,ev){
      state.selectedEvent = ev
    },
    DELETE_EVENT(state) {
      console.log('delete event');

      var {start,end } = state.selectedEvent
      state.events = state.events.filter(ev => {
          return ev.start !== start && ev.end !== end
      })
    }

  },
  actions: {
    addEvent({commit,state},ev) {
      // call an api TODO
      commit(ADD_EVENT,ev);
    },
    selectEvent({commit,state},ev) {
      // call an api TODO
      commit(SELECT_EVENT,ev);
    },
    deleteEvent({commit,state}) {
      // call an api TODO
      commit(DELETE_EVENT);
    },
    

  },
  modules: {
  }
})
