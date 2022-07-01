<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    
      <v-card>
        <v-card-title>
          <span class="text-h5">Create an event on 28/06/2022 Hour: 8AM</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
            
              <v-col cols="12">
                <v-text-field
                  v-model="eventName"  
                  label="Event Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="eventDetails"  

                  label="Event Details"
                  required
                ></v-text-field>
              </v-col>
            
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="eventType"  

                  :items="['meeting']"
                  label="Event Type"
                  required
                ></v-select>
                
              </v-col>
                  <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="eventDuration"  

                  :items="durations"
                  label="Event duration"
                  required
                ></v-select>
                
              </v-col>
             
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
             <v-btn
            v-if="$store.getters.getSelectedEvent.name"
            color="red darken-1"
            text
            @click="deleteEvent"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('closeEventDialog')"
          >
            Close
          </v-btn>
          <v-btn 
            v-if="$store.getters.getSelectedEvent.name"
            color="blue darken-1"
            text
            @click="updateEvent"
          >
            Update
          </v-btn>
          <v-btn 
            v-else
            color="blue darken-1"
            text
            @click="createEvent"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>


  export default {
    props : ['dialog','preEvent'],
    data: () => ({
   //   dialog: false,
   
   eventName:'',
   eventDetails:'',
   eventDuration : '',
   eventType:'Meeting',
   durations : ['Half an Hour', 'An Hour', 'An Hour & Half' , 'Two Hours'],
   durationsMapping : [
    30,
    60,
    90,
    120
   ]
    })
   ,
  //  computed : {
  //     newevent : {
  //       get () {
  //         return this.$store.
  //       },
  //       set (value) {

  //       }
  //     }
  //  },
    methods: {
      // async setUpdateFormValues(){
      //   await this.$nextTick(() => {
        
      //    const {name , eventDetails,eventDuration,eventType} = this.$store.getters.getSelectedEvent
      //    this.eventDetails =eventDetails
      //    this.eventDuration =eventDuration
      //    this.eventName =name
      //    this.eventType =eventType
      // });
      
      // },
        deleteEvent() {           
             this.$store.dispatch('deleteEvent') // we use the selectedEvent in the store
             this.$emit('closeEventDialog')         
             this.$store.dispatch('selectEvent', {})
        },
        createEvent () {
            var indexDuration = this.durations.indexOf(this.eventDuration)
            this.preEvent.end = this.preEvent.start  + this.durationsMapping[indexDuration] * 60 * 1000 , // add the duration to the startdate
            this.preEvent.name = this.eventName
            this.preEvent.eventDetails = this.eventDetails
            this.preEvent.eventDuration= this.eventDuration
            this.preEvent.eventType= this.eventType
         
            
            this.$store.dispatch('addEvent', this.preEvent)

            this.$emit('closeEventDialog')
            this.eventDetails =''
            this.eventDuration =''
            this.eventName =''
            this.eventType =''
         
        },
        updateEvent() {
          console.log('update event');
        }
    }
  }
</script>